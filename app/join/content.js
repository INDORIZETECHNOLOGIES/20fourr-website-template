/**
 * Provider-recruitment copy, English and Hindi.
 *
 * Guards and small agencies mostly arrive here from a Google search or a
 * WhatsApp forward, on a mid-range Android phone, in Hindi. Both versions are
 * written to be read in that situation — short lines, money first, no jargon.
 * Hindi is written as Hindi, not translated English.
 */

export const WHATSAPP_URL =
  'https://wa.me/910000000000?text=' + encodeURIComponent('I want to join SecureConnect as a provider');

/**
 * The roles shown in the hero.
 *
 * `src` is null until real photography exists. Set it to a path under
 * `public/` (e.g. '/roles/guard.jpg') and the frame renders the photo behind
 * a scrim with the plate text unchanged. Portrait, 3:4, at least 900px tall.
 *
 * Real guards in real uniforms only — see the note in components/RoleFrames.jsx.
 */
const roles = {
  en: [
    {
      code: 'GRD',
      name: 'Security guard',
      req: 'PSARA licence · Govt ID',
      src: '/roles/guard.jpg',
      alt: 'A guard in a marked black security jacket and beanie, working a crowd at an outdoor event.',
    },
    {
      code: 'BNC',
      name: 'Bouncer',
      req: 'PSARA licence · Govt ID',
      src: '/roles/bouncer.jpg',
      alt: 'Bouncer'
    },
    {
      code: 'GUN',
      name: 'Armed gunman',
      req: 'Firearm licence, per booking',
      src: '/roles/gunman.jpg',
      alt: 'An officer in tactical body armour and helmet holding a rifle outside a commercial building.',
    },
  ],
  hi: [
    {
      code: 'GRD',
      name: 'सिक्योरिटी गार्ड',
      req: 'PSARA लाइसेंस · सरकारी ID',
      src: '/roles/guard.jpg',
      alt: 'काली सिक्योरिटी जैकेट और टोपी पहने एक गार्ड, किसी आयोजन में भीड़ संभालते हुए।',
    },
    { code: 'BNC', name: 'बाउंसर', req: 'PSARA लाइसेंस · सरकारी ID', src: null, alt: '' },
    {
      code: 'GUN',
      name: 'गनमैन',
      req: 'हर बुकिंग पर हथियार लाइसेंस',
      src: '/roles/gunman.jpg',
      alt: 'बुलेटप्रूफ जैकेट और हेलमेट पहने, राइफल लिए एक अधिकारी किसी इमारत के बाहर।',
    },
  ],
};

const content = {
  en: {
    roles: roles.en,
    langNote: 'Also available in Hindi',
    eyebrow: 'For guards, bouncers, gunmen and agencies',
    title: 'Get paid in two days. Not in ninety.',
    sub: 'Set your own rate, choose your own days, and get paid on a schedule you can plan around. Joining is free — clear KYC once, then start taking work.',
    ctaWhatsapp: 'Join on WhatsApp',
    ctaApp: 'Download the provider app',
    fine: 'Support in Hindi and English throughout onboarding',

    moneyHead: 'How you get paid',
    money: [
      {
        n: '30%',
        k: 'The moment duty starts',
        d: 'The client reads out a six-digit code, you enter it, and 30% is released straight away. You are not waiting for the shift to end.',
      },
      {
        n: 'T+2',
        k: 'The rest, two days later',
        d: 'The remaining 70% settles two days after you close the duty. Every time, on the same clock, without chasing anyone.',
      },
      {
        n: 'Your rate',
        k: 'You set the price',
        d: 'Day rate, hourly rate and what you charge for a vehicle — all yours to decide. We never set your price for you.',
      },
    ],

    earnHead: 'What a two-day booking actually pays',
    earnTitle: 'Guard · 2 days · your rate ₹2,000/day',
    earnRows: [
      ['Your rate', '₹2,000 × 2 days', '₹4,000.00'],
      ['Platform commission', '15%', '− ₹600.00'],
      ['GST on commission', '18%', '− ₹108.00'],
    ],
    earnTotalK: 'You receive',
    earnTotalV: '₹3,292.00',
    earnFoot: '₹987.60 on the day duty starts · ₹2,304.40 two days after it ends',
    earnNote:
      'The client pays more than ₹4,000 — there is service GST on top — but that tax goes to the government, not to us and not to you. This is the whole of what we take.',

    stepsHead: 'Joining takes about twenty minutes',
    steps: [
      { t: 'Register with your phone number', d: 'Name, phone, email. An OTP confirms the number is yours.' },
      { t: 'Set your services and rates', d: 'Pick guard, bouncer, gunman or PSO, your city, and what you charge per day or per hour.' },
      { t: 'Upload your documents', d: 'Aadhaar, PAN, a live selfie and your PSARA licence. Photos taken on your phone are fine.' },
      { t: 'We verify you', d: 'A person checks every document. If something is wrong you are told exactly what, so you can fix it and resubmit.' },
      { t: 'Start accepting work', d: 'Jobs arrive on your phone. Take the ones that suit you and decline the rest — declining carries no penalty.' },
    ],

    docsHead: 'What to keep ready',
    docs: [
      { t: 'Aadhaar card', d: 'Front and back, readable.' },
      { t: 'PAN card', d: 'Required for your tax records.' },
      { t: 'Live selfie', d: 'Taken inside the app and matched against your ID.' },
      { t: 'PSARA licence', d: 'Needed for verified status. Without it you cannot accept bookings.' },
      { t: 'Firearm licence', d: 'Gunman work only. Re-checked before every armed booking.' },
      { t: 'Bank account details', d: 'For your payouts. Only you can change these — no SecureConnect staff member can edit them.' },
    ],

    fairHead: 'Where you stand',
    fairSub: 'The parts of this that usually go against the guard, and how they work here.',
    fair: [
      {
        k: 'Penalties',
        b: 'If you are penalised for a missed duty you can appeal it with your side of the story. A person reads it and can cancel the penalty entirely.',
      },
      {
        k: 'Ratings',
        b: 'You rate the client just as they rate you. Difficult clients are visible to the next provider, so bad behaviour has a cost on both sides.',
      },
      {
        k: 'Safety',
        b: 'Once the client has paid, you see their threat assessment before you go — whether they have been attacked before and how serious the risk is. You never walk in blind.',
      },
    ],

    faqHead: 'Questions',
    faq: [
      {
        q: 'Is there any joining fee?',
        a: 'No. Registering, uploading documents and verification are all free. We take a 15% commission on work you actually complete — if you earn nothing, you pay nothing.',
      },
      {
        q: 'Do I really need a PSARA licence?',
        a: 'To reach verified status and accept bookings, yes. It is the law for private security work in India, and it is what lets us tell clients you are legitimate. If yours has lapsed, renew it and upload the new one.',
      },
      {
        q: 'What if the client refuses to give me the start code?',
        a: 'Raise it from the booking screen and a support case opens. Our team can see the booking record and your full chat with the client, and will settle it. Do not leave the site without reporting it.',
      },
      {
        q: 'What if I accept a job and then cannot make it?',
        a: 'Tell us as early as you can. More than two hours before the start, the penalty is 50% of the booking and a three-day suspension. Inside two hours it is the full booking value, a fifteen-day suspension and your PSARA privileges blocked — because at that point the client cannot find anyone else.',
      },
      {
        q: 'Do I earn anything beyond the job itself?',
        a: 'Yes. ₹200 at ten completed jobs and a Trusted badge, ₹500 at fifty and an Elite badge — both visible to clients. Refer another provider and you get ₹300 once they finish their first job, with larger bonuses at three, five and ten referrals.',
      },
      {
        q: 'I run an agency with staff. Can I put my whole team on?',
        a: 'Yes. Register as a firm, complete the agency KYC once, then assign your staff per booking with their credentials attached. Registered firms have 1% TCS withheld and appear in our monthly GSTR-8 filing, so your tax position stays documented.',
      },
    ],

    finalTitle: 'Start taking work this week.',
    finalSub: 'Message us on WhatsApp and we will walk you through the documents.',
    chat: {
      who: 'SecureConnect',
      status: 'Replies in minutes',
      rows: [
        // the message the WhatsApp CTA actually prefills — the thread starts
        // where the button leaves off
        { from: 'out', t: 'I want to join SecureConnect as a provider' },
        { from: 'in', t: 'Namaste! Send a photo of your Aadhaar card and we will start your file.' },
        { from: 'out', doc: 'aadhaar.jpg' },
        { from: 'in', t: 'Got it. PAN card next, then your PSARA licence.' },
        { from: 'out', doc: 'psara.pdf' },
        { from: 'in', ok: true, t: 'All four received. A person reviews it — you will hear back within 24 hours.' },
      ],
    },
  },

  hi: {
    roles: roles.hi,
    langNote: 'English में भी उपलब्ध',
    eyebrow: 'गार्ड, बाउंसर, गनमैन और एजेंसियों के लिए',
    title: 'दो दिन में पेमेंट। नब्बे दिन में नहीं।',
    sub: 'अपना रेट खुद तय करें, अपने दिन खुद चुनें, और तय समय पर पैसा पाएँ। जुड़ना बिल्कुल मुफ़्त है — KYC एक बार, उसके बाद काम शुरू।',
    ctaWhatsapp: 'व्हाट्सऐप पर जुड़ें',
    ctaApp: 'प्रोवाइडर ऐप डाउनलोड करें',
    fine: 'शुरू से आख़िर तक हिंदी और अंग्रेज़ी में सहायता',

    moneyHead: 'पैसा कैसे मिलता है',
    money: [
      {
        n: '30%',
        k: 'ड्यूटी शुरू होते ही',
        d: 'क्लाइंट आपको छह अंकों का कोड बताता है, आप उसे डालते हैं, और उसी वक़्त 30% रिलीज़ हो जाता है। शिफ़्ट ख़त्म होने का इंतज़ार नहीं।',
      },
      {
        n: 'T+2',
        k: 'बाक़ी 70%, दो दिन बाद',
        d: 'ड्यूटी बंद करने के दो दिन बाद बाक़ी पैसा आ जाता है। हर बार, उसी हिसाब से, किसी के पीछे भागे बिना।',
      },
      {
        n: 'आपका रेट',
        k: 'दाम आप तय करते हैं',
        d: 'दिन का रेट, घंटे का रेट और गाड़ी का चार्ज — सब आपका फ़ैसला। हम आपका दाम कभी तय नहीं करते।',
      },
    ],

    earnHead: 'दो दिन की बुकिंग में असल में कितना मिलता है',
    earnTitle: 'गार्ड · 2 दिन · आपका रेट ₹2,000 प्रतिदिन',
    earnRows: [
      ['आपका रेट', '₹2,000 × 2 दिन', '₹4,000.00'],
      ['प्लेटफ़ॉर्म कमीशन', '15%', '− ₹600.00'],
      ['कमीशन पर GST', '18%', '− ₹108.00'],
    ],
    earnTotalK: 'आपको मिलता है',
    earnTotalV: '₹3,292.00',
    earnFoot: '₹987.60 ड्यूटी शुरू होने वाले दिन · ₹2,304.40 ख़त्म होने के दो दिन बाद',
    earnNote:
      'क्लाइंट ₹4,000 से ज़्यादा देता है — ऊपर से सर्विस GST लगता है — लेकिन वह टैक्स सरकार को जाता है, न हमें और न आपको। हम बस इतना ही लेते हैं।',

    stepsHead: 'जुड़ने में लगभग बीस मिनट लगते हैं',
    steps: [
      { t: 'फ़ोन नंबर से रजिस्टर करें', d: 'नाम, फ़ोन, ईमेल। OTP से पुष्टि हो जाएगी कि नंबर आपका है।' },
      { t: 'अपनी सेवाएँ और रेट भरें', d: 'गार्ड, बाउंसर, गनमैन या PSO चुनें, अपना शहर बताएँ, और दिन या घंटे का रेट भरें।' },
      { t: 'अपने दस्तावेज़ अपलोड करें', d: 'आधार, पैन, एक लाइव सेल्फ़ी और PSARA लाइसेंस। फ़ोन से खींची हुई फ़ोटो चल जाएगी।' },
      { t: 'हम जाँच करते हैं', d: 'हर दस्तावेज़ को एक व्यक्ति देखता है। कुछ ग़लत हुआ तो आपको साफ़ बताया जाएगा कि क्या ठीक करना है, और आप दोबारा भेज सकते हैं।' },
      { t: 'काम लेना शुरू करें', d: 'काम आपके फ़ोन पर आएगा। जो ठीक लगे ले लें, बाक़ी मना कर दें — मना करने पर कोई जुर्माना नहीं।' },
    ],

    docsHead: 'क्या तैयार रखें',
    docs: [
      { t: 'आधार कार्ड', d: 'आगे और पीछे, दोनों साफ़ पढ़ने लायक़।' },
      { t: 'पैन कार्ड', d: 'आपके टैक्स रिकॉर्ड के लिए ज़रूरी।' },
      { t: 'लाइव सेल्फ़ी', d: 'ऐप में ही ली जाएगी और आपके ID से मिलान किया जाएगा।' },
      { t: 'PSARA लाइसेंस', d: 'वेरिफ़ाइड होने के लिए ज़रूरी। इसके बिना आप बुकिंग नहीं ले सकते।' },
      { t: 'हथियार लाइसेंस', d: 'सिर्फ़ गनमैन के काम के लिए। हर आर्म्ड बुकिंग से पहले दोबारा जाँचा जाता है।' },
      { t: 'बैंक खाते की जानकारी', d: 'पेमेंट के लिए। इसे सिर्फ़ आप बदल सकते हैं — SecureConnect का कोई कर्मचारी नहीं बदल सकता।' },
    ],

    fairHead: 'आपकी जगह कहाँ है',
    fairSub: 'इस काम में जो बातें आमतौर पर गार्ड के ख़िलाफ़ जाती हैं, यहाँ वे कैसे चलती हैं।',
    fair: [
      {
        k: 'जुर्माना',
        b: 'ड्यूटी छूटने पर जुर्माना लगे तो आप अपनी बात रखकर अपील कर सकते हैं। एक व्यक्ति उसे पढ़ता है और जुर्माना पूरी तरह हटा भी सकता है।',
      },
      {
        k: 'रेटिंग',
        b: 'जैसे क्लाइंट आपको रेटिंग देता है, वैसे ही आप भी उसे देते हैं। मुश्किल क्लाइंट अगले प्रोवाइडर को दिख जाता है, यानी बुरा बर्ताव दोनों तरफ़ महँगा पड़ता है।',
      },
      {
        k: 'सुरक्षा',
        b: 'क्लाइंट के पेमेंट करते ही आपको उसका ख़तरा आकलन दिख जाता है — उस पर पहले हमला हुआ है या नहीं, और जोखिम कितना है। आप कभी अनजान होकर नहीं जाते।',
      },
    ],

    faqHead: 'सवाल',
    faq: [
      {
        q: 'जुड़ने की कोई फ़ीस है?',
        a: 'नहीं। रजिस्टर करना, दस्तावेज़ भेजना और जाँच — सब मुफ़्त है। जो काम आप पूरा करते हैं उसी पर हम 15% कमीशन लेते हैं। कमाई नहीं तो कोई पैसा नहीं।',
      },
      {
        q: 'क्या PSARA लाइसेंस सचमुच ज़रूरी है?',
        a: 'वेरिफ़ाइड होकर बुकिंग लेने के लिए हाँ। भारत में प्राइवेट सिक्योरिटी के काम के लिए यह क़ानून है, और इसी से हम क्लाइंट को बता पाते हैं कि आप वैध हैं। अगर आपका लाइसेंस ख़त्म हो गया है तो नया बनवाकर अपलोड कर दें।',
      },
      {
        q: 'अगर क्लाइंट स्टार्ट कोड न दे तो?',
        a: 'बुकिंग स्क्रीन से इसकी शिकायत दर्ज करें, सपोर्ट केस खुल जाएगा। हमारी टीम बुकिंग का रिकॉर्ड और क्लाइंट के साथ आपकी पूरी चैट देख सकती है, और मामला सुलझाती है। बिना शिकायत दर्ज किए जगह मत छोड़िए।',
      },
      {
        q: 'काम लेने के बाद न जा पाऊँ तो क्या होगा?',
        a: 'जितनी जल्दी हो सके हमें बताइए। शुरू होने से दो घंटे से ज़्यादा पहले बताने पर बुकिंग का 50% कटता है और तीन दिन का निलंबन लगता है। दो घंटे के अंदर बताने पर पूरी बुकिंग की रक़म कटती है, पंद्रह दिन का निलंबन लगता है और PSARA अधिकार रोक दिए जाते हैं — क्योंकि उतने कम समय में क्लाइंट को कोई और नहीं मिल पाता।',
      },
      {
        q: 'काम के अलावा और कुछ कमाई होती है?',
        a: 'हाँ। दस काम पूरे होने पर ₹200 और Trusted बैज, पचास पर ₹500 और Elite बैज — दोनों क्लाइंट को दिखते हैं। किसी और प्रोवाइडर को जोड़ने पर उसका पहला काम पूरा होते ही ₹300, और तीन, पाँच व दस रेफ़रल पर उससे बड़े बोनस।',
      },
      {
        q: 'मेरी एजेंसी है, क्या पूरी टीम को जोड़ सकता हूँ?',
        a: 'हाँ। फ़र्म के तौर पर रजिस्टर करें, एजेंसी का KYC एक बार पूरा करें, फिर हर बुकिंग पर अपने स्टाफ़ को उनके दस्तावेज़ों के साथ भेजें। रजिस्टर्ड फ़र्म से 1% TCS कटता है और वह हमारी मासिक GSTR-8 फ़ाइलिंग में जाता है, जिससे आपका टैक्स रिकॉर्ड साफ़ रहता है।',
      },
    ],

    finalTitle: 'इसी हफ़्ते काम लेना शुरू करें।',
    finalSub: 'व्हाट्सऐप पर हमें मैसेज करें, हम दस्तावेज़ों में आपकी मदद करेंगे।',
    chat: {
      who: 'SecureConnect',
      status: 'कुछ ही मिनटों में जवाब',
      rows: [
        { from: 'out', t: 'मुझे प्रोवाइडर के रूप में जुड़ना है' },
        { from: 'in', t: 'नमस्ते! शुरू करने के लिए अपने आधार कार्ड की फ़ोटो भेजें।' },
        { from: 'out', doc: 'aadhaar.jpg' },
        { from: 'in', t: 'मिल गया। अब पैन कार्ड, फिर आपका PSARA लाइसेंस।' },
        { from: 'out', doc: 'psara.pdf' },
        { from: 'in', ok: true, t: 'चारों दस्तावेज़ मिल गए। एक व्यक्ति जाँच करेगा — 24 घंटे में जवाब मिलेगा।' },
      ],
    },
  },
};

export default content;
