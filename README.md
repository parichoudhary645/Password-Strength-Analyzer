# 🔐 AI-Powered Password Strength Estimator

An intelligent and privacy-focused web application that leverages machine learning and generative AI to assess password strength and provide secure alternatives. Unlike traditional rule-based checkers, this system analyzes real-world password patterns, dictionary-based weaknesses, and evolving cyberattack strategies to give users smarter insights.

## 🧠 Project Highlights

- **Objective**: Enhance password security using deep learning and AI without relying on cloud APIs or third-party services.
- **Approach**: Evaluates passwords using ML models (LSTM & CNN), real-world datasets, and simulated attack scenarios (via Hashcat).
- **Privacy First**: All analysis is performed locally, ensuring user privacy.

## 🗂️ Tech Stack

- **Frontend**: React.js (Interactive UI)
- **Backend**: Flask / Django (REST API)
- **ML Models**: LSTM & CNN for password classification
- **Generative AI**: LLaMA for strong password suggestions
- **Security Tools**: Hashcat & FLOPS progression for time-to-crack estimation
- **Datasets**: RockYou, Pwned Passwords, Probable Wordlists

## 🧬 Key Components

- **Feature Extraction**:
  - Character composition, length, dictionary matches, keyboard patterns
- **ML-Based Classification**:
  - LSTM & CNN models trained on real-world data to categorize password strength
- **Time-to-Crack Estimation**:
  - Simulated brute-force and dictionary attacks using Hashcat
- **AI-Generated Alternatives**:
  - Locally running LLaMA model suggests strong, human-friendly passwords
- **Feedback Module**:
  - Provides strength feedback and actionable suggestions in real time

## 🖼️ System Architecture

The system integrates front-end, backend, machine learning, and AI modules to create a full-stack intelligent password evaluator:

![System Architecture]

![image](https://github.com/user-attachments/assets/7651ba19-3e5f-4036-af9a-911afd9b6cdb)


## 📈 Impact

- Demonstrates a modern, AI-based approach to password strength analysis
- Can be integrated into authentication systems, password managers, or enterprise tools
- Offers a more realistic understanding of password security in today's landscape

---

