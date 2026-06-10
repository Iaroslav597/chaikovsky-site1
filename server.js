const express = require('express');
const Datastore = require('nedb');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

if (!fs.existsSync('./data')) fs.mkdirSync('./data');

const db = {
  attractions: new Datastore({ filename: './data/attractions.db', autoload: true }),
  events: new Datastore({ filename: './data/events.db', autoload: true }),
  reviews: new Datastore({ filename: './data/reviews.db', autoload: true }),
  users: new Datastore({ filename: './data/users.db', autoload: true })
};

// ========== НАЧАЛЬНЫЕ ДАННЫЕ ==========
const initialAttractions = [
  { id: 1, name: "Конный клуб «Хорт»", location: "Пермский край", distance: "6", link: "https://vk.com/hortclub59", description: "Прогулки на лошадях по живописным местам.", author: "admin" },
  { id: 2, name: "Конный клуб «Раздолье»", location: "Пермский край", distance: "33", link: "https://vk.link/club174509454", description: "Уютный клуб с добрыми лошадьми.", author: "admin" },
  { id: 3, name: "Сидоровы горы", location: "Удмуртская Республика", distance: "42", link: "https://vk.com/wall-94737331_41721", description: "Живописные горы с уникальными скальными образованиями.", author: "admin" },
  { id: 4, name: "Набережная г. Сарапул", location: "Удмуртская Республика, г. Сарапул", distance: "90", link: "https://dzen.ru/a/ZMLSM246M3PsorVG", description: "Красивая набережная с обзорной площадкой.", author: "admin" },
  { id: 5, name: "Люллинская жемчужина", location: "Удмуртская Республика", distance: "91", link: "https://izhlife.ru/city/vodopad-kak-v-kenakh-i-vid-na-izhevsk-kak-zhivet-derevnya-lyulli.html", description: "Водопад и живописный вид на Ижевск.", author: "admin" },
  { id: 6, name: "Деревня хаски", location: "Удмуртская Республика", distance: "94", link: "http://деревняхаски.рф/#Kontakti", description: "Питомник ездовых собак.", author: "admin" },
  { id: 7, name: "Оленеферма «Гринфилд Парк»", location: "Удмуртская Республика", distance: "102", link: "https://oleneferma18.tilda.ws/", description: "Ферма с северными оленями.", author: "admin" },
  { id: 8, name: "Резиденция «Бабы Яги»", location: "Удмуртская Республика", distance: "250", link: "https://babayaga.udm.muzkult.ru/", description: "Сказочная резиденция с квестами.", author: "admin" },
  { id: 9, name: "Виадук в Пудлинговом", location: "Свердловская область", distance: "268", link: "https://uraloved.ru/viaduk-v-pudlingovom", description: "Исторический железнодорожный виадук.", author: "admin" },
  { id: 10, name: "Музей «Хохловка»", location: "Пермский край", distance: "300", link: "https://uraloved.ru/muzej-hohlovka", description: "Архитектурно-этнографический музей под открытым небом.", author: "admin" },
  { id: 11, name: "Кунгурская ледяная пещера", location: "Пермский край, г. Кунгур", distance: "310", link: "https://uraloved.ru/kungurskaya-peshera", description: "Одна из крупнейших ледяных пещер в мире.", author: "admin" },
  { id: 12, name: "Белогорский монастырь", location: "Пермский край", distance: "320", link: "https://uraloved.ru/belogorskij-monastir-uralskij-afon", description: "«Уральский Афон». Величественный монастырь на горе.", author: "admin" },
  { id: 13, name: "Кладбище паровозов", location: "Пермский край", distance: "340", link: "https://www.tourister.ru/world/europe/russia/city/kungur/placeofinterest/37872", description: "Уникальное место с паровозами. (Закрыто)", author: "admin" },
  { id: 14, name: "Водопад Плакун", location: "Пермский край", distance: "350", link: "https://uraloved.ru/vodopad-plakun", description: "Живописный водопад на реке Сылве.", author: "admin" },
  { id: 15, name: "Музей деревянной скульптуры", location: "Пермский край", distance: "420", link: "https://yandex.ru/maps/-/CDc7ISOw", description: "Уникальная коллекция деревянных скульптур.", author: "admin" },
  { id: 16, name: "Усьвинские столбы", location: "Пермский край", distance: "430", link: "https://uraloved.ru/usvinskie-stolbi", description: "Живописные скалы-останцы.", author: "admin" },
  { id: 17, name: "Водопад Атыш", location: "Республика Башкортостан", distance: "470", link: "https://uraloved.ru/vodopad-atysh", description: "Красивейший водопад на Урале.", author: "admin" },
  { id: 18, name: "Голубые озёра", location: "Республика Татарстан", distance: "470", link: "https://experience.tripster.ru/sights/golubye-ozyora-v-kazani/", description: "Уникальные озера с голубой водой.", author: "admin" },
  { id: 19, name: "Каменный город", location: "Пермский край", distance: "500", link: "https://uraloved.ru/kamenniy-gorod", description: "Скальный массив с ущельями.", author: "admin" },
  { id: 20, name: "Гора Крестовая", location: "Пермский край", distance: "510", link: "https://uraloved.ru/gora-krestovaya-i-hrebet-rudyanskij-spoj", description: "Гора с панорамным видом.", author: "admin" },
  { id: 21, name: "Природный парк «Оленьи ручьи»", location: "Свердловская область", distance: "520", link: "https://olenpark.ru/", description: "Парк со скалами и пещерами.", author: "admin" },
  { id: 22, name: "Остров-град Свияжск", location: "Республика Татарстан", distance: "530", link: "https://ostrovgrad.ru/", description: "Исторический остров-город.", author: "admin" },
  { id: 23, name: "Скалы Чертово Городище", location: "Свердловская область", distance: "550", link: "https://nashural.ru/mesta/sverdlovskaya-oblast/chertovo-gorodishhe/", description: "Живописные скальные останцы.", author: "admin" },
  { id: 24, name: "Природный парк «Бажовские места»", location: "Свердловская область", distance: "600", link: "https://www.tourister.ru/world/europe/russia/city/ekaterinburg/reserves/14662", description: "Парк по мотивам сказов Бажова.", author: "admin" },
  { id: 25, name: "Озеро Тальков Камень", location: "Свердловская область", distance: "600", link: "https://uraloved.ru/ozero-talkov-kamen", description: "Озеро в скальном массиве.", author: "admin" },
  { id: 26, name: "Уральский Марс", location: "Свердловская область", distance: "670", link: "https://www.tourister.ru/world/europe/russia/city/bogdanovich/placeofinterest/32683", description: "Заброшенный карьер необычного цвета.", author: "admin" },
  { id: 27, name: "Мань-Пупу-нёр", location: "Республика Коми", distance: "999", link: "https://uraloved.ru/na-manpupunjor", description: "Знаменитые столбы выветривания.", author: "admin" },
  { id: 28, name: "Помяненный камень", location: "Пермский край", distance: "565", link: "https://uraloved.ru/kolchimskiy-kamen", description: "Живописный скальный останец.", author: "admin" },
  { id: 29, name: "Музей «Ретро-Гараж»", location: "Пермский край", distance: "266", link: "https://vk.com/avtoretro59", description: "Музей ретро-автомобилей.", author: "admin" }
];

const initialEvents = [
  { id: 201, name: "Всемирный день пельменя", date: "2025-01-02", location: "Ижевск", distance: "100", link: "", description: "Гастрономический праздник.", author: "admin" },
  { id: 202, name: "Фестиваль УЛЕТАЙ", date: "2025-06-09", location: "", distance: "", link: "https://uletayfest.ru/", description: "Музыкальный фестиваль.", author: "admin" },
  { id: 203, name: "Фестиваль «ПРО Небо»", date: "2025-06-12", location: "Пермский край, Кунгурский округ", distance: "300", link: "https://www.tourister.ru/world/europe/russia/city/kungur/parades/32905", description: "Авиационный фестиваль.", author: "admin" },
  { id: 204, name: "Дягилевский фестиваль", date: "2025-06-13", location: "Пермь", distance: "300", link: "https://edem-v-gosti.ru/blog/dyagilevskiy-festival/", description: "Музыкальный фестиваль.", author: "admin" },
  { id: 205, name: "Фестиваль MAD MARS", date: "2025-07-04", location: "Удмуртская Республика, Воткинский район", distance: "32", link: "https://vk.com/madmars.fest", description: "Музыкальный фестиваль.", author: "admin" },
  { id: 206, name: "Фестиваль «ЗОВ ПАРМЫ»", date: "2025-07-26", location: "Пермский край, Чердынский округ", distance: "600", link: "https://vk.com/zov_parmy", description: "Этно-фестиваль.", author: "admin" },
  { id: 207, name: "Фестиваль «Конь-Огонь»", date: "2025-07-27", location: "Воткинский район", distance: "52", link: "https://vk.com/konogon18", description: "Семейный спортивный фестиваль.", author: "admin" },
  { id: 208, name: "Фестиваль «Русь дружинная»", date: "2025-08-02", location: "Воткинский район", distance: "72", link: "https://vk.com/rus_druzhinnaya", description: "Историческая реконструкция.", author: "admin" },
  { id: 209, name: "Авиафестиваль «Крылья Пармы»", date: "", location: "Пермский край, г. Пермь", distance: "300", link: "https://vk.com/krylyaparmy", description: "Авиационный фестиваль.", author: "admin" },
  { id: 210, name: "Фестиваль «BERINGAQUAFEST»", date: "", location: "Пермский край, город Оса", distance: "167", link: "https://vk.com/beringaquafest", description: "Водный фестиваль.", author: "admin" },
  { id: 211, name: "Фестиваль «Glazov street fest»", date: "", location: "Удмуртская Республика, г. Глазов", distance: "249", link: "https://vk.com/glazovstreetfest2024", description: "Фестиваль уличной культуры.", author: "admin" },
  { id: 212, name: "Фестиваль уличной еды в Ижевске", date: "", location: "Удмуртская Республика, Ижевск", distance: "91", link: "https://visitudmurtia.org/kalendar-sobytij/festival-ulichnoy-edy-v-izhevske/", description: "Фестиваль уличной еды.", author: "admin" },
  { id: 213, name: "Фестиваль «Счастье Фест»", date: "", location: "Удмуртская Республика, д. Шудья", distance: "112", link: "https://www.счастьефест.рф/", description: "Семейный фестиваль.", author: "admin" },
  { id: 214, name: "Фестиваль «ГуртFEST»", date: "", location: "Удмуртская Республика, музей Лудорвай", distance: "99", link: "https://ludorvay.ru", description: "Фестиваль деревенской культуры.", author: "admin" },
  { id: 215, name: "Фестиваль сена и крезя", date: "", location: "Удмуртская Республика, Вавожский район", distance: "180", link: "https://vk.com/oshmesvavozh", description: "Традиционный праздник.", author: "admin" },
  { id: 216, name: "Арт-фестиваль «Дыхание ветра»", date: "", location: "Пермский край, Кишертский район", distance: "340", link: "https://vk.com/dyhanie_vetra_fest", description: "Фестиваль воздушных змеев.", author: "admin" },
  { id: 217, name: "Фестиваль «СВЕТ БЕЛОГОРЬЯ»", date: "", location: "Белогорский монастырь", distance: "320", link: "https://visitperm.ru/press/news/17-avgusta-v-belogorskom-monastyre-sostoitsya-vi-mezhdunarodnyy-festival-pravoslavnoy-kultury-svet-b/", description: "Православный фестиваль.", author: "admin" },
  { id: 218, name: "Успенская ярмарка семейных традиций", date: "", location: "Удмуртская Республика, г. Глазов", distance: "250", link: "https://vk.com/glazovmuseum", description: "Ярмарка промыслов.", author: "admin" },
  { id: 219, name: "Фестиваль семьи и здоровья «Солнце и луна»", date: "", location: "Удмуртская Республика, г. Ижевск", distance: "91", link: "https://sunmoonfest.tilda.ws/", description: "Фестиваль здоровья.", author: "admin" },
  { id: 220, name: "Пöлянлöн гора сьыланкыв!", date: "", location: "Пермский край, Кочёвский район", distance: "420", link: "https://vk.com/pelyni", description: "Коми-пермяцкий фестиваль.", author: "admin" },
  { id: 221, name: "Праздник черники и черничного пирога", date: "", location: "Пермский край, г. Красновишерск", distance: "610", link: "https://vk.com/public216394150", description: "Гастрономический праздник.", author: "admin" },
  { id: 222, name: "Фестиваль «Хлебный Спас»", date: "", location: "Пермский край, Октябрьский", distance: "238", link: "https://vk.com/mbukdz", description: "Праздник урожая.", author: "admin" },
  { id: 223, name: "Фестиваль «Пирог Фест»", date: "", location: "Удмуртская Республика, д. Пирогово", distance: "125", link: "https://vk.com/pirog_fest", description: "Гастрономический фестиваль.", author: "admin" },
  { id: 224, name: "Фестиваль «Шунды кужым. Сила солнца»", date: "", location: "Удмуртская Республика, Глазовский район", distance: "272", link: "https://vk.com/dondydor", description: "Этнографический фестиваль.", author: "admin" },
  { id: 225, name: "Открытый Кубок Удмуртии «Ижевская регата»", date: "", location: "Удмуртская Республика, г. Ижевск", distance: "92", link: "https://izhregatta.ru/", description: "Парусная регата.", author: "admin" },
  { id: 226, name: "Фестиваль-реконструкция «Губаха ALIVE»", date: "", location: "Пермский край, г. Губаха", distance: "500", link: "https://vk.com/gubakha_alive", description: "Фестиваль-реконструкция.", author: "admin" },
  { id: 227, name: "Прикамский фестиваль малых пивоварен", date: "", location: "Удмуртская Республика, г. Ижевск", distance: "100", link: "https://craftfair.tilda.ws/", description: "Фестиваль пива.", author: "admin" },
  { id: 228, name: "«Бери-вари в Сайгатке»", date: "", location: "Пермский край, Чайковский", distance: "0", link: "https://fest59.ru/ospozhinki-v-zipunovo-2/", description: "Локальный фестиваль.", author: "admin" },
  { id: 229, name: "Оспожинки в Зипуново", date: "", location: "с. Зипуново", distance: "38", link: "https://vk.com/ospozhinki_v_zipunovo", description: "Праздник урожая.", author: "admin" },
  { id: 230, name: "День села Фоки", date: "", location: "с. Фоки", distance: "20", link: "https://chaikovskie.ru/novosti/all/25454/", description: "День села.", author: "admin" }
];

db.attractions.count({}, (err, count) => {
  if (count === 0) initialAttractions.forEach(a => db.attractions.insert(a));
});

db.events.count({}, (err, count) => {
  if (count === 0) initialEvents.forEach(e => db.events.insert(e));
});

db.users.remove({}, { multi: true }, (err) => {
  db.users.insert({ login: "admin", password: "admin123", isAdmin: true });
  console.log("✅ Админ создан: admin / admin123");
});

// ========== API МАРШРУТЫ ==========

app.get('/api/attractions', (req, res) => {
  db.attractions.find({}, (err, docs) => res.json(docs || []));
});

app.post('/api/attractions', (req, res) => {
  const { author } = req.body;
  db.users.findOne({ login: author }, (err, user) => {
    if (user && user.isAdmin) {
      const newItem = { ...req.body, id: Date.now() };
      db.attractions.insert(newItem, () => res.json({ success: true }));
    } else {
      res.json({ success: false, error: 'Только администратор может добавлять' });
    }
  });
});

app.put('/api/attractions/:id', (req, res) => {
  const { author } = req.body;
  db.users.findOne({ login: author }, (err, user) => {
    if (user && user.isAdmin) {
      db.attractions.update({ id: parseInt(req.params.id) }, { $set: req.body }, {}, () => res.json({ success: true }));
    } else {
      res.json({ success: false, error: 'Только администратор может редактировать' });
    }
  });
});

app.delete('/api/attractions/:id', (req, res) => {
  const author = req.query.author;
  db.users.findOne({ login: author }, (err, user) => {
    if (user && user.isAdmin) {
      db.attractions.remove({ id: parseInt(req.params.id) }, {}, () => res.json({ success: true }));
    } else {
      res.json({ success: false, error: 'Только администратор может удалять' });
    }
  });
});

app.get('/api/events', (req, res) => {
  db.events.find({}, (err, docs) => res.json(docs || []));
});

app.post('/api/events', (req, res) => {
  const { author } = req.body;
  db.users.findOne({ login: author }, (err, user) => {
    if (user && user.isAdmin) {
      const newItem = { ...req.body, id: Date.now() };
      db.events.insert(newItem, () => res.json({ success: true }));
    } else {
      res.json({ success: false, error: 'Только администратор может добавлять' });
    }
  });
});

app.put('/api/events/:id', (req, res) => {
  const { author } = req.body;
  db.users.findOne({ login: author }, (err, user) => {
    if (user && user.isAdmin) {
      db.events.update({ id: parseInt(req.params.id) }, { $set: req.body }, {}, () => res.json({ success: true }));
    } else {
      res.json({ success: false, error: 'Только администратор может редактировать' });
    }
  });
});

app.delete('/api/events/:id', (req, res) => {
  const author = req.query.author;
  db.users.findOne({ login: author }, (err, user) => {
    if (user && user.isAdmin) {
      db.events.remove({ id: parseInt(req.params.id) }, {}, () => res.json({ success: true }));
    } else {
      res.json({ success: false, error: 'Только администратор может удалять' });
    }
  });
});

app.get('/api/reviews', (req, res) => {
  db.reviews.find({}, (err, docs) => res.json(docs || []));
});

app.post('/api/reviews', (req, res) => {
  const newItem = { ...req.body, id: Date.now() };
  db.reviews.insert(newItem, () => res.json({ success: true }));
});

app.put('/api/reviews/:id', (req, res) => {
  db.reviews.update({ id: parseInt(req.params.id) }, { $set: req.body }, {}, () => res.json({ success: true }));
});

app.delete('/api/reviews/:id', (req, res) => {
  db.reviews.remove({ id: parseInt(req.params.id) }, {}, () => res.json({ success: true }));
});

app.get('/api/users', (req, res) => {
  db.users.find({}, (err, docs) => {
    const safeDocs = docs.map(d => ({ login: d.login, isAdmin: d.isAdmin }));
    res.json(safeDocs);
  });
});

app.post('/api/register', (req, res) => {
  const { login, password } = req.body;
  db.users.findOne({ login }, (err, user) => {
    if (user) {
      res.json({ success: false, error: 'Пользователь уже существует' });
    } else {
      db.users.insert({ login, password, isAdmin: false }, () => res.json({ success: true }));
    }
  });
});

app.post('/api/login', (req, res) => {
  const { login, password } = req.body;
  db.users.findOne({ login, password }, (err, user) => {
    if (user) {
      res.json({ success: true, user: login, isAdmin: user.isAdmin || false });
    } else {
      res.json({ success: false });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`📝 Админ: admin / admin123`);
});
