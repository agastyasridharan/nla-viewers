window.CF_FIDELITY = {
  "schema_version": 1,
  "seed": 20260625,
  "b_boot": 4000,
  "auc_definition": "P(cosine of a grounded read > cosine of a not-grounded read); 0.5 = no separation, <0.5 = grounded reads have LOWER fidelity",
  "results": [
    {
      "name": "callback \u00b7 gemma",
      "n": 104,
      "n_families": 52,
      "n_grounded": 81,
      "n_wrong": 3,
      "n_neither": 20,
      "cos_grounded": [
        0.990037093191971,
        0.9935410618782043,
        81
      ],
      "cos_wrong": [
        0.9934260447820028,
        0.9927969574928284,
        3
      ],
      "cos_neither": [
        0.9906074553728104,
        0.9936366677284241,
        20
      ],
      "mse_grounded": [
        0.019926181419488088,
        0.012919997796416283,
        81
      ],
      "mse_wrong": [
        0.013148509586850802,
        0.014406198635697365,
        3
      ],
      "mse_neither": [
        0.018785462900996207,
        0.012726489920169115,
        20
      ],
      "auc": 0.5303274288781535,
      "auc_ci": [
        0.413670624265561,
        0.6497748130141269
      ],
      "mw_p": 0.6581092086360021,
      "point_biserial": -0.042963343731278976,
      "auc_grounded_vs_wrong": 0.5308641975308642,
      "auc_grounded_vs_neither": 0.5302469135802469,
      "mse_identity_max_abs_dev": 3.430992364883423e-06,
      "experiment": "callback",
      "model": "gemma",
      "direction": "null"
    },
    {
      "name": "callback \u00b7 llama",
      "n": 104,
      "n_families": 52,
      "n_grounded": 75,
      "n_wrong": 8,
      "n_neither": 21,
      "cos_grounded": [
        0.9293951916694642,
        0.930999755859375,
        75
      ],
      "cos_wrong": [
        0.9214420169591904,
        0.93027463555336,
        8
      ],
      "cos_neither": [
        0.9210543746039981,
        0.9235379695892334,
        21
      ],
      "mse_grounded": [
        0.14120986292759577,
        0.13800032436847687,
        75
      ],
      "mse_wrong": [
        0.15711615979671478,
        0.13945072889328003,
        8
      ],
      "mse_neither": [
        0.15789151333627247,
        0.1529245227575302,
        21
      ],
      "auc": 0.5917241379310345,
      "auc_ci": [
        0.48455222508387064,
        0.6969778869778871
      ],
      "mw_p": 0.1481389618060084,
      "point_biserial": 0.17422527672018268,
      "auc_grounded_vs_wrong": 0.5733333333333334,
      "auc_grounded_vs_neither": 0.5987301587301588,
      "mse_identity_max_abs_dev": 2.0712614059448242e-06,
      "experiment": "callback",
      "model": "llama",
      "direction": "null"
    },
    {
      "name": "authored \u00b7 gemma",
      "n": 288,
      "n_families": 48,
      "n_grounded": 207,
      "n_wrong": 9,
      "n_neither": 72,
      "cos_grounded": [
        0.9944621062509104,
        0.9945256114006042,
        207
      ],
      "cos_wrong": [
        0.99479165342119,
        0.9943986535072327,
        9
      ],
      "cos_neither": [
        0.9956551384594705,
        0.9961673021316528,
        72
      ],
      "mse_grounded": [
        0.011076277790024229,
        0.010949470102787018,
        207
      ],
      "mse_wrong": [
        0.010416793843938245,
        0.011202500201761723,
        9
      ],
      "mse_neither": [
        0.008689870702154521,
        0.0076657794415950775,
        72
      ],
      "auc": 0.3606190731794596,
      "auc_ci": [
        0.2611474806045912,
        0.46749925145594085
      ],
      "mw_p": 0.00023531304879481496,
      "point_biserial": -0.2268632885027718,
      "auc_grounded_vs_wrong": 0.5083199141170156,
      "auc_grounded_vs_neither": 0.3421564680622652,
      "mse_identity_max_abs_dev": 2.0423904061317444e-06,
      "experiment": "authored",
      "model": "gemma",
      "direction": "reversed"
    },
    {
      "name": "authored \u00b7 llama",
      "n": 288,
      "n_families": 48,
      "n_grounded": 206,
      "n_wrong": 23,
      "n_neither": 59,
      "cos_grounded": [
        0.8929394686106339,
        0.908185601234436,
        206
      ],
      "cos_wrong": [
        0.9128373265266418,
        0.9129810333251953,
        23
      ],
      "cos_neither": [
        0.9062647769006632,
        0.9140341877937317,
        59
      ],
      "mse_grounded": [
        0.21412143284834703,
        0.18362994492053986,
        206
      ],
      "mse_wrong": [
        0.17432551280311917,
        0.17403829097747803,
        23
      ],
      "mse_neither": [
        0.18747080913034536,
        0.17193225026130676,
        59
      ],
      "auc": 0.4296708501065593,
      "auc_ci": [
        0.33439060929242614,
        0.5278617135984945
      ],
      "mw_p": 0.0625150249178856,
      "point_biserial": -0.19519432892146715,
      "auc_grounded_vs_wrong": 0.4139932460953989,
      "auc_grounded_vs_neither": 0.43578245844989305,
      "mse_identity_max_abs_dev": 1.3113021850585938e-06,
      "experiment": "authored",
      "model": "llama",
      "direction": "null"
    },
    {
      "name": "authored \u00b7 qwen",
      "n": 2880,
      "n_families": 48,
      "n_grounded": 1468,
      "n_wrong": 213,
      "n_neither": 1199,
      "cos_grounded": [
        0.8937202607578413,
        0.899692177772522,
        1468
      ],
      "cos_wrong": [
        0.9013408475638556,
        0.907856822013855,
        213
      ],
      "cos_neither": [
        0.9241878143740854,
        0.9254680275917053,
        1199
      ],
      "mse_grounded": [
        0.2125597040673936,
        0.2006160020828247,
        1468
      ],
      "mse_wrong": [
        0.1973185517208677,
        0.1842866837978363,
        213
      ],
      "mse_neither": [
        0.15162452727904213,
        0.14906413853168488,
        1199
      ],
      "auc": 0.2177248245864563,
      "auc_ci": [
        0.157040155225836,
        0.29301068495807414
      ],
      "mw_p": 1.2603306738024824e-151,
      "point_biserial": -0.4666098436870956,
      "auc_grounded_vs_wrong": 0.42731639610597283,
      "auc_grounded_vs_neither": 0.18049129269850217,
      "mse_identity_max_abs_dev": 9.5367431640625e-07,
      "experiment": "authored",
      "model": "qwen",
      "direction": "reversed"
    }
  ]
};
