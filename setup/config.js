const config = {};

config.project = {
  name: "marklogic-kendo-search"
};

// Admin privileges for MarkLogic setup
config.auth = {
  user: "admin",
  pass: "admin",
  sendImmediately: false
};

config.host = "localhost";

// Proxy server
config.server = {
  port: 4044
}

config.databases = {
  content: {
    name: "Documents"
  },
  modules: {
    name: "Modules"
  },
  config: [
    {
      "range-path-index": [
        {
            "scalar-type": "string",
            "path-expression": "/pob/state",
            "collation": "http://marklogic.com/collation/codepoint",
            "range-value-positions": false,
            "invalid-values": "reject"
        }
      ]
    },
    {
      "range-element-index": [
        {
            "scalar-type": "string",
            "collation": "http://marklogic.com/collation/codepoint",
            "namespace-uri": "",
            "localname": "favColor",
            "range-value-positions": false,
            "invalid-values": "reject"
        },
        {
            "scalar-type": "date",
            "collation": "",
            "namespace-uri": "",
            "localname": "dob",
            "range-value-positions": false,
            "invalid-values": "reject"
        }
      ]
    },
    {
      "geospatial-element-pair-index": [
        {
            "parent-namespace-uri": "",
            "parent-localname": "pob",
            "latitude-namespace-uri": "",
            "latitude-localname": "latitude",
            "longitude-namespace-uri": "",
            "longitude-localname": "longitude",
            "coordinate-system": "wgs84",
            "range-value-positions": false,
            "invalid-values": "reject"
        }
      ]
    },
    {
      "field": [
        {
            "field-name": "title",
            "field-path": [
                {
                    "path": "/title",
                    "weight": 1
                }
            ],
            "trailing-wildcard-searches": true,
            "trailing-wildcard-word-positions": true,
            "three-character-searches": true,
            "word-lexicon": [
                "http://marklogic.com/collation/codepoint"
            ]
        },
        {
            "field-name": "",
            "include-root": true
        }
      ]
    }
  ]
};

config.rest = {
  "rest-api": {
    name: "App-Services",
    database: config.databases.content.name,
    "modules-database": config.databases.modules.name,
    port: 8000,
    "error-format": "json"
  },
  security: {
    authentication: "basic"
  },
  options: {
    name: "search-options",
    file: "search-options.json"
  }
};

config.content = [
  {
    collection: "person",
    path: "/data/documents"
  },
  {
    collection: "image",
    path: "/data/images"
  }
];

config.modules = {
    path: "/data/modules"
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}