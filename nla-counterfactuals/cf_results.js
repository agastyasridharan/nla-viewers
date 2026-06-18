window.CF_RESULTS = {
  "schema_version": 1,
  "experiment": "CF0 + CF1 (counterfactual-pair injection test)",
  "family": "qwen7b",
  "model": {
    "family": "qwen7b",
    "base_model": "Qwen/Qwen2.5-7B-Instruct",
    "av_repo": "kitft/nla-qwen2.5-7b-L20-av",
    "ar_repo": "kitft/nla-qwen2.5-7b-L20-ar",
    "layer_k": 20,
    "d_model": 3584,
    "injection_scale": 150.0,
    "mse_scale": 59.8665
  },
  "grader_model": "claude-sonnet-4-6",
  "kappa": 0.72,
  "config": {
    "seed": 0,
    "layer_index": null,
    "n_draws": 10,
    "grader_k": 5,
    "bootstrap_B": 2000,
    "permutation_m": 10000
  },
  "n_families_in": 76,
  "trace_records": {
    "e0": 288,
    "cf1": 576
  },
  "e0": {
    "green": true,
    "n_in": 76,
    "n_survivors": 48,
    "n_dropped": 28,
    "drop_reason_counts": {
      "no_presence": 28
    },
    "downgrade_attributes": [
      "detail",
      "gender",
      "language",
      "persona",
      "sibling"
    ],
    "drop_fraction_by_attribute": {
      "language": 1.0,
      "domain": 0.125,
      "spouse": 0.0,
      "child": 0.0,
      "sibling": 1.0,
      "gender": 1.0,
      "age": 0.0,
      "occupation": 0.0,
      "wealth": 0.0,
      "residence": 0.5,
      "detail": 0.6,
      "persona": 1.0
    },
    "presence_dropped": [
      "lang_ru_fr_a",
      "lang_ru_fr_b",
      "lang_jp_de_a",
      "lang_jp_de_b",
      "sibling_a",
      "sibling_b",
      "gender_a",
      "gender_b",
      "detail_a",
      "detail_b",
      "persona_a",
      "persona_b",
      "dom_jrn_pr_a",
      "dom_jrn_pr_b",
      "lang_it_es_a",
      "lang_it_es_b",
      "lang_zh_ko_a",
      "lang_zh_ko_b",
      "lang_mx_br_a",
      "lang_mx_br_b",
      "detail_x0_a",
      "detail_x0_b",
      "detail_x1_a",
      "detail_x1_b",
      "residence_mountains_plains_a",
      "residence_mountains_plains_b",
      "residence_north_south_a",
      "residence_north_south_b"
    ],
    "no_injection_signal": -2.3129646346357427e-18,
    "no_injection_ok": true,
    "wiring_signal": 0.894537091255188,
    "wiring_ok": true
  },
  "results": {
    "age": {
      "attribute": "age",
      "point": 0.8333333333333333,
      "ci_lo": 0.6666666666666666,
      "ci_hi": 1.0,
      "perm_p": 0.6,
      "symmetry_ok": true,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 2,
      "verdict": "activation-specific-unverified",
      "confirmatory": true,
      "adj_p": 1.0,
      "perm_significant": false,
      "correction": "holm"
    },
    "child": {
      "attribute": "child",
      "point": 1.0,
      "ci_lo": 1.0,
      "ci_hi": 1.0,
      "perm_p": 0.6,
      "symmetry_ok": true,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 2,
      "verdict": "activation-specific-unverified",
      "confirmatory": true,
      "adj_p": 1.0,
      "perm_significant": false,
      "correction": "holm"
    },
    "detail": {
      "attribute": "detail",
      "point": 0.0,
      "ci_lo": 0.0,
      "ci_hi": 0.0,
      "perm_p": 1.0,
      "symmetry_ok": false,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 4,
      "verdict": "prior-driven",
      "confirmatory": false,
      "adj_p": 1.0,
      "perm_significant": false,
      "correction": "bh"
    },
    "domain": {
      "attribute": "domain",
      "point": 0.5952380952380952,
      "ci_lo": 0.42857142857142855,
      "ci_hi": 0.7619047619047618,
      "perm_p": 0.0005999400059994001,
      "symmetry_ok": true,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 14,
      "verdict": "certified-grounded",
      "confirmatory": true,
      "adj_p": 0.004199580041995801,
      "perm_significant": true,
      "correction": "holm"
    },
    "occupation": {
      "attribute": "occupation",
      "point": 0.24074074074074073,
      "ci_lo": 0.1111111111111111,
      "ci_hi": 0.3888888888888889,
      "perm_p": 0.0165983401659834,
      "symmetry_ok": true,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 18,
      "verdict": "activation-specific-unverified",
      "confirmatory": true,
      "adj_p": 0.09959004099590041,
      "perm_significant": false,
      "correction": "holm"
    },
    "residence": {
      "attribute": "residence",
      "point": 0.75,
      "ci_lo": 0.49999999999999994,
      "ci_hi": 1.0,
      "perm_p": 0.17647058823529413,
      "symmetry_ok": true,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 4,
      "verdict": "activation-specific-unverified",
      "confirmatory": true,
      "adj_p": 0.8823529411764707,
      "perm_significant": false,
      "correction": "holm"
    },
    "spouse": {
      "attribute": "spouse",
      "point": -0.6666666666666667,
      "ci_lo": -0.6666666666666667,
      "ci_hi": -0.6666666666666666,
      "perm_p": 0.6,
      "symmetry_ok": false,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 2,
      "verdict": "activation-specific-unverified",
      "confirmatory": true,
      "adj_p": 1.0,
      "perm_significant": false,
      "correction": "holm"
    },
    "wealth": {
      "attribute": "wealth",
      "point": 0.0,
      "ci_lo": 0.0,
      "ci_hi": 0.0,
      "perm_p": 1.0,
      "symmetry_ok": false,
      "kappa": 0.72,
      "e0_green": true,
      "n_families": 2,
      "verdict": "prior-driven",
      "confirmatory": true,
      "adj_p": 1.0,
      "perm_significant": false,
      "correction": "holm"
    }
  },
  "evidence": [
    {
      "kind": "tracks",
      "attribute": "domain",
      "family_id": "dom_agr_for_a",
      "read_token": " season",
      "pair": [
        {
          "injected": "agricultural",
          "read_token": " season",
          "text": "Homebrew gardening forum post tone with technical hardware description mixing DIY gardening advice and procurement notes about rain barrels and seedling monitors."
        },
        {
          "injected": "forestry",
          "read_token": " season",
          "text": "Technical blog tone with fieldwork reporting appendix describing farm tracking, with informal American register and practical framing around orchard accounting practices and crew efficiency."
        }
      ]
    },
    {
      "kind": "prior",
      "attribute": "wealth",
      "family_id": "wealth_b",
      "read_token": " finances",
      "pair": [
        {
          "injected": "poor",
          "read_token": " finances",
          "text": "Blog-style social media tone with casual personal narrative (\"Well, I'm mulling over a potential big spending decision\") suggests a reader response or advice post about budgeting and debt."
        },
        {
          "injected": "wealthy",
          "read_token": " finances",
          "text": "Blog-style personal finance post tone with informal narrative (\"So I've been chatting to someone about taking a big life step...\"), implying a reader response or reflection about money and savings."
        }
      ]
    }
  ]
};
