export const uz = {
  features: {
    categories: {
      title: 'Kategoriyalar',
    },
    tickets: {
      title: 'Chiptalar',
    },
    aboutProject: {
      title: 'Loyihasi haqida',
    },
  },
  pages: {
    main: {
      title: 'Sizning bilimingiz - bu sizning xavfsizligingiz',
    },
    categories: {
      title: 'Kategoriyalar',
      questions: 'Savollar: {{amount}}',
      list: {
        terms: 'Atamalar',
        obligations: 'Yo’L harakati qatnashchilarining huquq va majburiyatlari',
        traffic_lights: 'Tartibga soluvchi va svetofor ishoralari',
        emergency_signals: 'Ogohlantiruvchi va falokat ishoralari',
        start_of_movements: 'Harakatlanishni boshlash, yo‘nalishlarni o‘zgartirish',
        transport_location: 'Yo`lning qatnov qismida transport vositalarining joylashishi',
        speed: 'Harakat tezligi',
        overtake: "Quvib o'tish",
        parking: "To'xtash va to'xtab turish",
        equal_intersections: 'Teng ahamiyatli chorrahalar ',
        regulated_intersections: 'Tartibga solingan (svetoforli) chorrahalar',
        unregulated_intersections: 'Tartibga solinmagan (imtiyoz belgili) chorrahalar',
        railway: 'Temir yo`l kesishmalari orqali harakatlanish',
        motorway: 'Avtomagistrallarda harakat',
        external_lights: 'Tashqi yoritish chiroqlari',
        towing: 'Shatakka olish',
        people_transportation: 'Odam tashish',
        cargo_transportation: 'Yuk tashish',
        warning_signs: 'Ogohlantiruvchi belgilar',
        prohibition_signs: "Ta'qiqlovchi belgilar",
        prescriptive_signs: 'Buyuruvchi belgilar',
        additional_signs: "Axborot ishora, servis va qo'shimcha axborot belgilari",
        road_markers: "Yo'l chiziqlari",
        exploitation: 'Transport vositalaridan foydalanishni taqiqlovchi shartlar',
        identification_signs: 'Transport vositalarining taniqlilik belgilari',
        auto_control: 'Harakat xavfsizligi asoslari savollari',
        medical_aid: "Birinchi tibbiy yordam ko'rsatish bo'yicha savollar",
      },
    },
    tickets: {
      title: 'Chiptalar',
      ticket: 'Chipta №{{ticketNumber}}',
    },
    about: {
      title: 'Loyihasi haqida',
      description:
        "Loyiha o'quv maqsadlarida taqdim etilgan. <br /> Ma'lumotlar bazasida 1000 ta PPD test savollari mavjud.",
      supportProject: "Loyihani qo'llab-quvvatlash",
      cryptoWallets: 'Kripto-hamyonlar',
    },
    results: {
      title: 'Natijalar',
      message: {
        success: "Tabriklaymiz! <br /> Siz testdan muvaffaqiyatli o'tdingiz.",
        failure: "Sen ajoyibsan! Qayta urinib ko'ring.",
        rightAnswers: "To'g'ri javoblar",
        wrongAnswers: 'Xatolar qilingan',
      },
    },
    pageHeader: {
      logoTitle: 'TDriver | Tashkent',
      mainMenu: {
        main: 'Bosh sahifa',
        categories: 'Kategoriyalar',
        tickets: 'Chiptalar',
        about: 'Loyihasi haqida',
      },
    },
    errorBoundary: {
      info: 'Texnik xatolik',
      infoDetailsDefault: "Bu ustida ishlayapmiz, keyinroq qayta urinib ko'ring",
      errorTitle: 'Voqea xatosi ID {{eventId}}:',
      logoutButton: 'Chiqish',
      refreshButton: 'Yangilash',
      tryAgainButton: "Qayta urinib ko'ring",
      copyNotification: "Xato kodi vaqtinchalik xotiraga ko'chirildi",
    },
  },
  services: {
    settings: {
      languages: {
        ru: 'Русский',
        uz: "O'zbekcha",
        uzk: 'Ўзбекча',
      },
      languagesShort: {
        ru: 'Ru',
        uz: 'Uz',
        uzk: 'Ўз',
      },
      theme: {
        day: 'Yorqin mavzu',
        night: "Qorong'i mavzu",
      },
      installApp: "Ilovani o'rnating",
    },
    installation: {
      1: '1) Safari brauzerida oching',
      2: '2) "Ulashish" tugmasini bosing',
      3: '3) "Bosh ekranga o\'tish" tugmasini bosing',
    },
  },
  shared: {
    startTest: 'Sinovni boshlang',
    exam: 'Imtihon',
    prev: 'Ortga',
    next: 'Oldinga',
    yes: 'Ha',
    no: "Yo'q",
    continue: 'Keyinchalik',
    error: 'Xato',
    repeat: 'Takrorlang',
    goToAnswers: 'Javoblarga',
    goToResults: 'Natijalarga',
    areYouReady: 'Tayyormisiz?',
    finishTest: 'Sinov yopilsinmi?',
    goToMain: "Bosh sahifaga o'tingmi?",
    copied: 'Nusxalandi',
    copyright: 'RT.DEV | MOOND @2023',
    showAnotherSlide: "Boshqa slaydni ko'rsatish",
    hour: 'Soat',
    hours: 'Soat',
    days: 'Kunlar',
    day: 'Kun',
    min: 'Daqiqa',
    sec: 'Soniya',
  },
} as const;
