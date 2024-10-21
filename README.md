# Clinical Trials

This project is to demonstrate profiency in React, RESTful APIs, and completion of a full-stack project.
While I had originally gone with custom search logic using a fuzzy text search, I found loading the entire dataset in memory and manually searching to be extremely inefficient. I rewrote the backend using Elasticsearch, which now gives near-instant responses.

## Running

To run the app, first download the dataset from https://clinicaltrials.gov/search as a JSON file and rename it to "dataset.json". Place this inside `server/`.

Start the Elasticsearch instance with

```bash
docker run -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.13.4
```

Then run the server with

```bash
python3 app.py
```

Finally, run the client by `cd`-ing into the directory and running

```bash
yarn
yarn dev
```

## Future Potential

- Adding a keyword parser to allow for advanced searching using keywords such as AND and NOT
- Add a terminology translator layer to standardize searches and yield consistent results (e.g. “non small cell lung carcinoma” and “NSCLC”)
- Containerization of each application part for ease of deployment
