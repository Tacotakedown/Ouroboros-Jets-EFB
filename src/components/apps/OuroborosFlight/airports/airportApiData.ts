export const ApiReturn: ApiReturnType = {
  ident: '',
  type: '',
  name: '',
  latitude_deg: 0,
  longitude_deg: 0,
  elevation_ft: '',
  continent: '',
  iso_country: '',
  iso_region: '',
  municipality: '',
  scheduled_service: '',
  gps_code: '',
  iata_code: '',
  local_code: '',
  home_link: '',
  wikipedia_link: '',
  keywords: '',
  icao_code: '',
  runways: [
    {
      id: '',
      airport_ref: '',
      airport_ident: '',
      length_ft: '',
      width_ft: '',
      surface: '',
      lighted: '',
      closed: '',
      le_ident: '',
      le_latitude_deg: '',
      le_longitude_deg: '',
      le_elevation_ft: '',
      le_heading_degT: '',
      le_displaced_threshold_ft: '',
      he_ident: '',
      he_latitude_deg: '',
      he_longitude_deg: '',
      he_elevation_ft: '',
      he_heading_degT: '',
      he_displaced_threshold_ft: '',
      le_ils: {
        freq: 0,
        course: 0
      }
    }
  ],
  freqs: [
    {
      id: '',
      airport_ref: '',
      airport_ident: '',
      type: '',
      description: '',
      frequency_mhz: ''
    }
  ],
  country: {
    id: '',
    code: '',
    name: '',
    continent: '',
    wikipedia_link: '',
    keywords: ''
  },
  region: {
    id: '',
    code: '',
    local_code: '',
    name: '',
    continent: '',
    iso_country: '',
    wikipedia_link: '',
    keywords: ''
  },
  navaids: [
    {
      id: '',
      filename: '',
      ident: '',
      name: '',
      type: '',
      frequency_khz: '',
      latitude_deg: '',
      longitude_deg: '',
      elevation_ft: '',
      iso_country: '',
      dme_frequency_khz: '',
      dme_channel: '',
      dme_latitude_deg: '',
      dme_longitude_deg: '',
      dme_elevation_ft: '',
      slaved_variation_deg: '',
      magnetic_variation_deg: '',
      usageType: '',
      power: '',
      associated_airport: ''
    }
  ]
}

export type ApiReturnType = {
  ident: string | undefined
  type: string | undefined
  name: string | undefined
  latitude_deg: number | undefined
  longitude_deg: number | undefined
  elevation_ft: string | undefined
  continent: string | undefined
  iso_country: string | undefined
  iso_region: string | undefined
  municipality: string | undefined
  scheduled_service: string | undefined
  gps_code: string | undefined
  iata_code: string | undefined
  local_code: string | undefined
  home_link: string | undefined
  wikipedia_link: string | undefined
  keywords: string | undefined
  icao_code: string | undefined
  runways: [
    | {
        id: string | undefined
        airport_ref: string | undefined
        airport_ident: string | undefined
        length_ft: string | undefined
        width_ft: string | undefined
        surface: string | undefined
        lighted: string | undefined
        closed: string | undefined
        le_ident: string | undefined
        le_latitude_deg: string | undefined
        le_longitude_deg: string | undefined
        le_elevation_ft: string | undefined
        le_heading_degT: string | undefined
        le_displaced_threshold_ft: string | undefined
        he_ident: string | undefined
        he_latitude_deg: string | undefined
        he_longitude_deg: string | undefined
        he_elevation_ft: string | undefined
        he_heading_degT: string | undefined
        he_displaced_threshold_ft: string | undefined
        le_ils: {
          freq: number | undefined
          course: number | undefined
        }
      }
    | {}
  ]
  freqs: [
    | {
        id: string | undefined
        airport_ref: string | undefined
        airport_ident: string | undefined
        type: string | undefined
        description: string | undefined
        frequency_mhz: string | undefined
      }
    | {}
  ]
  country: {
    id: string | undefined
    code: string | undefined
    name: string | undefined
    continent: string | undefined
    wikipedia_link: string | undefined
    keywords: string | undefined
  }
  region: {
    id: string | undefined
    code: string | undefined
    local_code: string | undefined
    name: string | undefined
    continent: string | undefined
    iso_country: string | undefined
    wikipedia_link: string | undefined
    keywords: string | undefined
  }
  navaids: [
    | {}
    | {
        id: string | undefined
        filename: string | undefined
        ident: string | undefined
        name: string | undefined
        type: string | undefined
        frequency_khz: string | undefined
        latitude_deg: string | undefined
        longitude_deg: string | undefined
        elevation_ft: string | undefined
        iso_country: string | undefined
        dme_frequency_khz: string | undefined
        dme_channel: string | undefined
        dme_latitude_deg: string | undefined
        dme_longitude_deg: string | undefined
        dme_elevation_ft: string | undefined
        slaved_variation_deg: string | undefined
        magnetic_variation_deg: string | undefined
        usageType: string | undefined
        power: string | undefined
        associated_airport: string | undefined
      }
  ]
}
