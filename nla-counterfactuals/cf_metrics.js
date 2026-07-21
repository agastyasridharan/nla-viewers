window.CF_METRICS = {
  "schema_version": 1,
  "config": {
    "schema_version": 1,
    "description": "Per-model reconstruction-metric constants for the counterfactual dashboard. FVE = 1 - mse/baseline_rawvar (mse=2(1-cos)); std_cos = (cos-control_floor)/(1-control_floor).",
    "fve_baseline_corpus": "ffw_diverse_20k.parquet (FineWeb diverse), pos>=10, non-outlier; 500 docs; identical corpus+code for all models (cf_baseline.py)",
    "control_floor_method": "mean cosine of a read reconstructed from a MISMATCHED description (different family). gemma/llama from the callback experiment; qwen measured here (cf_qwen_verify.py).",
    "models": {
      "qwen": {
        "model_id": "Qwen/Qwen2.5-7B-Instruct",
        "layer": 20,
        "d_model": 3584,
        "baseline_rawvar": 0.7089,
        "baseline_rawvar_pos50": 0.7139,
        "published_baseline": 0.7335,
        "eval_set_baseline": 0.4019,
        "control_floor": 0.6003,
        "mse_determinism_dev": 0.0,
        "raw_norm_median": 125.4
      },
      "gemma": {
        "model_id": "google/gemma-3-27b-it",
        "layer": 41,
        "d_model": 5376,
        "baseline_rawvar": 0.0601,
        "baseline_rawvar_pos50": 0.0595,
        "control_floor": 0.942,
        "raw_norm_median": 56091.5
      },
      "llama": {
        "model_id": "meta-llama/Llama-3.3-70B-Instruct",
        "layer": 53,
        "d_model": 8192,
        "baseline_rawvar": 0.923,
        "baseline_rawvar_pos50": 0.9241,
        "control_floor": 0.165,
        "raw_norm_median": 26.5
      }
    },
    "validation": {
      "qwen_broad_vs_published": [
        0.7089,
        0.7335,
        "within ~3% (corpus/template diff)"
      ],
      "gemma_anisotropy_vs_controlfloor": [
        0.9399,
        0.942,
        "1-baseline matches measured control floor"
      ],
      "qwen_controlfloor_vs_evalset": [
        0.6003,
        0.5981,
        "mismatch floor ~= 1-eval_set_baseline"
      ],
      "qwen_mse_determinism_dev": 0.0
    }
  },
  "definitions": {
    "mse": "2*(1-cos)  (scale-free round-trip MSE; identity holds to ~1e-6)",
    "std_cos": "(cos - control_floor)/(1 - control_floor)  (0 = a mismatched description, 1 = perfect)",
    "fve": "1 - mse/baseline_rawvar  (fraction of variance explained vs predict-the-mean; 0 = mean, <0 = worse)",
    "relation": "std_cos and fve are both anisotropy corrections of cos but use different denominators (mismatched-description floor vs predict-the-mean variance), so they are NOT affine in general (see llama: floor 0.165 vs 1-baseline 0.077)."
  },
  "summary": {
    "callback": {
      "gemma": {
        "all": {
          "n": 104,
          "cos": [
            0.9902,
            0.9935
          ],
          "std_cos": [
            0.8318,
            0.8886
          ],
          "mse": [
            0.0195,
            0.0129
          ],
          "fve": [
            0.6754,
            0.7849
          ]
        },
        "grounded": {
          "n": 81,
          "cos": [
            0.99,
            0.9935
          ],
          "std_cos": [
            0.8282,
            0.8886
          ],
          "mse": [
            0.0199,
            0.0129
          ],
          "fve": [
            0.6685,
            0.7851
          ]
        },
        "wrong": {
          "n": 3,
          "cos": [
            0.9934,
            0.9928
          ],
          "std_cos": [
            0.8867,
            0.8758
          ],
          "mse": [
            0.0131,
            0.0144
          ],
          "fve": [
            0.7812,
            0.7603
          ]
        },
        "neither": {
          "n": 20,
          "cos": [
            0.9906,
            0.9936
          ],
          "std_cos": [
            0.8381,
            0.8903
          ],
          "mse": [
            0.0188,
            0.0127
          ],
          "fve": [
            0.6874,
            0.7882
          ]
        }
      },
      "llama": {
        "all": {
          "n": 104,
          "cos": [
            0.9271,
            0.93
          ],
          "std_cos": [
            0.9127,
            0.9162
          ],
          "mse": [
            0.1458,
            0.1399
          ],
          "fve": [
            0.842,
            0.8484
          ]
        },
        "grounded": {
          "n": 75,
          "cos": [
            0.9294,
            0.931
          ],
          "std_cos": [
            0.9154,
            0.9174
          ],
          "mse": [
            0.1412,
            0.138
          ],
          "fve": [
            0.847,
            0.8505
          ]
        },
        "wrong": {
          "n": 8,
          "cos": [
            0.9214,
            0.9303
          ],
          "std_cos": [
            0.9059,
            0.9165
          ],
          "mse": [
            0.1571,
            0.1395
          ],
          "fve": [
            0.8298,
            0.8489
          ]
        },
        "neither": {
          "n": 21,
          "cos": [
            0.9211,
            0.9235
          ],
          "std_cos": [
            0.9055,
            0.9084
          ],
          "mse": [
            0.1579,
            0.1529
          ],
          "fve": [
            0.8289,
            0.8343
          ]
        }
      }
    },
    "authored": {
      "qwen": {
        "all": {
          "n": 2880,
          "cos": [
            0.907,
            0.9163
          ],
          "std_cos": [
            0.7672,
            0.7905
          ],
          "mse": [
            0.1861,
            0.1675
          ],
          "fve": [
            0.7375,
            0.7638
          ]
        },
        "grounded": {
          "n": 1468,
          "cos": [
            0.8937,
            0.8997
          ],
          "std_cos": [
            0.7341,
            0.749
          ],
          "mse": [
            0.2126,
            0.2006
          ],
          "fve": [
            0.7002,
            0.717
          ]
        },
        "wrong": {
          "n": 213,
          "cos": [
            0.9013,
            0.9079
          ],
          "std_cos": [
            0.7532,
            0.7695
          ],
          "mse": [
            0.1973,
            0.1843
          ],
          "fve": [
            0.7217,
            0.74
          ]
        },
        "neither": {
          "n": 1199,
          "cos": [
            0.9242,
            0.9255
          ],
          "std_cos": [
            0.8103,
            0.8135
          ],
          "mse": [
            0.1516,
            0.1491
          ],
          "fve": [
            0.7861,
            0.7897
          ]
        }
      },
      "llama": {
        "all": {
          "n": 288,
          "cos": [
            0.8973,
            0.9115
          ],
          "std_cos": [
            0.877,
            0.894
          ],
          "mse": [
            0.2055,
            0.1771
          ],
          "fve": [
            0.7774,
            0.8082
          ]
        },
        "grounded": {
          "n": 206,
          "cos": [
            0.8929,
            0.9082
          ],
          "std_cos": [
            0.8718,
            0.89
          ],
          "mse": [
            0.2141,
            0.1836
          ],
          "fve": [
            0.768,
            0.8011
          ]
        },
        "wrong": {
          "n": 23,
          "cos": [
            0.9128,
            0.913
          ],
          "std_cos": [
            0.8956,
            0.8958
          ],
          "mse": [
            0.1743,
            0.174
          ],
          "fve": [
            0.8111,
            0.8114
          ]
        },
        "neither": {
          "n": 59,
          "cos": [
            0.9063,
            0.914
          ],
          "std_cos": [
            0.8877,
            0.897
          ],
          "mse": [
            0.1875,
            0.1719
          ],
          "fve": [
            0.7969,
            0.8137
          ]
        }
      },
      "gemma": {
        "all": {
          "n": 288,
          "cos": [
            0.9948,
            0.9948
          ],
          "std_cos": [
            0.9098,
            0.9103
          ],
          "mse": [
            0.0105,
            0.0104
          ],
          "fve": [
            0.826,
            0.827
          ]
        },
        "grounded": {
          "n": 207,
          "cos": [
            0.9945,
            0.9945
          ],
          "std_cos": [
            0.9045,
            0.9056
          ],
          "mse": [
            0.0111,
            0.0109
          ],
          "fve": [
            0.8157,
            0.8178
          ]
        },
        "wrong": {
          "n": 9,
          "cos": [
            0.9948,
            0.9944
          ],
          "std_cos": [
            0.9102,
            0.9034
          ],
          "mse": [
            0.0104,
            0.0112
          ],
          "fve": [
            0.8267,
            0.8136
          ]
        },
        "neither": {
          "n": 72,
          "cos": [
            0.9957,
            0.9962
          ],
          "std_cos": [
            0.9251,
            0.9339
          ],
          "mse": [
            0.0087,
            0.0077
          ],
          "fve": [
            0.8554,
            0.8725
          ]
        }
      }
    }
  },
  "counts": {
    "callback_reads": 208,
    "authored_draws": 3456
  }
};
