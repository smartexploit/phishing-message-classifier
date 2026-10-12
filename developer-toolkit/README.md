# ScamShield NG Python Developer Toolkit

A small Python client for the ScamShield NG API.

## Requirements

- Python 3.10 or newer
- Internet access to reach the API

## Installation

From this directory, install the dependency:

```powershell
python -m pip install -r requirements.txt
```

## Quick start

```python
from scamshield_client import ScamShieldClient

with ScamShieldClient() as client:
    result = client.predict(
        "Congratulations! You won a prize. Pay a fee to claim it."
    )
    print(result)
```

Example response shape:

```json
{
  "prediction": "SPAM",
  "spam_probability": 0.87
}
```

The values above are illustrative, not a guaranteed prediction.

## N-ATLaS analysis

```python
from scamshield_client import ScamShieldClient

with ScamShieldClient() as client:
    result = client.analyze(
        "Your bank account will be suspended. Reply with your password."
    )
    print(result)
```

This calls the API's `/analyze` endpoint. The API server must have working access to the configured N-ATLaS Space and any required credentials. The toolkit does not require the developer to handle the server's Hugging Face token.

## API methods

- `predict(message)` calls `POST /predict`.
- `analyze(message)` calls `POST /analyze`.
- `close()` closes the HTTP session.
- `ScamShieldError` represents request or response errors.

Messages must be strings containing 1–2000 characters. The API may impose additional constraints.

## Run the interactive example

```powershell
python quickstart.py
```

## Run automated tests

```powershell
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
```

The automated tests mock HTTP responses. They verify client behavior and do not, by themselves, establish live API availability or model accuracy.

## Live API and repository

- API: https://scamshield-ng-api.onrender.com/
- Web application: https://scamshield-ng-web.onrender.com/
- Source repository: https://github.com/smartexploit/phishing-message-classifier

## Limitations

- Results are automated assessments, not proof that a message is safe.
- The classifier's spam probability should not be interpreted as a calibrated real-world probability of fraud.
- N-ATLaS language behavior depends on the deployed service; this client does not expose a language-selection parameter.
- Avoid submitting real passwords, verification codes, personal financial details, or other sensitive messages during testing.
