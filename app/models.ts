export class CovidStat {
    week: number = 0;
    total: number = 0;
}

export class CovidStats {
    totalDeaths: CovidStat[] = [];
}

export class CovidDeathsProperties {
    deaths: number = 0;
    place: string = "";
    weight: number = 0.0;
}

export class CovidDeathsFeature {
    geometry: any;
    properties: CovidDeathsProperties = new CovidDeathsProperties();
}

export class CovidDeathsFeatureCollection {
    features: CovidDeathsFeature[] = [];
}