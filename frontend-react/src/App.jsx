
import { useState } from 'react'
import './App.css'

const copy = {
  en: {
    name: 'English', tagline: 'DIGITAL SAFETY FOR EVERYONE',
    title: 'Pause. Check. Stay safe.',
    subtitle: 'Check suspicious messages before you click a link, send money, or share personal information.',
    language: 'Interface language', mode: 'Analysis method',
    ml: 'Classic ML', ai: 'Multilingual AI',
    message: 'Message to check', placeholder: 'Paste the SMS, WhatsApp message, or alert here…',
    count: 'characters', example: 'Try a sample', suspicious: 'Suspicious prize message',
    normal: 'Normal message', clear: 'Clear', analyze: 'Check this message',
    loading: 'Checking message…', privacy: 'Protect your privacy',
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
    confidenceNote: 'Confidence is the model’s estimate, not a guarantee of correctness.',
  },
  yo: {
    name: 'Yorùbá', tagline: 'ÀÀBÒ ÌRÒYÌN FÚN GBOGBO ÈNÌYÀN',
    title: 'Dúró. Ṣàyẹ̀wò. Dáàbò bo ara rẹ.',
    subtitle: 'Ṣàyẹ̀wò ìfiránṣẹ́ tó ń ṣiyèméjì kí o tó tẹ ìjápọ̀, fi owó ránṣẹ́, tàbí pín ìsọfúnni ara ẹni.',
    language: 'Èdè ojú-òpó', mode: 'Ọ̀nà ìṣàyẹ̀wò',
    ml: 'ML ìbílẹ̀', ai: 'AI onírúurú èdè',
    message: 'Ìfiránṣẹ́ láti ṣàyẹ̀wò', placeholder: 'Fi SMS, ìfiránṣẹ́ WhatsApp tàbí ìkìlọ̀ síbí…',
    count: 'àmì', example: 'Gbìyànjú àpẹẹrẹ', suspicious: 'Ìfiránṣẹ́ ẹ̀bùn tí ń ṣiyèméjì',
    normal: 'Ìfiránṣẹ́ déédéé', clear: 'Pa rẹ́', analyze: 'Ṣàyẹ̀wò ìfiránṣẹ́ yìí',
    loading: 'Ń ṣàyẹ̀wò…', privacy: 'Dáàbò bo ìsọfúnni rẹ',
    privacyText: 'Má ṣe fi ọ̀rọ̀ aṣínà, PIN, OTP tàbí gbogbo àlàyé báńkì síbí.',
    result: 'Àbájáde ìṣàyẹ̀wò', scam: 'Ó ṣeé ṣe kí ó jẹ́ jìbìtì',
    safe: 'A kò rí àmì jìbìtì tó ṣe kedere', uncertain: 'Ṣọ́ra',
    detected: 'Èdè ìfiránṣẹ́', category: 'Irú jìbìtì tó ṣeé ṣe',
    confidence: 'Ìgbẹ́kẹ̀lé àwòṣe', explanation: 'Kí ló fà á?',
    advice: 'Kí lo yẹ kí o ṣe?',
    adviceScam: 'Má tẹ ìjápọ̀, má fi owó ránṣẹ́, má sì pín kóòdù. Jẹ́rìí sí olùránṣẹ́ nípasẹ̀ ọ̀nà ìbánisọ̀rọ̀ òfin.',
    adviceSafe: 'Èyí kò túmọ̀ sí pé ìfiránṣẹ́ náà dájú pé ó láìléwu. Ṣàyẹ̀wò àwọn ìbéèrè àjèjì.',
    adviceUncertain: 'Má ṣe gbésẹ̀ lórí ìfiránṣẹ́ náà síbẹ̀. Jẹ́rìí sí i nípasẹ̀ ọ̀nà òfin.',
    errorEmpty: 'Tẹ ìfiránṣẹ́ kan sílẹ̀ láti ṣàyẹ̀wò.', errorLong: 'Ìfiránṣẹ́ kò gbọdọ̀ ju àmì 2,000 lọ.',
    errorConnect: 'A kò lè sopọ̀ mọ́ iṣẹ́ ìṣàyẹ̀wò. Ṣàyẹ̀wò API kí o sì tún gbìyànjú.',
    footer: 'Ọ̀nà ìrànlọ́wọ́ ààbò AI. Àbájáde jẹ́ ìtọ́sọ́nà, kì í ṣe ìdánilójú.',
    ready: 'Ó ti ṣetán', mlNote: 'Ń ṣàyẹ̀wò àwọn àpẹẹrẹ ọ̀rọ̀ spam.',
    aiNote: 'Ń lo ìṣàyẹ̀wò ìtumọ̀ onírúurú èdè. API agbègbè ni a nílò fún ìdánwò.',
    confidenceNote: 'Ìgbẹ́kẹ̀lé jẹ́ ìṣírò àwòṣe, kì í ṣe ìdánilójú.',
  },
  ig: {
    name: 'Igbo', tagline: 'Nchekwa DIJITALỤ MAKA ONYE Ọ BỤLA',
    title: 'Kwụsị. Lelee. Nọrọ na nchekwa.',
    subtitle: 'Lelee ozi na-enyo enyo tupu ịpịa njikọ, zipu ego, ma ọ bụ kesaa ozi nkeonwe.',
    language: 'Asụsụ ihu weebụ', mode: 'Ụzọ nyocha',
    ml: 'ML nkịtị', ai: 'AI ọtụtụ asụsụ',
    message: 'Ozi a ga-enyocha', placeholder: 'Tinye SMS, ozi WhatsApp, ma ọ bụ ọkwa ebe a…',
    count: 'mkpụrụedemede', example: 'Nwalee ihe atụ', suspicious: 'Ozi onyinye na-enyo enyo',
    normal: 'Ozi nkịtị', clear: 'Hichapụ', analyze: 'Nyochaa ozi a',
    loading: 'A na-enyocha ozi…', privacy: 'Chebe ozi nkeonwe gị',
    privacyText: 'Etinyela okwuntughe, PIN, OTP, ma ọ bụ nkọwa ụlọ akụ gị zuru ezu.',
    result: 'Nsonaazụ nyocha', scam: 'O nwere ike ịbụ wayo',
    safe: 'Achọpụtaghị akara wayo doro anya', uncertain: 'Kpachara anya',
    detected: 'Asụsụ ozi', category: 'Ụdị wayo nwere ike ịdị',
    confidence: 'Ntụkwasị obi ụdị', explanation: 'Gịnị kpatara nsonaazụ a?',
    advice: 'Gịnị ka ị ga-eme?',
    adviceScam: 'Apịala njikọ, ezipula ego, ekesakwala koodu. Jiri ụzọ gọọmentị kwenye onye zitere ozi ahụ.',
    adviceSafe: 'Nsonaazụ a anaghị ekwe nkwa na ozi ahụ dị nchebe. Nyochaa arịrịọ a na-atụghị anya ya.',
    adviceUncertain: 'Emela ihe ozi ahụ gwara gị ugbu a. Kwenye ya site n’ụzọ gọọmentị.',
    errorEmpty: 'Tinye ozi ịchọrọ inyocha.', errorLong: 'Ozi ahụ agaghị akarị mkpụrụedemede 2,000.',
    errorConnect: 'Enweghị ike iru ọrụ nyocha. Lelee API wee nwalee ọzọ.',
    footer: 'Ngwa nchekwa nke AI na-enyere aka. Nsonaazụ bụ ndụmọdụ, ọ bụghị nkwa.',
    ready: 'Dị njikere', mlNote: 'Na-enyocha usoro okwu metụtara spam.',
    aiNote: 'Na-eji nyocha nghọta ọtụtụ asụsụ. API mpaghara dị mkpa n’oge mmepe.',
    confidenceNote: 'Ntụkwasị obi bụ atụmatụ ụdị, ọ bụghị nkwa izi ezi.',
  },
  ha: {
    name: 'Hausa', tagline: 'TSARON DIJITAL GA KOWA',
    title: 'Dakatar. Duba. Kasance cikin aminci.',
    subtitle: 'Duba saƙonnin da ake zargi kafin ka danna mahaɗi, aika kuɗi, ko raba bayanan sirri.',
    language: 'Harshen shafin', mode: 'Hanyar bincike',
    ml: 'ML na yau da kullum', ai: 'AI mai harsuna da yawa',
    message: 'Saƙon da za a bincika', placeholder: 'Manna SMS, saƙon WhatsApp, ko sanarwa a nan…',
    count: 'haruffa', example: 'Gwada misali', suspicious: 'Saƙon kyauta mai zargi',
    normal: 'Saƙo na yau da kullum', clear: 'Goge', analyze: 'Bincika wannan saƙon',
    loading: 'Ana bincika saƙo…', privacy: 'Kare bayananka',
    privacyText: 'Kada ka manna kalmar sirri, PIN, OTP, ko cikakkun bayanan banki.',
    result: 'Sakamakon bincike', scam: 'Mai yiwuwa zamba',
    safe: 'Ba a gano alamun zamba bayyanannu ba', uncertain: 'Yi hattara',
    detected: 'Harshen saƙon', category: 'Nau’in zamba mai yiwuwa',
    confidence: 'Amincewar samfurin', explanation: 'Me ya sa aka samu wannan sakamakon?',
    advice: 'Me ya kamata ka yi?',
    adviceScam: 'Kada ka danna mahaɗi, aika kuɗi, ko raba lambobin sirri. Tabbatar da mai aikawa ta hanyar hukuma.',
    adviceSafe: 'Wannan sakamakon ba ya tabbatar da cewa saƙon yana da aminci. Tabbatar da buƙatun da ba ka zata ba.',
    adviceUncertain: 'Kada ka bi umarnin saƙon tukuna. Tabbatar da shi ta hanyar hukuma.',
    errorEmpty: 'Shigar da saƙon da za a bincika.', errorLong: 'Saƙon kada ya wuce haruffa 2,000.',
    errorConnect: 'Ba a iya haɗuwa da sabis ɗin bincike ba. Duba API ka sake gwadawa.',
    footer: 'Kayan taimakon tsaro na AI. Sakamako jagora ne, ba tabbaci ba.',
    ready: 'A shirye yake', mlNote: 'Yana bincika tsarin kalmomin spam.',
    aiNote: 'Yana amfani da binciken ma’ana na harsuna da yawa. Ana buƙatar API na gida yayin haɓakawa.',
    confidenceNote: 'Amincewa ƙiyasin samfurin ne, ba tabbacin daidaito ba.',
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
    : (import.meta.env.VITE_ML_API_URL || 'https://phishing-message-classifier.onrender.com')
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
                <span className="mode-symbol">✳</span>
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
            <span aria-hidden="true">→</span>
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
                    <strong>{result.user_language || '—'}</strong>
                  </div>
                  <div className="result-detail">
                    <span>{t.category}</span>
                    <strong>{result.scam_type || '—'}</strong>
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
          <div className="trust-icon" aria-hidden="true">✓</div>
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
