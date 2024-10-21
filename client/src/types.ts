interface IdentificationModule {
  nctId: string;
  orgStudyIdInfo: { id: string };
  organization: {
    fullName: string;
    class: string;
  };
  briefTitle: string;
  officialTitle: string;
}

interface StatusModule {
  statusVerifiedDate: string;
  overallStatus: string;
  expandedAccessInfo: { hasExpandedAccess: boolean };
  startDateStruct: { date: string; type: string };
  primaryCompletionDateStruct: { date: string; type: string };
  completionDateStruct: { date: string; type: string };
  studyFirstSubmitDate: string;
  studyFirstSubmitQcDate: string;
  studyFirstPostDateStruct: { date: string; type: string };
  lastUpdateSubmitDate: string;
  lastUpdatePostDateStruct: { date: string; type: string };
}

interface SponsorCollaboratorsModule {
  responsibleParty: {
    type: string;
    investigatorFullName: string;
    investigatorTitle: string;
    investigatorAffiliation: string;
  };
  leadSponsor: {
    name: string;
    class: string;
  };
}

interface OversightModule {
  oversightHasDmc: boolean;
  isFdaRegulatedDrug: boolean;
  isFdaRegulatedDevice: boolean;
  isUsExport: boolean;
}

interface DescriptionModule {
  briefSummary: string;
  detailedDescription: string;
}

interface ConditionsModule {
  conditions: string[];
}

interface DesignModule {
  studyType: string;
  patientRegistry: boolean;
  designInfo: {
    observationalModel: string;
    timePerspective: string;
  };
  enrollmentInfo: { count: number; type: string };
}

interface ArmGroup {
  label: string;
  description: string;
  interventionNames: string[];
}

interface Intervention {
  type: string;
  name: string;
  description: string;
  armGroupLabels: string[];
}

interface ArmsInterventionsModule {
  armGroups: ArmGroup[];
  interventions: Intervention[];
}

interface PrimaryOutcome {
  measure: string;
  timeFrame: string;
}

interface OutcomesModule {
  primaryOutcomes: PrimaryOutcome[];
}

interface EligibilityModule {
  eligibilityCriteria: string;
  healthyVolunteers: boolean;
  sex: string;
  minimumAge: string;
  stdAges: string[];
  studyPopulation: string;
  samplingMethod: string;
}

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface Location {
  facility: string;
  status: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contacts: Contact[];
  geoPoint: { lat: number; lon: number };
}

interface ContactsLocationsModule {
  centralContacts: Contact[];
  overallOfficials: {
    name: string;
    affiliation: string;
    role: string;
  }[];
  locations: Location[];
}

interface IPDSharingStatementModule {
  ipdSharing: string;
}

interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  oversightModule: OversightModule;
  descriptionModule: DescriptionModule;
  conditionsModule: ConditionsModule;
  designModule: DesignModule;
  armsInterventionsModule: ArmsInterventionsModule;
  outcomesModule: OutcomesModule;
  eligibilityModule: EligibilityModule;
  contactsLocationsModule: ContactsLocationsModule;
  ipdSharingStatementModule: IPDSharingStatementModule;
}

interface MiscInfoModule {
  versionHolder: string;
}

interface ConditionBrowseModule {
  meshes: { id: string; term: string }[];
  ancestors: { id: string; term: string }[];
  browseLeaves: {
    id: string;
    name: string;
    asFound?: string;
    relevance: string;
  }[];
  browseBranches: { abbrev: string; name: string }[];
}

interface DerivedSection {
  miscInfoModule: MiscInfoModule;
  conditionBrowseModule: ConditionBrowseModule;
}

export interface Trial {
  protocolSection: ProtocolSection;
  derivedSection: DerivedSection;
  hasResults: boolean;
}
