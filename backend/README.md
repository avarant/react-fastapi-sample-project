## Backend

Create a virtual env

```bash
python -m venv .venv
```

Activate your virtual env

```bash
source .venv/bin/activate
```

Install requirements

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn app.main:app --reload
```

