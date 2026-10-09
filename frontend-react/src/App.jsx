
import { useState } from 'react'
import './App.css'

const copy = {
  en: {
    name: 'English', tagline: 'DIGITAL SAFETY FOR EVERYONE',
    title: 'Pause. Check. Stay safe.',
    subtitle: 'Check suspicious messages before you click a link, send money, or share personal information.',
    language: 'Interface language', mode: 'Analysis method',
    ml: 'Classic ML', ai: 'Multilingual AI',
    message: 'Message to check', placeholder: 'Paste the SMS, WhatsApp message, or alert hereâ€¦',
    count: 'characters', example: 'Try a sample', suspicious: 'Suspicious prize message',
    normal: 'Normal message', clear: 'Clear', analyze: 'Check this message',
    loading: 'Checking messageâ€¦', privacy: 'Protect your privacy',
    privacyText: 'Never paste passwords, PINs, OTPs, or full bank details. Only submit the message text you need to check.',
    result: 'Analysis result', scam: 'Likely scam', safe: 'No clear scam signs detected',
    uncertain: 'Needs caution', detected: 'Detected message language',
    category: 'Possible scam type', confidence: 'Model confidence',
    explanation: 'Why this result?', advice: 'What should you do?',
    adviceScam: 'Do not click links, send money, or share codes. Verify the sender using an official contact channel.',
    adviceSafe: 'This result does not guarantee the message is safe. Verify unexpected requests independently.',
    adviceUncertain: 'Do not act on the message yet. Verify the sender and request through an official channel.',
    errorEmpty: 'Enter a message to check.', errorLong: 'Keep the message within 2,000 characters.',
    errorConnect: 'Could not reach the analysis service. Check that the selected API is running and try again.',
    footer: 'An AI-assisted safety tool. Results are guidance, not a guarantee.',
    ready: 'Ready to check', mlNote: 'Checks text patterns associated with spam.',
    aiNote: 'Uses multilingual semantic analysis. Local API required during development.',
    confidenceNote: 'Confidence is the modelâ€™s estimate, not a guarantee of correctness.',
  },
  yo: {
    name: 'YorÃ¹bÃ¡', tagline: 'Ã€Ã€BÃ’ ÃŒRÃ’YÃŒN FÃšN GBOGBO ÃˆNÃŒYÃ€N',
    title: 'DÃºrÃ³. á¹¢Ã yáº¹Ì€wÃ². DÃ¡Ã bÃ² bo ara ráº¹.',
    subtitle: 'á¹¢Ã yáº¹Ì€wÃ² Ã¬firÃ¡ná¹£áº¹Ì tÃ³ Å„ á¹£iyÃ¨mÃ©jÃ¬ kÃ­ o tÃ³ táº¹ Ã¬jÃ¡pá»Ì€, fi owÃ³ rÃ¡ná¹£áº¹Ì, tÃ bÃ­ pÃ­n Ã¬sá»fÃºnni ara áº¹ni.',
    language: 'ÃˆdÃ¨ ojÃº-Ã²pÃ³', mode: 'á»ŒÌ€nÃ  Ã¬á¹£Ã yáº¹Ì€wÃ²',
    ml: 'ML Ã¬bÃ­láº¹Ì€', ai: 'AI onÃ­rÃºurÃº Ã¨dÃ¨',
    message: 'ÃŒfirÃ¡ná¹£áº¹Ì lÃ¡ti á¹£Ã yáº¹Ì€wÃ²', placeholder: 'Fi SMS, Ã¬firÃ¡ná¹£áº¹Ì WhatsApp tÃ bÃ­ Ã¬kÃ¬lá»Ì€ sÃ­bÃ­â€¦',
    count: 'Ã mÃ¬', example: 'GbÃ¬yÃ njÃº Ã páº¹áº¹ráº¹', suspicious: 'ÃŒfirÃ¡ná¹£áº¹Ì áº¹Ì€bÃ¹n tÃ­ Å„ á¹£iyÃ¨mÃ©jÃ¬',
    normal: 'ÃŒfirÃ¡ná¹£áº¹Ì dÃ©Ã©dÃ©Ã©', clear: 'Pa ráº¹Ì', analyze: 'á¹¢Ã yáº¹Ì€wÃ² Ã¬firÃ¡ná¹£áº¹Ì yÃ¬Ã­',
    loading: 'Åƒ á¹£Ã yáº¹Ì€wÃ²â€¦', privacy: 'DÃ¡Ã bÃ² bo Ã¬sá»fÃºnni ráº¹',
    privacyText: 'MÃ¡ á¹£e fi á»Ì€rá»Ì€ aá¹£Ã­nÃ , PIN, OTP tÃ bÃ­ gbogbo Ã lÃ yÃ© bÃ¡Å„kÃ¬ sÃ­bÃ­.',
    result: 'Ã€bÃ¡jÃ¡de Ã¬á¹£Ã yáº¹Ì€wÃ²', scam: 'Ã“ á¹£eÃ© á¹£e kÃ­ Ã³ jáº¹Ì jÃ¬bÃ¬tÃ¬',
    safe: 'A kÃ² rÃ­ Ã mÃ¬ jÃ¬bÃ¬tÃ¬ tÃ³ á¹£e kedere', uncertain: 'á¹¢á»Ìra',
    detected: 'ÃˆdÃ¨ Ã¬firÃ¡ná¹£áº¹Ì', category: 'IrÃº jÃ¬bÃ¬tÃ¬ tÃ³ á¹£eÃ© á¹£e',
    confidence: 'ÃŒgbáº¹Ìkáº¹Ì€lÃ© Ã wÃ²á¹£e', explanation: 'KÃ­ lÃ³ fÃ  Ã¡?',
    advice: 'KÃ­ lo yáº¹ kÃ­ o á¹£e?',
    adviceScam: 'MÃ¡ táº¹ Ã¬jÃ¡pá»Ì€, mÃ¡ fi owÃ³ rÃ¡ná¹£áº¹Ì, mÃ¡ sÃ¬ pÃ­n kÃ³Ã²dÃ¹. Jáº¹ÌrÃ¬Ã­ sÃ­ olÃ¹rÃ¡ná¹£áº¹Ì nÃ­pasáº¹Ì€ á»Ì€nÃ  Ã¬bÃ¡nisá»Ì€rá»Ì€ Ã²fin.',
    adviceSafe: 'ÃˆyÃ­ kÃ² tÃºmá»Ì€ sÃ­ pÃ© Ã¬firÃ¡ná¹£áº¹Ì nÃ¡Ã  dÃ¡jÃº pÃ© Ã³ lÃ¡Ã¬lÃ©wu. á¹¢Ã yáº¹Ì€wÃ² Ã wá»n Ã¬bÃ©Ã¨rÃ¨ Ã jÃ¨jÃ¬.',
    adviceUncertain: 'MÃ¡ á¹£e gbÃ©sáº¹Ì€ lÃ³rÃ­ Ã¬firÃ¡ná¹£áº¹Ì nÃ¡Ã  sÃ­báº¹Ì€. Jáº¹ÌrÃ¬Ã­ sÃ­ i nÃ­pasáº¹Ì€ á»Ì€nÃ  Ã²fin.',
    errorEmpty: 'Táº¹ Ã¬firÃ¡ná¹£áº¹Ì kan sÃ­láº¹Ì€ lÃ¡ti á¹£Ã yáº¹Ì€wÃ².', errorLong: 'ÃŒfirÃ¡ná¹£áº¹Ì kÃ² gbá»dá»Ì€ ju Ã mÃ¬ 2,000 lá».',
    errorConnect: 'A kÃ² lÃ¨ sopá»Ì€ má»Ì iá¹£áº¹Ì Ã¬á¹£Ã yáº¹Ì€wÃ². á¹¢Ã yáº¹Ì€wÃ² API kÃ­ o sÃ¬ tÃºn gbÃ¬yÃ njÃº.',
    footer: 'á»ŒÌ€nÃ  Ã¬rÃ nlá»Ìwá»Ì Ã Ã bÃ² AI. Ã€bÃ¡jÃ¡de jáº¹Ì Ã¬tá»Ìsá»ÌnÃ , kÃ¬ Ã­ á¹£e Ã¬dÃ¡nilÃ³jÃº.',
    ready: 'Ã“ ti á¹£etÃ¡n', mlNote: 'Åƒ á¹£Ã yáº¹Ì€wÃ² Ã wá»n Ã páº¹áº¹ráº¹ á»Ì€rá»Ì€ spam.',
    aiNote: 'Åƒ lo Ã¬á¹£Ã yáº¹Ì€wÃ² Ã¬tumá»Ì€ onÃ­rÃºurÃº Ã¨dÃ¨. API agbÃ¨gbÃ¨ ni a nÃ­lÃ² fÃºn Ã¬dÃ¡nwÃ².',
    confidenceNote: 'ÃŒgbáº¹Ìkáº¹Ì€lÃ© jáº¹Ì Ã¬á¹£Ã­rÃ² Ã wÃ²á¹£e, kÃ¬ Ã­ á¹£e Ã¬dÃ¡nilÃ³jÃº.',
  },
  ig: {
    name: 'Igbo', tagline: 'Nchekwa DIJITALá»¤ MAKA ONYE á»Œ Bá»¤LA',
    title: 'Kwá»¥sá»‹. Lelee. Ná»rá» na nchekwa.',
    subtitle: 'Lelee ozi na-enyo enyo tupu á»‹pá»‹a njiká», zipu ego, ma á» bá»¥ kesaa ozi nkeonwe.',
    language: 'Asá»¥sá»¥ ihu weebá»¥', mode: 'á»¤zá» nyocha',
    ml: 'ML nká»‹tá»‹', ai: 'AI á»tá»¥tá»¥ asá»¥sá»¥',
    message: 'Ozi a ga-enyocha', placeholder: 'Tinye SMS, ozi WhatsApp, ma á» bá»¥ á»kwa ebe aâ€¦',
    count: 'mkpá»¥rá»¥edemede', example: 'Nwalee ihe atá»¥', suspicious: 'Ozi onyinye na-enyo enyo',
    normal: 'Ozi nká»‹tá»‹', clear: 'Hichapá»¥', analyze: 'Nyochaa ozi a',
    loading: 'A na-enyocha oziâ€¦', privacy: 'Chebe ozi nkeonwe gá»‹',
    privacyText: 'Etinyela okwuntughe, PIN, OTP, ma á» bá»¥ nká»wa á»¥lá» aká»¥ gá»‹ zuru ezu.',
    result: 'Nsonaazá»¥ nyocha', scam: 'O nwere ike á»‹bá»¥ wayo',
    safe: 'Achá»pá»¥taghá»‹ akara wayo doro anya', uncertain: 'Kpachara anya',
    detected: 'Asá»¥sá»¥ ozi', category: 'á»¤dá»‹ wayo nwere ike á»‹dá»‹',
    confidence: 'Ntá»¥kwasá»‹ obi á»¥dá»‹', explanation: 'Gá»‹ná»‹ kpatara nsonaazá»¥ a?',
    advice: 'Gá»‹ná»‹ ka á»‹ ga-eme?',
    adviceScam: 'Apá»‹ala njiká», ezipula ego, ekesakwala koodu. Jiri á»¥zá» gá»á»mentá»‹ kwenye onye zitere ozi ahá»¥.',
    adviceSafe: 'Nsonaazá»¥ a anaghá»‹ ekwe nkwa na ozi ahá»¥ dá»‹ nchebe. Nyochaa ará»‹rá»‹á» a na-atá»¥ghá»‹ anya ya.',
    adviceUncertain: 'Emela ihe ozi ahá»¥ gwara gá»‹ ugbu a. Kwenye ya site nâ€™á»¥zá» gá»á»mentá»‹.',
    errorEmpty: 'Tinye ozi á»‹chá»rá» inyocha.', errorLong: 'Ozi ahá»¥ agaghá»‹ akará»‹ mkpá»¥rá»¥edemede 2,000.',
    errorConnect: 'Enweghá»‹ ike iru á»rá»¥ nyocha. Lelee API wee nwalee á»zá».',
    footer: 'Ngwa nchekwa nke AI na-enyere aka. Nsonaazá»¥ bá»¥ ndá»¥má»dá»¥, á» bá»¥ghá»‹ nkwa.',
    ready: 'Dá»‹ njikere', mlNote: 'Na-enyocha usoro okwu metá»¥tara spam.',
    aiNote: 'Na-eji nyocha nghá»ta á»tá»¥tá»¥ asá»¥sá»¥. API mpaghara dá»‹ mkpa nâ€™oge mmepe.',
    confidenceNote: 'Ntá»¥kwasá»‹ obi bá»¥ atá»¥matá»¥ á»¥dá»‹, á» bá»¥ghá»‹ nkwa izi ezi.',
  },
  ha: {
    name: 'Hausa', tagline: 'TSARON DIJITAL GA KOWA',
    title: 'Dakatar. Duba. Kasance cikin aminci.',
    subtitle: 'Duba saÆ™onnin da ake zargi kafin ka danna mahaÉ—i, aika kuÉ—i, ko raba bayanan sirri.',
    language: 'Harshen shafin', mode: 'Hanyar bincike',
    ml: 'ML na yau da kullum', ai: 'AI mai harsuna da yawa',
    message: 'SaÆ™on da za a bincika', placeholder: 'Manna SMS, saÆ™on WhatsApp, ko sanarwa a nanâ€¦',
    count: 'haruffa', example: 'Gwada misali', suspicious: 'SaÆ™on kyauta mai zargi',
    normal: 'SaÆ™o na yau da kullum', clear: 'Goge', analyze: 'Bincika wannan saÆ™on',
    loading: 'Ana bincika saÆ™oâ€¦', privacy: 'Kare bayananka',
    privacyText: 'Kada ka manna kalmar sirri, PIN, OTP, ko cikakkun bayanan banki.',
    result: 'Sakamakon bincike', scam: 'Mai yiwuwa zamba',
    safe: 'Ba a gano alamun zamba bayyanannu ba', uncertain: 'Yi hattara',
    detected: 'Harshen saÆ™on', category: 'Nauâ€™in zamba mai yiwuwa',
    confidence: 'Amincewar samfurin', explanation: 'Me ya sa aka samu wannan sakamakon?',
    advice: 'Me ya kamata ka yi?',
    adviceScam: 'Kada ka danna mahaÉ—i, aika kuÉ—i, ko raba lambobin sirri. Tabbatar da mai aikawa ta hanyar hukuma.',
    adviceSafe: 'Wannan sakamakon ba ya tabbatar da cewa saÆ™on yana da aminci. Tabbatar da buÆ™atun da ba ka zata ba.',
    adviceUncertain: 'Kada ka bi umarnin saÆ™on tukuna. Tabbatar da shi ta hanyar hukuma.',
    errorEmpty: 'Shigar da saÆ™on da za a bincika.', errorLong: 'SaÆ™on kada ya wuce haruffa 2,000.',
    errorConnect: 'Ba a iya haÉ—uwa da sabis É—in bincike ba. Duba API ka sake gwadawa.',
    footer: 'Kayan taimakon tsaro na AI. Sakamako jagora ne, ba tabbaci ba.',
    ready: 'A shirye yake', mlNote: 'Yana bincika tsarin kalmomin spam.',
    aiNote: 'Yana amfani da binciken maâ€™ana na harsuna da yawa. Ana buÆ™atar API na gida yayin haÉ“akawa.',
    confidenceNote: 'Amincewa Æ™iyasin samfurin ne, ba tabbacin daidaito ba.',
  },
}

const examples = {
  suspicious: 'Congratulations! You have won a free prize. Click this link now to claim your reward.',
  normal: 'Hi, just a reminder that our meeting is scheduled for tomorrow at 10am. See you then.',
}

// During local development, ML requests use the Vite proxy.
// In production, VITE_ML_API_URL should point to the deployed API.
const ML_API = (
  import.meta.env.DEV
    ? ''
    : (import.meta.env.VITE_ML_API_URL || 'https://scamshield-ng-api.onrender.com')
).replace(/\/$/, '')

const AI_API = (
  import.meta.env.VITE_NATLAS_API_URL || 'http://127.0.0.1:8000'
).replace(/\/$/, '')

function App() {
  const [lang, setLang] = useState('en')
  const [mode, setMode] = useState('ai')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const t = copy[lang]

  async function analyze() {
    const text = message.trim()
    setError('')
    setResult(null)

    if (!text) {
      setError(t.errorEmpty)
      return
    }

    if (text.length > 2000) {
      setError(t.errorLong)
      return
    }

    setLoading(true)

    try {
      const endpoint = mode === 'ai'
        ? '/analyze'
        : import.meta.env.DEV
          ? '/api/ml/predict'
          : '/predict'

      const base = mode === 'ai' ? AI_API : ML_API

      const response = await fetch(`${base}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.detail || t.errorConnect)
      }

      if (mode === 'ai') {
        if (!data?.analysis?.verdict) {
          throw new Error(t.errorConnect)
        }

        setResult({
          mode,
          ...data.analysis,
        })
      } else {
        if (!data?.prediction) {
          throw new Error(t.errorConnect)
        }

        const prediction = String(data.prediction).trim().toUpperCase()
        const isSpamPrediction = ['SPAM', 'SCAM', 'PHISHING'].includes(prediction)
        const isLegitimatePrediction = ['LEGITIMATE', 'HAM', 'SAFE'].includes(prediction)

        setResult({
          mode,
          verdict: isSpamPrediction
            ? 'SCAM'
            : isLegitimatePrediction
              ? 'LEGITIMATE'
              : 'UNCERTAIN',
          prediction,
          spamProbability: Number(data.spam_probability),
        })
      }
    } catch (err) {
      console.error('ScamShield analysis request failed:', err)
      setError(
        err instanceof TypeError
          ? t.errorConnect
          : (err.message || t.errorConnect),
      )
    } finally {
      setLoading(false)
    }
  }

  const verdict = String(result?.verdict || '').toUpperCase()
  const isScam = ['SCAM', 'SPAM', 'PHISHING'].includes(verdict)
  const isSafe = ['LEGITIMATE', 'HAM', 'SAFE'].includes(verdict)
  const verdictLabel = isScam ? t.scam : isSafe ? t.safe : t.uncertain

  const confidence = result?.mode === 'ai'
    ? Math.max(0, Math.min(100, Number(result?.confidence || 0) * 100))
    : Math.max(0, Math.min(100, Number(result?.spamProbability || 0) * 100))

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="ScamShield NG home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>
            <strong>ScamShield <em>NG</em></strong>
            <small>{t.tagline}</small>
          </span>
        </a>

        <label className="language-control">
          <span>{t.language}</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label={t.language}
          >
            {Object.entries(copy).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">
            <span className="live-dot" /> {t.ready}
          </div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="hero-pills">
            <span>SMS</span>
            <span>WhatsApp</span>
            <span>Payment alerts</span>
            <span>Prize messages</span>
          </div>
        </section>

        <section className="workspace">
          <div className="workspace-heading">
            <div>
              <span className="section-kicker">SCAMSHIELD ANALYZER</span>
              <h2>{t.message}</h2>
            </div>
            <span className="status-chip">
              <span className="live-dot" /> {loading ? t.loading : t.ready}
            </span>
          </div>

          <div className="mode-picker">
            <span className="field-label">{t.mode}</span>
            <div className="mode-options">
              <button
                type="button"
                className={mode === 'ai' ? 'mode-option active' : 'mode-option'}
                onClick={() => {
                  setMode('ai')
                  setResult(null)
                  setError('')
                }}
              >
                <span className="mode-symbol">âœ³</span>
                <span>
                  <strong>{t.ai}</strong>
                  <small>{t.aiNote}</small>
                </span>
              </button>

              <button
                type="button"
                className={mode === 'ml' ? 'mode-option active' : 'mode-option'}
                onClick={() => {
                  setMode('ml')
                  setResult(null)
                  setError('')
                }}
              >
                <span className="mode-symbol">ML</span>
                <span>
                  <strong>{t.ml}</strong>
                  <small>{t.mlNote}</small>
                </span>
              </button>
            </div>
          </div>

          <div className="message-label-row">
            <label htmlFor="message-input">{t.message}</label>
            <span className={message.length > 1800 ? 'count warning' : 'count'}>
              {message.length}/2000 {t.count}
            </span>
          </div>

          <textarea
            id="message-input"
            value={message}
            maxLength={2000}
            onChange={(e) => {
              setMessage(e.target.value)
              setError('')
            }}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') analyze()
            }}
            placeholder={t.placeholder}
            rows={7}
          />

          <div className="examples-row">
            <span>{t.example}:</span>
            <button
              type="button"
              className="example-chip"
              onClick={() => {
                setMessage(examples.suspicious)
                setResult(null)
                setError('')
              }}
            >
              {t.suspicious}
            </button>
            <button
              type="button"
              className="example-chip"
              onClick={() => {
                setMessage(examples.normal)
                setResult(null)
                setError('')
              }}
            >
              {t.normal}
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setMessage('')
                setResult(null)
                setError('')
              }}
            >
              {t.clear}
            </button>
          </div>

          <div className="privacy-note">
            <span className="privacy-icon" aria-hidden="true">!</span>
            <div>
              <strong>{t.privacy}</strong>
              <p>{t.privacyText}</p>
            </div>
          </div>

          {error && <div className="error-banner" role="alert">{error}</div>}

          <button
            className="analyze-button"
            type="button"
            onClick={analyze}
            disabled={loading}
          >
            {loading ? t.loading : t.analyze}
            <span aria-hidden="true">â†’</span>
          </button>

          <p className="keyboard-hint">Tip: Ctrl + Enter to check</p>
        </section>

        {result && (
          <section
            className={`result-panel ${
              isScam ? 'result-danger' : isSafe ? 'result-safe' : 'result-caution'
            }`}
            aria-live="polite"
          >
            <div className="result-topline">
              <span className="section-kicker">{t.result}</span>
              <span className="result-badge">{verdictLabel}</span>
            </div>

            <h2>{verdictLabel}</h2>

            <p className="result-explanation">
              {result.mode === 'ai'
                ? result.explanation
                : `${t.confidenceNote} ${result.prediction || ''}`}
            </p>

            <div className="result-grid">
              {result.mode === 'ai' && (
                <>
                  <div className="result-detail">
                    <span>{t.detected}</span>
                    <strong>{result.user_language || 'â€”'}</strong>
                  </div>
                  <div className="result-detail">
                    <span>{t.category}</span>
                    <strong>{result.scam_type || 'â€”'}</strong>
                  </div>
                </>
              )}

              <div className="result-detail">
                <span>{result.mode === 'ai' ? t.confidence : 'Spam score'}</span>
                <strong>{confidence.toFixed(0)}%</strong>
              </div>
            </div>

            <div className="confidence-track">
              <div style={{ width: `${confidence}%` }} />
            </div>

            <p className="confidence-note">{t.confidenceNote}</p>

            <div className="advice-box">
              <strong>{t.advice}</strong>
              <p>
                {isScam
                  ? t.adviceScam
                  : isSafe
                    ? t.adviceSafe
                    : t.adviceUncertain}
              </p>
            </div>
          </section>
        )}

        <section className="trust-section">
          <div className="trust-icon" aria-hidden="true">âœ“</div>
          <div>
            <h2>Think before you trust</h2>
            <p>
              Unexpected urgency, prize claims, requests for codes, and pressure to
              transfer money deserve extra scrutiny. Verify important requests independently.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">S</span>
          <span>
            <strong>ScamShield <em>NG</em></strong>
            <small>Built by Ogunlade Faith Kayode</small>
          </span>
        </a>
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}

export default App

