// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import PasswordInput from './components/PasswordInput';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import StrengthAnalysis from './components/StrengthAnalysis';
import PasswordSuggestions from './components/PasswordSuggestions';
import InfoPanel from './components/InfoPanel';

function App() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxCrackTime, setMaxCrackTime] = useState(365); // Default: 1 year in days
  const [timeUnit, setTimeUnit] = useState('days');

  useEffect(() => {
    if (password) {
      setLoading(true);
      // In a production environment, this would be an API call to your backend
      setTimeout(() => {
        const mockAnalysis = analyzePassword(password);
        setAnalysis(mockAnalysis);
        setLoading(false);
      }, 500);
    } else {
      setAnalysis(null);
    }
  }, [password]);

  // This is a mock function that would be replaced with an actual API call
  const analyzePassword = (pwd) => {
    // Basic analysis logic - in real app this would be done on the server
    const length = pwd.length;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    
    // Common patterns check
    const commonPatterns = [
      /^123/, /abc/i, /qwerty/i, /password/i, /admin/i,
      /welcome/i, /\d{4}$/, /^[a-zA-Z]+\d+$/, /^[a-z]+$/, /^[A-Z]+$/,
      /birthday/i, /letmein/i, /monkey/i, /sunshine/i, /iloveyou/i,
      /football/i, /baseball/i, /dragon/i, /master/i, /superman/i,
      /summer\d{2,4}$/i
    ];
    
    const matchesCommonPattern = commonPatterns.some(pattern => pattern.test(pwd));
    
    // Calculate base entropy (very simplified)
    let possibleChars = 0;
    if (hasLower) possibleChars += 26;
    if (hasUpper) possibleChars += 26;
    if (hasDigit) possibleChars += 10;
    if (hasSpecial) possibleChars += 33;
    
    const entropy = Math.log2(Math.pow(possibleChars, length));
    
    // Time to crack estimation (simplified)
    // Assuming 10 billion guesses per second for high-end attacker
    const guessesPerSecond = 10000000000;
    const possibleCombinations = Math.pow(possibleChars, length);
    const secondsToCrack = possibleCombinations / (2 * guessesPerSecond);
    
    // Convert to appropriate time unit
    let timeToCrack, timeUnit;
    if (secondsToCrack < 60) {
      timeToCrack = secondsToCrack.toFixed(2);
      timeUnit = 'seconds';
    } else if (secondsToCrack < 3600) {
      timeToCrack = (secondsToCrack / 60).toFixed(2);
      timeUnit = 'minutes';
    } else if (secondsToCrack < 86400) {
      timeToCrack = (secondsToCrack / 3600).toFixed(2);
      timeUnit = 'hours';
    } else if (secondsToCrack < 2592000) {
      timeToCrack = (secondsToCrack / 86400).toFixed(2);
      timeUnit = 'days';
    } else if (secondsToCrack < 31536000) {
      timeToCrack = (secondsToCrack / 2592000).toFixed(2);
      timeUnit = 'months';
    } else {
      timeToCrack = (secondsToCrack / 31536000).toFixed(2);
      timeUnit = 'years';
    }
    
    // Score from 0-100
    let score = 0;
    
    // Length contributes up to 25 points
    score += Math.min(25, length * 2);
    
    // Character variety contributes up to 25 points
    let charVarietyScore = 0;
    if (hasLower) charVarietyScore += 6;
    if (hasUpper) charVarietyScore += 6;
    if (hasDigit) charVarietyScore += 6;
    if (hasSpecial) charVarietyScore += 7;
    score += charVarietyScore;
    
    // Entropy contributes up to 25 points
    score += Math.min(25, entropy);
    
    // Penalize for common patterns (up to -25 points)
    if (matchesCommonPattern) score = Math.max(0, score - 25);
    
    // Scale to 0-100
    score = Math.min(100, Math.max(0, score));
    
    // Vulnerability assessment
    let vulnerabilities = [];
    if (length < 8) vulnerabilities.push("Too short (less than 8 characters)");
    if (!hasLower) vulnerabilities.push("No lowercase letters");
    if (!hasUpper) vulnerabilities.push("No uppercase letters");
    if (!hasDigit) vulnerabilities.push("No numbers");
    if (!hasSpecial) vulnerabilities.push("No special characters");
    if (matchesCommonPattern) vulnerabilities.push("Contains common patterns or dictionary words");
    
    // Attack vectors
    let attackVectors = [];
    if (score < 30) {
      attackVectors.push("Brute force attack");
      attackVectors.push("Dictionary attack");
    } else if (score < 60) {
      attackVectors.push("Dictionary attack with common substitutions");
      attackVectors.push("Hybrid attack (dictionary + brute force)");
    } else if (score < 80) {
      attackVectors.push("Advanced hybrid attacks");
    }
    
    // Generate suggestions
    let suggestions = generateSuggestions(pwd, vulnerabilities);
    
    return {
      score,
      entropy: entropy.toFixed(2),
      timeToCrack,
      timeUnit,
      vulnerabilities,
      attackVectors,
      suggestions
    };
  };
  
  const generateSuggestions = (pwd, vulnerabilities) => {
    let suggestions = [];
    
    // Base suggestion
    let improvedPassword = pwd;
    
    // Add length if needed
    if (vulnerabilities.includes("Too short (less than 8 characters)")) {
      const additionalChars = "xK7!pL";
      improvedPassword += additionalChars.substring(0, Math.max(8 - improvedPassword.length, 3));
    }
    
    // Add lowercase if needed
    if (vulnerabilities.includes("No lowercase letters")) {
      improvedPassword = improvedPassword.replace(/A/i, 'a');
      if (!/[a-z]/.test(improvedPassword)) improvedPassword += 'z';
    }
    
    // Add uppercase if needed
    if (vulnerabilities.includes("No uppercase letters")) {
      improvedPassword = improvedPassword.replace(/e/i, 'E');
      if (!/[A-Z]/.test(improvedPassword)) improvedPassword += 'Z';
    }
    
    // Add numbers if needed
    if (vulnerabilities.includes("No numbers")) {
      improvedPassword = improvedPassword.replace(/o/i, '0');
      if (!/\d/.test(improvedPassword)) improvedPassword += '9';
    }
    
    // Add special characters if needed
    if (vulnerabilities.includes("No special characters")) {
      improvedPassword = improvedPassword.replace(/s/i, '$');
      if (!/[^A-Za-z0-9]/.test(improvedPassword)) improvedPassword += '!';
    }
    
    // Replace common patterns
    if (vulnerabilities.includes("Contains common patterns or dictionary words")) {
      // Try to replace or modify common patterns
      improvedPassword = improvedPassword
        .replace(/a/gi, '@')
        .replace(/e/gi, '3')
        .replace(/i/gi, '!')
        .replace(/o/gi, '0')
        .replace(/s/gi, '$');
      
      // Add some randomness
      improvedPassword = improvedPassword
        .split('')
        .map((char, i) => i % 3 === 0 && /[a-z]/i.test(char) ? char.toUpperCase() : char)
        .join('');
    }
    
    suggestions.push(improvedPassword);
    
    // Add more variations
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const randomSpecial = () => specialChars[Math.floor(Math.random() * specialChars.length)];
    
    for (let i = 0; i < 2; i++) {
      let variation = improvedPassword;
      
      // Add some random substitutions
      variation = variation
        .split('')
        .map(char => {
          if (Math.random() < 0.3) {
            if (/[a-z]/.test(char)) return char.toUpperCase();
            if (/[A-Z]/.test(char)) return char.toLowerCase();
            if (/\d/.test(char)) return randomSpecial();
          }
          return char;
        })
        .join('');
        
      // Ensure it's different from original suggestion
      if (variation !== improvedPassword) {
        suggestions.push(variation);
      } else {
        suggestions.push(improvedPassword + randomSpecial() + Math.floor(Math.random() * 100));
      }
    }
    
    return suggestions;
  };

  const handleMaxTimeChange = (value) => {
    setMaxCrackTime(value);
  };

  const handleTimeUnitChange = (unit) => {
    setTimeUnit(unit);
  };

  return (
    <div className="App">
      <header>
        <h1>AI-Powered Password Strength Analyzer</h1>
        <p>Create stronger passwords with advanced security analysis</p>
      </header>
      
      <main>
        <div className="container">
          <div className="password-section">
            <h2>Test Your Password</h2>
            <PasswordInput 
              password={password} 
              setPassword={setPassword} 
              maxCrackTime={maxCrackTime}
              timeUnit={timeUnit}
              onMaxTimeChange={handleMaxTimeChange}
              onTimeUnitChange={handleTimeUnitChange}
            />
            
            {loading && <div className="loading">Analyzing password security...</div>}
            
            {analysis && (
              <>
                <PasswordStrengthMeter score={analysis.score} />
                <StrengthAnalysis analysis={analysis} />
                <PasswordSuggestions suggestions={analysis.suggestions} />
              </>
            )}
          </div>
          
          <InfoPanel />
        </div>
      </main>
      
      <footer>
        <p>Password Strength Analyzer powered by GenAI and Machine Learning</p>
        <p>Disclaimer: No passwords are stored or transmitted to third parties</p>
      </footer>
    </div>
  );
}

export default App;