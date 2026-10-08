# Nigerian Multilingual Evaluation Dataset

This dataset is used to evaluate phishing/scam message detection across
English, Nigerian English, Yoruba, Hausa, and Igbo.

## Schema

- id: Unique evaluation record identifier
- text: Message text presented to the detector
- label: Ground-truth label; 0 = legitimate, 1 = scam/phishing
- language: Primary language of the message
- scam_type: Scam category or NONE for legitimate messages
- origin: Dataset source category
- verified_by: Verification status for the label/language

## Evaluation principles

- The evaluation set must remain separate from model-training data.
- Messages must be labeled before model predictions are generated.
- Scam and legitimate examples should both be represented.
- Each target language should have meaningful representation.
- Local-language examples should be reviewed for linguistic accuracy.
