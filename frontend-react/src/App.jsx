
import { useState } from 'react'
import './App.css'

const copy = {
  en: {
    name: "English", tagline: "DIGITAL SAFETY FOR EVERYONE",
    title: "Pause. Check. Stay safe.",
    subtitle: "Check suspicious messages before you click a link, send money, or share personal information.",
    language: "Interface language", mode: "Analysis method",
    ml: "Classic ML", ai: "Multilingual AI",
    message: "Message to check", placeholder: "Paste the SMS, WhatsApp message, or alert here?",
    count: "characters", example: "Try a sample", suspicious: "Suspicious prize message",
    normal: "Normal message", clear: "Clear", analyze: "Check this message",
    loading: "Checking message?", privacy: "Protect your privacy",
    privacyText: "Never paste passwords, PINs, OTPs, or full bank details. Only submit the message text you need to check.",
    result: "Analysis result", scam: "Likely scam", safe: "No clear scam signs detected",
    uncertain: "Needs caution", detected: "Detected message language",
    category: "Possible scam type", confidence: "Model confidence",
    explanation: "Why this result?", advice: "What should you do?",
    adviceScam: "Do not click links, send money, or share codes. Verify the sender using an official contact channel.",
    adviceSafe: "This result does not guarantee the message is safe. Verify unexpected requests independently.",
    adviceUncertain: "Do not act on the message yet. Verify the sender and request through an official channel.",
    errorEmpty: "Enter a message to check.", errorLong: "Keep the message within 2,000 characters.",
    errorConnect: "Could not reach the analysis service. Check that the selected API is running and try again.",
    footer: "An AI-assisted safety tool. Results are guidance, not a guarantee.",
    ready: "Ready to check", mlNote: "Checks text patterns associated with spam.",
    aiNote: "Uses multilingual semantic analysis. Local API required during development.",
    confidenceNote: "Confidence is the model's estimate, not a guarantee of correctness.",
  },
  yo: {
    name: "Yor?b?", tagline: "??B? ?R?Y?N F?N GBOGBO ?N?Y?N",
    title: "D?r?. ??y??w?. D??b? bo ara r?.",
    subtitle: "??y??w? ?w?n ?fir?n??? t? ? ?iy?m?j? k? o t? t? ?j?p??, fi ow? r?n???, t?b? p?n ?s?f?nni ara ?ni.",
    language: "?d? oj?-?p?", mode: "??n? ???y??w?",
    ml: "??k?? ??r? (ML)", ai: "AI on?r?ur? ?d?",
    message: "?fir?n??? l?ti ??y??w?", placeholder: "Fi SMS, ?fir?n??? WhatsApp, t?b? ?k?l?? s?b??",
    count: "?m?", example: "Gb?y?nj? ?p??r?", suspicious: "?fir?n??? ??b?n t? ? ?iy?m?j?",
    normal: "?fir?n??? d??d??", clear: "Pa r??", analyze: "??y??w? ?fir?n??? y??",
    loading: "? ??y??w??", privacy: "D??b? bo ?s?f?nni r?",
    privacyText: "M? ?e fi ??r?? a??n?, PIN, OTP, t?b? gbogbo ?l?y? b??k? r? s?b?.",
    result: "?b?j?de ???y??w?", scam: "? ?e? ?e k? ? j?? j?b?t?",
    safe: "A k? r? ?m? j?b?t? t? ?e kedere", uncertain: "???ra",
    detected: "?d? ?fir?n???", category: "Ir? j?b?t? t? ?e? ?e",
    confidence: "?gb??k??l? ?w??e", explanation: "K? l? fa ?b?j?de y???",
    advice: "K? ni k? o ?e?",
    adviceScam: "M? t? ?j?p??, m? fi ow? r?n???, m? s? p?n ?w?n k??d?. J??r?? s? ?ni t? r?n??? n?? n?pas?? ??n? ?b?nis??r?? ?fin.",
    adviceSafe: "?b?j?de y?? k? t?m?? s? p? ?fir?n??? n?? d?j? p? ? l??l?wu. ??y??w? ?w?n ?b??r? ??r?t??l?? l??t??.",
    adviceUncertain: "M? ?e t??l? ?t??ni ?fir?n??? n?? l??w??l??w??. J??r?? s? i n?pas?? ??n? ?fin.",
    errorEmpty: "T? ?fir?n??? kan s?b? l?ti ??y??w?.", errorLong: "?fir?n??? k? gb??d?? ju ?m? 2,000 l?.",
    errorConnect: "A k? l? d? i??? ???y??w?. ??y??w? API k? o s? t?n gb?y?nj?.",
    footer: "Ohun ?l? ??b? t? AI ? ??r?nw?? f?n. ?b?j?de j?? ?t??nis??n?, k? ? ?e ?d?nil?j?.",
    ready: "? ti ?et?n", mlNote: "? ??y??w? ?w?n ?p??r? ??r?? t? n? ? ?e p??l? spam.",
    aiNote: "? lo ???y??w? ?tum?? ?d? p?p??. API agb?gb? ni a n?l? n?gb? ?d?gb?s?k?.",
    confidenceNote: "?gb??k??l? j?? ???r? ?w??e, k? ? ?e ?d?nil?j? p? ? p?ye.",
  },
  ig: {
    name: "Igbo", tagline: "Nchekwa dijital? maka onye ? b?la",
    title: "Kw?s?. Lelee. N?r? n? nchebe.",
    subtitle: "Nyochaa ozi na-enyo enyo tupu ?t?kwas? ya obi.",
    language: "As?s? ihu weeb?", mode: "?z? nyocha",
    ml: "Usoro mm?ta igwe (ML)", ai: "AI na-as? ?t?t? as?s?",
    message: "Ozi a ga-enyocha", placeholder: "Tinye SMS, ozi WhatsApp, ma ? b? ?kwa ebe a?",
    count: "mkp?r?edemede", example: "Nwaa ihe at?", suspicious: "Ozi onyinye na-enyo enyo",
    normal: "Ozi nk?t?", clear: "Hichap?", analyze: "Nyochaa ozi a",
    loading: "A na-enyocha ozi?", privacy: "Chebe ozi nkeonwe g?",
    privacyText: "Etinyela okwuntughe, PIN, OTP, ma ? b? nk?wa ?l? ak? g? zuru ezu.",
    result: "Nsonaaz? nyocha", scam: "O nwere ike ?b? wayo",
    safe: "Ach?p?tagh? akara wayo doro anya", uncertain: "Kpachara anya",
    detected: "As?s? ozi", category: "?d? wayo nwere ike ?d?",
    confidence: "Nt?kwas? obi ?d?", explanation: "G?n? kpatara nsonaaz? a?",
    advice: "G?n? ka ? ga-eme?",
    adviceScam: "Ap?ala njik?, ezipula ego, ekesakwala koodu. Jiri ?z? g??ment? kwenye onye zitere ozi ah?.",
    adviceSafe: "Nsonaaz? a anagh? ekwe nkwa na ozi ah? d? nchebe. Nyochaa ar?r?? ah? nke ?ma.",
    adviceUncertain: "Emela ihe ozi ah? gwara g? ugbu a. Kwenye ya site n??z? g??ment?.",
    errorEmpty: "Tinye ozi ? ch?r? inyocha.", errorLong: "Ozi ah? agagh? akar? mkp?r?edemede 2,000.",
    errorConnect: "Enwegh? ike iru ?r? nyocha. Lelee API wee nwalee ?z?.",
    footer: "Ngwa nchekwa AI na-enyere aka. Nsonaaz? b? nd?m?d?, ? b?gh? nkwa.",
    ready: "D? njikere", mlNote: "Na-enyocha usoro okwu met?tara spam.",
    aiNote: "Na-eji nyocha ngh?ta as?s?. API mpaghara d? mkpa n'oge mmepe.",
    confidenceNote: "Nt?kwas? obi b? at?mat? ?d?, ? b?gh? nkwa izi ezi.",
  },
  ha: {
    name: "Hausa", tagline: "TSARON DIJITAL GA KOWA",
    title: "Dakatar. Duba. Kasance cikin aminci.",
    subtitle: "Duba sa?onnin da ake zargi kafin ka danna maha?i, aika ku?i, ko raba bayanan sirri.",
    language: "Harshen shafin", mode: "Hanyar bincike",
    ml: "Koyon inji (ML)", ai: "AI mai harsuna da yawa",
    message: "Sa?on da za a bincika", placeholder: "Manna SMS, sa?on WhatsApp, ko sanarwa a nan?",
    count: "haruffa", example: "Gwada misali", suspicious: "Sa?on kyauta mai zargi",
    normal: "Sa?o na yau da kullum", clear: "Goge", analyze: "Bincika wannan sa?on",
    loading: "Ana bincika sa?o?", privacy: "Kare bayananka",
    privacyText: "Kada ka manna kalmar sirri, PIN, OTP, ko cikakkun bayanan banki.",
    result: "Sakamakon bincike", scam: "Mai yiwuwa zamba",
    safe: "Ba a gano alamun zamba bayyanannu ba", uncertain: "Yi hattara",
    detected: "Harshen sa?on", category: "Nau'in zamba mai yiwuwa",
    confidence: "Amincewar samfurin", explanation: "Me ya sa aka samu wannan sakamakon?",
    advice: "Me ya kamata ka yi?",
    adviceScam: "Kada ka danna maha?i, aika ku?i, ko raba lambobin sirri. Tabbatar da mai aikawa ta hanyar hukuma.",
    adviceSafe: "Wannan sakamakon ba ya tabbatar da cewa sa?on yana da aminci. Tabbatar da bu?atun da ba ka zata ba.",
    adviceUncertain: "Kada ka bi umarnin sa?on tukuna. Tabbatar da shi ta hanyar hukuma.",
    errorEmpty: "Shigar da sa?on da za a bincika.", errorLong: "Sa?on kada ya wuce haruffa 2,000.",
    errorConnect: "Ba a iya ha?uwa da sabis ?in bincike ba. Duba API ka sake gwadawa.",
    footer: "Kayan taimakon tsaro na AI. Sakamako jagora ne, ba tabbaci ba.",
    ready: "A shirye yake", mlNote: "Yana bincika tsarin kalmomin spam.",
    aiNote: "Yana amfani da binciken ma'ana na harsuna da yawa. Ana bu?atar API na gida yayin ha?akawa.",
    confidenceNote: "Amincewa ?iyasin samfurin ne, ba tabbacin daidaito ba.",
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
