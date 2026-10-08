# ScamShield NG Controlled Evaluation

## Test Setup

ScamShield NG was evaluated against the original machine-learning baseline using the same controlled 10-message dataset covering:

- English
- Nigerian English
- Yoruba
- Hausa
- Igbo

The evaluation contained both scam and legitimate messages.

## Results

| System | Correct | Total | Accuracy |
|---|---:|---:|---:|
| Original ML baseline | 7 | 10 | 70% |
| ScamShield NG / N-ATLaS | 9 | 10 | 90% |

ScamShield NG achieved a **20 percentage-point improvement** over the original baseline on this controlled evaluation.

## Multilingual Scam Detection

The original baseline failed to detect all three non-English scam examples:

- Yoruba scam: missed
- Hausa scam: missed
- Igbo scam: missed

ScamShield NG correctly classified all three as scams.

## Observed Limitations

The evaluation also identified two important limitations:

1. A Nigerian English legitimate financial-transfer message was incorrectly classified as a scam.
2. An Igbo legitimate message was correctly classified as legitimate, but its language was incorrectly identified as Yoruba.

These results show that N-ATLaS provides useful multilingual semantic analysis, but language identification should not yet be treated as authoritative.

## Interpretation

The results support the hypothesis that multilingual semantic analysis can improve scam detection for Nigerian-language messages compared with a conventional English-oriented SMS spam classifier.

This is a controlled evaluation and should not be interpreted as production-level accuracy. Larger, independently verified multilingual datasets are required for stronger claims.
