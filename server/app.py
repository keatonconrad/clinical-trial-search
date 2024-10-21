import json

from elasticsearch import Elasticsearch
from flask import Flask, jsonify, request
from flask_cors import CORS
from tqdm import tqdm

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

es = Elasticsearch(
    "http://127.0.0.1:9200",
    request_timeout=30,
    max_retries=10,
    retry_on_timeout=True,
    http_compress=True,
    verify_certs=False,
    ssl_show_warn=False,
    ca_certs=None,
)

INDEX_NAME = "clinical_trials"


def index_data():
    with open("dataset.json", "r") as f:
        data = json.load(f)

    # Create the index with a simple mapping
    es.indices.create(index=INDEX_NAME, ignore=400)  # Ignore if already exists

    for row in tqdm(data):
        es.index(index=INDEX_NAME, body=row)

    print(f"Indexed {len(data)} documents into {INDEX_NAME}.")


@app.route("/")
def search():
    if query := request.args.get("query"):
        body = {
            "query": {
                "multi_match": {
                    "query": query.lower(),
                    "fields": [
                        "protocolSection.identificationModule.officialTitle",
                        "protocolSection.descriptionModule.briefSummary",
                        "protocolSection.descriptionModule.detailedDescription",
                        "protocolSection.eligibilityModule.eligibilityCriteria",
                        "protocolSection.outcomesModule.primaryOutcomes.measure",
                        "protocolSection.outcomesModule.secondaryOutcomes.measure",
                    ],
                    "fuzziness": "AUTO",
                }
            }
        }
    else:
        body = {"query": {"match_all": {}}}

    response = es.search(index=INDEX_NAME, body=body, size=10)
    return jsonify({"results": [hit["_source"] for hit in response["hits"]["hits"]]})


if __name__ == "__main__":
    index_data()
    app.run(host="0.0.0.0", port=4000)
