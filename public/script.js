// ========== ПРИНУДИТЕЛЬНАЯ ОЧИСТКА СТАРЫХ ДАННЫХ ==========
localStorage.clear();

// ========== ИНИЦИАЛИЗАЦИЯ ==========
let attractions = [];
let events = [];
let reviews = [];
let users = [];
let currentUser = null;
let currentItemForReview = null;
let currentReviewType = 'attraction';
let currentPage = 'events';

let attractionPhotoData = null;
let eventPhotoData = null;

// ========== МЕСТА СИЛЫ (ИЗ ФАЙЛА) ==========
const attractionsData = [
    { id: 1, name: "Конный клуб «Хорт»", location: "Пермский край", distance: "6", link: "https://vk.com/hortclub59", description: "Прогулки на лошадях по живописным местам. Конный клуб предлагает всем желающим приобщиться к верховой езде и активному отдыху на природе." },
    { id: 2, name: "Конный клуб «Раздолье»", location: "Пермский край", distance: "33", link: "https://vk.link/club174509454", description: "Уютный клуб с добрыми лошадьми. Прекрасное место для семейного отдыха и занятий конным спортом." },
    { id: 3, name: "Сидоровы горы", location: "Удмуртская Республика", distance: "42", link: "https://vk.com/wall-94737331_41721", description: "Живописные горы с уникальными скальными образованиями. Идеальное место для любителей геологии и живописных видов." },
    { id: 4, name: "Набережная г. Сарапул", location: "Удмуртская Республика, г. Сарапул", distance: "90", link: "https://dzen.ru/a/ZMLSM246M3PsorVG", description: "Красивая набережная с обзорной площадкой. Прекрасное место для прогулок и наслаждения видами на Каму." },
    { id: 5, name: "Люллинская жемчужина", location: "Удмуртская Республика", distance: "91", link: "https://izhlife.ru/city/vodopad-kak-v-kenakh-i-vid-na-izhevsk-kak-zhivet-derevnya-lyulli.html", description: "Водопад и живописный вид на Ижевск. Уникальное природное место для фотосессий и отдыха." },
    { id: 6, name: "Деревня хаски", location: "Удмуртская Республика", distance: "94", link: "http://деревняхаски.рф/#Kontakti", description: "Питомник ездовых собак. Возможность покататься на упряжках и пообщаться с хаски." },
    { id: 7, name: "Оленеферма «Гринфилд Парк»", location: "Удмуртская Республика", distance: "102", link: "https://oleneferma18.tilda.ws/", description: "Ферма с северными оленями. Можно покормить оленей и узнать об их жизни." },
    { id: 8, name: "Резиденция «Бабы Яги»", location: "Удмуртская Республика", distance: "250", link: "https://babayaga.udm.muzkult.ru/", description: "Сказочная резиденция с квестами и развлечениями. Отличное место для детей." },
    { id: 9, name: "Виадук в Пудлинговом", location: "Свердловская область", distance: "268", link: "https://uraloved.ru/viaduk-v-pudlingovom", description: "Исторический железнодорожный виадук. Впечатляющее инженерное сооружение начала XX века." },
    { id: 10, name: "Музей «Хохловка»", location: "Пермский край", distance: "300", link: "https://uraloved.ru/muzej-hohlovka", description: "Архитектурно-этнографический музей под открытым небом. Памятники деревянного зодчества." },
    { id: 11, name: "Кунгурская ледяная пещера", location: "Пермский край, г. Кунгур", distance: "310", link: "https://uraloved.ru/kungurskaya-peshera", description: "Одна из крупнейших ледяных пещер в мире. Знаменита своими гротами и озерами." },
    { id: 12, name: "Белогорский монастырь", location: "Пермский край", distance: "320", link: "https://uraloved.ru/belogorskij-monastir-uralskij-afon", description: "«Уральский Афон». Величественный монастырь на горе." },
    { id: 13, name: "Кладбище паровозов", location: "Пермский край", distance: "340", link: "https://www.tourister.ru/world/europe/russia/city/kungur/placeofinterest/37872", description: "Уникальное место с паровозами. (Закрыто, недоступно для посещения)" },
    { id: 14, name: "Водопад Плакун", location: "Пермский край", distance: "350", link: "https://uraloved.ru/vodopad-plakun", description: "Живописный водопад на реке Сылве." },
    { id: 15, name: "Музей деревянной скульптуры", location: "Пермский край", distance: "420", link: "https://yandex.ru/maps/-/CDc7ISOw", description: "Уникальная коллекция деревянных скульптур под открытым небом." },
    { id: 16, name: "Усьвинские столбы", location: "Пермский край", distance: "430", link: "https://uraloved.ru/usvinskie-stolbi", description: "Живописные скалы-останцы. Визитная карточка Пермского края." },
    { id: 17, name: "Водопад Атыш", location: "Республика Башкортостан", distance: "470", link: "https://uraloved.ru/vodopad-atysh", description: "Красивейший водопад на Урале, находящийся в пещере." },
    { id: 18, name: "Голубые озёра", location: "Республика Татарстан", distance: "470", link: "https://experience.tripster.ru/sights/golubye-ozyora-v-kazani/", description: "Уникальные озера с голубой водой и карстовым происхождением." },
    { id: 19, name: "Каменный город", location: "Пермский край", distance: "500", link: "https://uraloved.ru/kamenniy-gorod", description: "Скальный массив с ущельями и скалами причудливой формы." },
    { id: 20, name: "Гора Крестовая", location: "Пермский край", distance: "510", link: "https://uraloved.ru/gora-krestovaya-i-hrebet-rudyanskij-spoj", description: "Гора с панорамным видом на Усьвинские столбы." },
    { id: 21, name: "Природный парк «Оленьи ручьи»", location: "Свердловская область", distance: "520", link: "https://olenpark.ru/", description: "Парк со скалами, пещерами и историческими наскальными рисунками." },
    { id: 22, name: "Остров-град Свияжск", location: "Республика Татарстан", distance: "530", link: "https://ostrovgrad.ru/", description: "Исторический остров-город, основанный Иваном Грозным." },
    { id: 23, name: "Скалы Чертово Городище", location: "Свердловская область", distance: "550", link: "https://nashural.ru/mesta/sverdlovskaya-oblast/chertovo-gorodishhe/", description: "Живописные скальные останцы на вершине горы." },
    { id: 24, name: "Природный парк «Бажовские места»", location: "Свердловская область", distance: "600", link: "https://www.tourister.ru/world/europe/russia/city/ekaterinburg/reserves/14662", description: "Парк, созданный по мотивам сказов Павла Бажова." },
    { id: 25, name: "Озеро Тальков Камень", location: "Свердловская область", distance: "600", link: "https://uraloved.ru/ozero-talkov-kamen", description: "Озеро в скальном массиве, окруженное вековыми соснами." },
    { id: 26, name: "Уральский Марс", location: "Свердловская область", distance: "670", link: "https://www.tourister.ru/world/europe/russia/city/bogdanovich/placeofinterest/32683", description: "Заброшенный карьер с необычным цветом пород, напоминающий ландшафты Марса." },
    { id: 27, name: "Мань-Пупу-нёр", location: "Республика Коми", distance: "999", link: "https://uraloved.ru/na-manpupunjor", description: "Знаменитые столбы выветривания. Одно из семи чудес России." },
    { id: 28, name: "Помяненный камень", location: "Пермский край", distance: "565", link: "https://uraloved.ru/kolchimskiy-kamen", description: "Живописный скальный останец в долине реки Вишера." },
    { id: 29, name: "Музей «Ретро-Гараж»", location: "Пермский край", distance: "266", link: "https://vk.com/avtoretro59", description: "Музей ретро-автомобилей и мотоциклов." }
];

// ========== МЕРОПРИЯТИЯ (ИЗ ФАЙЛА, ПОРЯДОК ИСПРАВЛЕН) ==========
const eventsData = [
    { id: 201, name: "Фестиваль «ПРО Небо»", date: "2025-06-12", location: "Пермский край, Кунгурский округ, близ деревни Теплая", distance: "300", link: "https://www.tourister.ru/world/europe/russia/city/kungur/parades/32905", description: "Авиационный фестиваль с показательными выступлениями." },
    { id: 202, name: "Авиафестиваль «Крылья Пармы»", date: "", location: "Пермский край, г. Пермь, аэродром Фролово", distance: "300", link: "https://vk.com/krylyaparmy", description: "Авиационный фестиваль." },
    { id: 203, name: "Фестиваль «ЗОВ ПАРМЫ»", date: "2025-07-26", location: "Пермский край, Чердынский городской округ, село Серегово", distance: "600", link: "https://vk.com/zov_parmy", description: "Этно-фестиваль с аутентичной музыкой и ремеслами." },
    { id: 204, name: "Фестиваль «BERINGAQUAFEST»", date: "", location: "Пермский край, город Оса", distance: "167", link: "https://vk.com/beringaquafest", description: "Водный фестиваль." },
    { id: 205, name: "Фестиваль «Glazov street fest»", date: "", location: "Удмуртская Республика, г. Глазов", distance: "249", link: "https://vk.com/glazovstreetfest2024", description: "Фестиваль уличной культуры и экстремальных видов спорта." },
    { id: 206, name: "Фестиваль «Конь-Огонь»", date: "2025-07-27", location: "Воткинский район, деревня Метляки", distance: "52", link: "https://vk.com/konogon18", description: "Спортивный фестиваль." },
    { id: 207, name: "Фестиваль MAD MARS", date: "2025-07-04", location: "Удмуртская Республика, Воткинский район, село Галево", distance: "32", link: "https://vk.com/madmars.fest", description: "Музыкальный фестиваль." },
    { id: 208, name: "Фестиваль «Русь дружинная»", date: "2025-08-02", location: "Воткинский район, Кудрино", distance: "72", link: "https://vk.com/rus_druzhinnaya", description: "Историческая реконструкция сражений." },
    { id: 209, name: "Всемирный день пельменя", date: "2025-01-02", location: "Ижевск", distance: "100", link: "", description: "Гастрономический праздник." },
    { id: 210, name: "Фестиваль уличной еды", date: "", location: "Удмуртская Республика, Ижевск, Парк им. Кирова", distance: "91", link: "https://visitudmurtia.org/kalendar-sobytij/festival-ulichnoy-edy-v-izhevske/", description: "Фестиваль еды." },
    { id: 211, name: "Фестиваль «Счастье Фест»", date: "", location: "Удмуртская Республика, д. Шудья", distance: "112", link: "https://www.счастьефест.рф/", description: "Семейный фестиваль." },
    { id: 212, name: "Фестиваль «ГуртFEST»", date: "", location: "Удмуртская Республика, музей-заповедник Лудорвай", distance: "99", link: "https://ludorvay.ru", description: "Фестиваль народной культуры." },
    { id: 213, name: "Фестиваль сена и крезя", date: "", location: "Удмуртская Республика, Вавожский район", distance: "180", link: "https://vk.com/oshmesvavozh", description: "Традиционный праздник." },
    { id: 214, name: "Арт-фестиваль «Дыхание ветра»", date: "", location: "Пермский край, Кишертский район", distance: "340", link: "https://vk.com/dyhanie_vetra_fest", description: "Фестиваль воздушных змеев." },
    { id: 215, name: "Фестиваль «СВЕТ БЕЛОГОРЬЯ»", date: "", location: "Белогорский монастырь", distance: "320", link: "https://visitperm.ru/press/news/17-avgusta-v-belogorskom-monastyre-sostoitsya-vi-mezhdunarodnyy-festival-pravoslavnoy-kultury-svet-b/", description: "Православный фестиваль." },
    { id: 216, name: "Успенская ярмарка", date: "", location: "Удмуртская Республика, г. Глазов", distance: "250", link: "https://vk.com/glazovmuseum", description: "Ярмарка промыслов." },
    { id: 217, name: "Фестиваль «Солнце и луна»", date: "", location: "Удмуртская Республика, г. Ижевск", distance: "91", link: "https://sunmoonfest.tilda.ws/", description: "Фестиваль здоровья." },
    { id: 218, name: "Пöлянлöн гора сьыланкыв!", date: "", location: "Пермский край, Кочёвский район", distance: "420", link: "https://vk.com/pelyni", description: "Коми-пермяцкий фестиваль." },
    { id: 219, name: "Праздник черники", date: "", location: "Пермский край, г. Красновишерск", distance: "610", link: "https://vk.com/public216394150", description: "Гастрономический праздник." },
    { id: 220, name: "Фестиваль «Хлебный Спас»", date: "", location: "Пермский край, Октябрьский", distance: "238", link: "https://vk.com/mbukdz", description: "Праздник урожая." },
    { id: 221, name: "Фестиваль «Пирог Фест»", date: "", location: "Удмуртская Республика, д. Пирогово", distance: "125", link: "https://vk.com/pirog_fest", description: "Гастрономический фестиваль." },
    { id: 222, name: "Фестиваль «Шунды кужым»", date: "", location: "Удмуртская Республика, Глазовский район", distance: "272", link: "https://vk.com/dondydor", description: "Этнографический фестиваль." },
    { id: 223, name: "Ижевская регата", date: "", location: "Удмуртская Республика, г. Ижевск", distance: "92", link: "https://izhregatta.ru/", description: "Парусная регата." },
    { id: 224, name: "Фестиваль «Губаха ALIVE»", date: "", location: "Пермский край, г. Губаха", distance: "500", link: "https://vk.com/gubakha_alive", description: "Фестиваль-реконструкция." },
    { id: 225, name: "Фестиваль малых пивоварен", date: "", location: "Удмуртская Республика, г. Ижевск", distance: "100", link: "https://craftfair.tilda.ws/", description: "Фестиваль пива." },
    { id: 226, name: "«Бери-вари в Сайгатке»", date: "", location: "Пермский край, Чайковский", distance: "0", link: "https://fest59.ru/ospozhinki-v-zipunovo-2/", description: "Локальный фестиваль." },
    { id: 227, name: "Оспожинки в Зипуново", date: "", location: "с. Зипуново", distance: "38", link: "https://vk.com/ospozhinki_v_zipunovo", description: "Праздник урожая." },
    { id: 228, name: "День села Фоки", date: "", location: "с. Фоки", distance: "20", link: "https://chaikovskie.ru/novosti/all/25454/", description: "День села." },
    { id: 229, name: "Дягилевский фестиваль", date: "2025-06-13", location: "Пермь", distance: "300", link: "https://edem-v-gosti.ru/blog/dyagilevskiy-festival/", description: "Музыкальный фестиваль." },
    { id: 230, name: "Фестиваль УЛЕТАЙ", date: "2025-06-09", location: "", distance: "", link: "https://uletayfest.ru/", description: "Музыкальный фестиваль." }
];

// Загружаем данные
for (const item of attractionsData) {
    attractions.push({ ...item, author: "Администрация", image: null });
}
for (const item of eventsData) {
    events.push({ ...item, author: "Администрация", image: null });
}

users.push({ login: "demo", password: "1234" });
users.push({ login: "admin", password: "admin123" });

loadFromLocalStorage();

function loadFromLocalStorage() {
    const savedAttractions = localStorage.getItem('chaik_attractions');
    const savedEvents = localStorage.getItem('chaik_events');
    const savedReviews = localStorage.getItem('chaik_reviews');
    const savedUsers = localStorage.getItem('chaik_users');
    const savedCurrentUser = localStorage.getItem('chaik_currentUser');
    
    if (savedAttractions) attractions = JSON.parse(savedAttractions);
    if (savedEvents) events = JSON.parse(savedEvents);
    if (savedReviews) reviews = JSON.parse(savedReviews);
    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedCurrentUser) currentUser = savedCurrentUser;
    
    updateStats();
    updateAuthUI();
}

// ========== ФОРМАТИРОВАНИЕ ДАТЫ ==========
function formatDate(dateString) {
    if (!dateString || dateString === "") return "Дата уточняется";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Дата уточняется";
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    } catch (e) {
        return "Дата уточняется";
    }
}

function getImageForCard(name) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash % 360);
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${hue}, 70%, 55%)`);
    gradient.addColorStop(1, `hsl(${hue + 40}, 80%, 40%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 200; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
    }
    return canvas.toDataURL();
}

function setActiveNavLink(page) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// ========== СОРТИРОВКА ПО ДАТЕ ==========
function sortEventsByDate(eventsList) {
    return [...eventsList].sort((a, b) => {
        const aHasDate = a.date && a.date !== "";
        const bHasDate = b.date && b.date !== "";
        
        if (!aHasDate && !bHasDate) return 0;
        if (!aHasDate) return 1;
        if (!bHasDate) return -1;
        
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        const aValid = !isNaN(dateA.getTime());
        const bValid = !isNaN(dateB.getTime());
        
        if (!aValid && !bValid) return 0;
        if (!aValid) return 1;
        if (!bValid) return -1;
        
        return dateA - dateB;
    });
}

function sortAttractionsByDistance(attractionsList) {
    return [...attractionsList].sort((a, b) => {
        const distA = parseInt(a.distance) || 9999;
        const distB = parseInt(b.distance) || 9999;
        return distA - distB;
    });
}

// ========== ЛАЙКИ И ДИЗЛАЙКИ ==========
function likeReview(reviewId) {
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return;
    if (review.author === currentUser) { alert("Нельзя оценивать свой отзыв"); return; }
    
    if (review.likes === undefined) review.likes = 0;
    if (review.dislikes === undefined) review.dislikes = 0;
    if (review.userReaction === undefined) review.userReaction = null;
    
    if (review.userReaction === 'like') {
        review.likes--;
        review.userReaction = null;
    } else if (review.userReaction === 'dislike') {
        review.dislikes--;
        review.likes++;
        review.userReaction = 'like';
    } else {
        review.likes++;
        review.userReaction = 'like';
    }
    saveReviews();
    renderPage(currentPage);
}

function dislikeReview(reviewId) {
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return;
    if (review.author === currentUser) { alert("Нельзя оценивать свой отзыв"); return; }
    
    if (review.likes === undefined) review.likes = 0;
    if (review.dislikes === undefined) review.dislikes = 0;
    if (review.userReaction === undefined) review.userReaction = null;
    
    if (review.userReaction === 'dislike') {
        review.dislikes--;
        review.userReaction = null;
    } else if (review.userReaction === 'like') {
        review.likes--;
        review.dislikes++;
        review.userReaction = 'dislike';
    } else {
        review.dislikes++;
        review.userReaction = 'dislike';
    }
    saveReviews();
    renderPage(currentPage);
}

// ========== КАРТОЧКИ ==========
function getAttractionCardHtml(a) {
    const imageSrc = getImageForCard(a.name);
    const avgRating = getAverageRating(a.id, 'attraction');
    const reviewsCount = getItemReviews(a.id, 'attraction').length;
    const isOwnItem = currentUser === a.author;
    return `
        <div class="attraction-card" onclick="showDetail(${a.id}, 'attraction')">
            <div class="attraction-card-img"><img src="${imageSrc}" alt="${escapeHtml(a.name)}" loading="lazy"><span class="category-badge">⚡ Место силы</span></div>
            <div class="attraction-body">
                <div class="attraction-title">${escapeHtml(a.name)}</div>
                <div class="attraction-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(a.location)}</div>
                ${a.distance ? `<div class="attraction-location"><i class="fas fa-road"></i> ${a.distance} км</div>` : ''}
                <div class="attraction-description">${escapeHtml(a.description?.substring(0, 100) || '')}${a.description?.length > 100 ? '...' : ''}</div>
                <div class="attraction-rating"><span class="rating-badge">${avgRating > 0 ? avgRating : 'Новое'}</span><div class="rating-stars">${getStarsHtml(avgRating)}</div><span class="review-count">${reviewsCount} ${getReviewWord(reviewsCount)}</span></div>
                <div class="attraction-meta"><span><i class="fas fa-user"></i> ${escapeHtml(a.author)}</span></div>
                <button class="add-button" onclick="event.stopPropagation(); showAddReviewModal(${a.id}, 'attraction', '${escapeHtml(a.name).replace(/'/g, "\\'")}')"><i class="fas fa-star"></i> Написать отзыв</button>
                <button class="add-button outline-button" onclick="event.stopPropagation(); showReviewsForItem(${a.id}, 'attraction', '${escapeHtml(a.name).replace(/'/g, "\\'")}')"><i class="fas fa-comment"></i> Читать отзывы</button>
                ${a.link ? `<a href="${a.link}" target="_blank" class="add-button outline-button" style="display: inline-block; text-align: center; text-decoration: none; margin-top: 8px;"><i class="fab fa-vk"></i> Подробнее</a>` : ''}
                ${isOwnItem ? `<div style="display: flex; gap: 8px; margin-top: 8px;"><button onclick="event.stopPropagation(); editAttraction(${a.id})" class="edit-btn"><i class="fas fa-edit"></i> Редактировать</button><button onclick="event.stopPropagation(); deleteAttraction(${a.id})" class="delete-btn"><i class="fas fa-trash"></i> Удалить</button></div>` : ''}
            </div>
        </div>
    `;
}

function getEventCardHtml(e) {
    const imageSrc = getImageForCard(e.name);
    const formattedDate = formatDate(e.date);
    const isOwnItem = currentUser === e.author;
    return `
        <div class="event-card" onclick="showDetail(${e.id}, 'event')">
            <div class="event-card-img"><img src="${imageSrc}" alt="${escapeHtml(e.name)}" loading="lazy"><span class="category-badge">🎉 Мероприятие</span></div>
            <div class="event-body">
                <div class="event-title">${escapeHtml(e.name)}</div>
                <div class="event-date"><i class="fas fa-calendar-alt"></i> ${formattedDate}</div>
                <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(e.location)}</div>
                ${e.distance ? `<div class="event-location"><i class="fas fa-road"></i> ${e.distance} км</div>` : ''}
                <div class="attraction-description">${escapeHtml(e.description?.substring(0, 100) || '')}${e.description?.length > 100 ? '...' : ''}</div>
                <div class="attraction-meta">Добавил: ${escapeHtml(e.author)}</div>
                <button class="add-button" onclick="event.stopPropagation(); showAddReviewModal(${e.id}, 'event', '${escapeHtml(e.name).replace(/'/g, "\\'")}')"><i class="fas fa-star"></i> Написать отзыв</button>
                <button class="add-button outline-button" onclick="event.stopPropagation(); showReviewsForItem(${e.id}, 'event', '${escapeHtml(e.name).replace(/'/g, "\\'")}')"><i class="fas fa-comment"></i> Читать отзывы</button>
                ${e.link ? `<a href="${e.link}" target="_blank" class="add-button outline-button" style="display: inline-block; text-align: center; text-decoration: none; margin-top: 8px;"><i class="fab fa-vk"></i> Подробнее</a>` : ''}
                ${isOwnItem ? `<div style="display: flex; gap: 8px; margin-top: 8px;"><button onclick="event.stopPropagation(); editEvent(${e.id})" class="edit-btn"><i class="fas fa-edit"></i> Редактировать</button><button onclick="event.stopPropagation(); deleteEvent(${e.id})" class="delete-btn"><i class="fas fa-trash"></i> Удалить</button></div>` : ''}
            </div>
        </div>
    `;
}

function escapeHtml(str) { 
    if (!str) return ''; 
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m])); 
}

function updateStats() {
    const el1 = document.getElementById('totalAttractionsCount');
    const el2 = document.getElementById('totalEventsCount');
    const el3 = document.getElementById('totalReviewsCount');
    if (el1) el1.textContent = attractions.length;
    if (el2) el2.textContent = events.length;
    if (el3) el3.textContent = reviews.length;
}

function saveAttractions() { localStorage.setItem('chaik_attractions', JSON.stringify(attractions)); updateStats(); }
function saveEvents() { localStorage.setItem('chaik_events', JSON.stringify(events)); updateStats(); }
function saveReviews() { localStorage.setItem('chaik_reviews', JSON.stringify(reviews)); updateStats(); }
function saveUsers() { localStorage.setItem('chaik_users', JSON.stringify(users)); }

function getAverageRating(itemId, type) { 
    const arr = reviews.filter(r => r.itemId === itemId && r.type === type); 
    if (!arr.length) return 0; 
    return (arr.reduce((s, r) => s + r.rating, 0) / arr.length).toFixed(1); 
}

function getItemReviews(itemId, type) { return reviews.filter(r => r.itemId === itemId && r.type === type); }
function getReviewWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
    if (count % 10 >= 2 && count % 10 <= 4) return 'отзыва';
    return 'отзывов';
}

function getStarsHtml(rating) {
    let stars = '';
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) stars += `<i class="fas ${i <= rounded ? 'fa-star' : 'fa-star-o'}"></i>`;
    return stars;
}

function addReview(itemId, type, text, rating, reviewId = null) {
    if (!text.trim()) return false;
    if (rating < 1) return false;
    
    if (reviewId) {
        // Редактирование существующего отзыва
        const reviewIndex = reviews.findIndex(r => r.id === reviewId);
        if (reviewIndex !== -1 && reviews[reviewIndex].author === currentUser) {
            reviews[reviewIndex].text = text.trim();
            reviews[reviewIndex].rating = rating;
            saveReviews();
            return true;
        }
        return false;
    } else {
        // Новый отзыв
        if (reviews.find(r => r.itemId === itemId && r.type === type && r.author === (currentUser || "Аноним"))) return false;
        
        reviews.push({
            id: Date.now(), itemId, type,
            author: currentUser || "Аноним",
            text: text.trim(), rating,
            likes: 0, dislikes: 0, userReaction: null,
            date: new Date().toLocaleDateString()
        });
        saveReviews();
        return true;
    }
}

function deleteReview(reviewId) {
    const review = reviews.find(r => r.id === reviewId);
    if (review && review.author === currentUser) {
        if (confirm("Удалить отзыв?")) {
            reviews = reviews.filter(r => r.id !== reviewId);
            saveReviews();
            renderPage(currentPage);
        }
    }
}

function editReview(reviewId) {
    const review = reviews.find(r => r.id === reviewId);
    if (review && review.author === currentUser) {
        currentItemForReview = review.itemId;
        currentReviewType = review.type;
        document.getElementById('editingReviewId').value = reviewId;
        document.getElementById('reviewModalTitle').innerHTML = '<i class="fas fa-edit"></i> Редактировать отзыв';
        document.getElementById('reviewAttractionName').innerText = review.itemId === review.itemId ? "Редактирование отзыва" : "";
        document.getElementById('reviewTextArea').value = review.text;
        document.getElementById('reviewRating').value = review.rating;
        
        // Устанавливаем звезды
        const stars = document.querySelectorAll('#ratingStars i');
        stars.forEach(star => {
            const ratingVal = parseInt(star.dataset.rating);
            if (ratingVal <= review.rating) {
                star.className = 'fas fa-star';
                star.style.color = '#FFD700';
            } else {
                star.className = 'far fa-star';
                star.style.color = '#ddd';
            }
        });
        
        document.getElementById('addReviewModal').style.display = 'flex';
    }
}

function editAttraction(id) {
    const attraction = attractions.find(a => a.id === id);
    if (attraction && attraction.author === currentUser) {
        document.getElementById('attractionModalTitle').innerHTML = '<i class="fas fa-edit"></i> Редактировать место силы';
        document.getElementById('editingAttractionId').value = id;
        document.getElementById('attractionName').value = attraction.name;
        document.getElementById('attractionLocation').value = attraction.location;
        document.getElementById('attractionDistance').value = attraction.distance || '';
        document.getElementById('attractionDescription').value = attraction.description || '';
        document.getElementById('attractionLink').value = attraction.link || '';
        document.getElementById('attractionPhotoPreview').style.display = 'none';
        attractionPhotoData = null;
        document.getElementById('addAttractionModal').style.display = 'flex';
    }
}

function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (event && event.author === currentUser) {
        document.getElementById('eventModalTitle').innerHTML = '<i class="fas fa-edit"></i> Редактировать мероприятие';
        document.getElementById('editingEventId').value = id;
        document.getElementById('eventName').value = event.name;
        document.getElementById('eventLocation').value = event.location;
        document.getElementById('eventDate').value = event.date || '';
        document.getElementById('eventDistance').value = event.distance || '';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventLink').value = event.link || '';
        document.getElementById('eventPhotoPreview').style.display = 'none';
        eventPhotoData = null;
        document.getElementById('addEventModal').style.display = 'flex';
    }
}

function deleteAttraction(id) { 
    const attraction = attractions.find(a => a.id === id);
    if (attraction && attraction.author === currentUser && confirm("Удалить место?")) {
        attractions = attractions.filter(a => a.id !== id); 
        reviews = reviews.filter(r => !(r.itemId === id && r.type === 'attraction')); 
        saveAttractions(); saveReviews(); 
        renderPage(currentPage);
    }
}

function deleteEvent(id) { 
    const event = events.find(e => e.id === id);
    if (event && event.author === currentUser && confirm("Удалить мероприятие?")) {
        events = events.filter(e => e.id !== id); 
        reviews = reviews.filter(r => !(r.itemId === id && r.type === 'event')); 
        saveEvents(); saveReviews(); 
        renderPage(currentPage);
    }
}

function register(login, password, confirmPassword) {
    const errorEl = document.getElementById('modalError');
    if (!login.trim()) { if (errorEl) errorEl.innerText = "Введите логин"; return false; }
    if (password.length < 6) { if (errorEl) errorEl.innerText = "Пароль должен быть не менее 6 символов"; return false; }
    if (password !== confirmPassword) { if (errorEl) errorEl.innerText = "Пароли не совпадают"; return false; }
    if (users.find(u => u.login === login)) { if (errorEl) errorEl.innerText = "Пользователь уже существует"; return false; }
    
    users.push({ login: login.trim(), password: password });
    saveUsers();
    if (errorEl) errorEl.innerText = "";
    return true;
}

function loginUser(login, password) {
    const errorEl = document.getElementById('modalError');
    const user = users.find(u => u.login === login && u.password === password);
    if (user) { 
        currentUser = login; 
        localStorage.setItem('chaik_currentUser', currentUser); 
        updateAuthUI(); 
        renderPage(currentPage);
        if (errorEl) errorEl.innerText = "";
        return true;
    }
    if (errorEl) errorEl.innerText = "Неверный логин или пароль";
    return false;
}

function logout() { 
    localStorage.removeItem('chaik_currentUser'); 
    currentUser = null; 
    updateAuthUI(); 
    renderPage('events'); 
}

function updateAuthUI() {
    const authDiv = document.getElementById('authWidget'), welcomeDiv = document.getElementById('userWelcome');
    if (currentUser) {
        authDiv.style.display = 'none'; 
        welcomeDiv.style.display = 'flex';
        welcomeDiv.innerHTML = `<i class="fas fa-user-circle"></i> ${escapeHtml(currentUser)} <button id="logoutBtn" class="btn-outline" style="padding:4px 12px;">Выйти</button>`;
        document.getElementById('logoutBtn')?.addEventListener('click', logout);
    } else { 
        authDiv.style.display = 'flex'; 
        welcomeDiv.style.display = 'none'; 
    }
}

function resetUserData() {
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    if (confirm(`Очистить ваши данные (${currentUser})?`)) {
        attractions = attractions.filter(a => a.author !== currentUser);
        events = events.filter(e => e.author !== currentUser);
        reviews = reviews.filter(r => r.author !== currentUser);
        saveAttractions(); saveEvents(); saveReviews();
        renderPage(currentPage);
    }
}

function showDetail(id, type) {
    let item = type === 'attraction' ? attractions.find(a => a.id === id) : events.find(e => e.id === id);
    if (!item) return;
    
    const imageSrc = getImageForCard(item.name);
    const avgRating = (type !== 'event') ? getAverageRating(id, type) : 0;
    const reviewsCount = (type !== 'event') ? getItemReviews(id, type).length : 0;
    const formattedDate = type === 'event' ? formatDate(item.date) : null;
    const isOwnItem = currentUser === item.author;
    
    let html = `
        <span class="close-modal" onclick="document.getElementById('detailModal').style.display='none'">&times;</span>
        <img src="${imageSrc}" style="width:100%; height:200px; object-fit:cover; border-radius:16px; margin-bottom:20px;">
        <div class="detail-info"><h2>${escapeHtml(item.name)}</h2>
        <p><strong><i class="fas fa-map-marker-alt"></i> Местоположение:</strong> ${escapeHtml(item.location)}</p>
        ${item.distance ? `<p><strong><i class="fas fa-road"></i> Расстояние:</strong> ${item.distance} км</p>` : ''}`;
    
    if (type !== 'event') {
        html += `<div class="detail-hours"><strong><i class="fas fa-star"></i> Рейтинг:</strong> ${avgRating > 0 ? avgRating : 'Нет оценок'} / 5
        <span style="margin-left: 10px;">${getStarsHtml(avgRating)}</span>
        <span style="margin-left: 10px;">(${reviewsCount} ${getReviewWord(reviewsCount)})</span></div>
        <p><strong><i class="fas fa-info-circle"></i> Описание:</strong> ${escapeHtml(item.description || 'Нет описания')}</p>`;
    } else {
        html += `<p><strong><i class="fas fa-calendar-alt"></i> Дата:</strong> ${formattedDate}</p>
        <p><strong><i class="fas fa-info-circle"></i> Описание:</strong> ${escapeHtml(item.description || 'Нет описания')}</p>`;
    }
    
    if (item.link) html += `<p><strong><i class="fab fa-vk"></i> Ссылка:</strong><br><a href="${item.link}" target="_blank">${escapeHtml(item.link)}</a></p>`;
    html += `<p><strong><i class="fas fa-user"></i> Добавил:</strong> ${escapeHtml(item.author)}</p>
        </div>
        <button class="add-button" onclick="document.getElementById('detailModal').style.display='none'; showAddReviewModal(${id}, '${type}', '${escapeHtml(item.name).replace(/'/g, "\\'")}')"><i class="fas fa-star"></i> Написать отзыв</button>`;
    
    if (isOwnItem) {
        html += `<div style="display: flex; gap: 10px; margin-top: 10px;">
            <button class="edit-btn" onclick="document.getElementById('detailModal').style.display='none'; ${type === 'attraction' ? `editAttraction(${id})` : `editEvent(${id})`}"><i class="fas fa-edit"></i> Редактировать</button>
            <button class="delete-btn" onclick="document.getElementById('detailModal').style.display='none'; ${type === 'attraction' ? `deleteAttraction(${id})` : `deleteEvent(${id})`}"><i class="fas fa-trash"></i> Удалить</button>
        </div>`;
    }
    
    document.getElementById('detailModalContent').innerHTML = html;
    document.getElementById('detailModal').style.display = 'flex';
}

function showReviewsForItem(id, type, name) {
    const itemReviews = getItemReviews(id, type);
    let html = `<div id="reviewsModal" class="modal" style="display:flex;"><div class="modal-card" style="max-width:600px; max-height:80vh; overflow-y:auto;"><span class="close-modal" onclick="document.getElementById('reviewsModal')?.remove()">&times;</span><h3>Отзывы о ${escapeHtml(name)}</h3>`;
    
    if (itemReviews.length) {
        html += itemReviews.map(r => {
            const likes = r.likes || 0;
            const dislikes = r.dislikes || 0;
            const isLiked = r.userReaction === 'like';
            const isDisliked = r.userReaction === 'dislike';
            const isOwnReview = r.author === currentUser;
            return `
            <div class="review-item">
                <div class="review-header"><strong>${escapeHtml(r.author)}</strong> ${getStarsHtml(r.rating)}
                    ${isOwnReview ? `<div style="margin-left: auto;">
                        <button class="edit-review-btn" onclick="editReview(${r.id}); document.getElementById('reviewsModal')?.remove();"><i class="fas fa-edit"></i> Редактировать</button>
                        <button class="delete-review-btn" onclick="deleteReview(${r.id}); document.getElementById('reviewsModal')?.remove();"><i class="fas fa-trash"></i> Удалить</button>
                    </div>` : ''}
                </div>
                <p>${escapeHtml(r.text)}</p>
                <div class="review-footer">
                    <div class="review-actions">
                        <button class="like-btn ${isLiked ? 'active' : ''}" onclick="likeReview(${r.id}); document.getElementById('reviewsModal')?.remove();"><i class="fas fa-thumbs-up"></i> <span>${likes}</span></button>
                        <button class="dislike-btn ${isDisliked ? 'active' : ''}" onclick="dislikeReview(${r.id}); document.getElementById('reviewsModal')?.remove();"><i class="fas fa-thumbs-down"></i> <span>${dislikes}</span></button>
                    </div>
                    <small>${r.date}</small>
                </div>
            </div>`;
        }).join('');
    } else {
        html += '<p>Пока нет отзывов</p>';
    }
    
    html += `<button class="add-button" onclick="document.getElementById('reviewsModal')?.remove(); showAddReviewModal(${id}, '${type}', '${escapeHtml(name).replace(/'/g, "\\'")}')">Написать отзыв</button></div></div>`;
    document.body.insertAdjacentHTML('beforeend', html);
}

function showAddReviewModal(id, type, name) { 
    if (!currentUser) { alert("Войдите в аккаунт"); return; } 
    currentItemForReview = id; 
    currentReviewType = type; 
    document.getElementById('editingReviewId').value = '';
    document.getElementById('reviewModalTitle').innerHTML = '<i class="fas fa-star"></i> Оставить отзыв';
    document.getElementById('reviewAttractionName').innerText = name; 
    document.getElementById('reviewTextArea').value = '';
    document.getElementById('reviewRating').value = 0; 
    document.querySelectorAll('#ratingStars i').forEach(s => { s.className = 'far fa-star'; s.style.color = '#ddd'; });
    document.getElementById('addReviewModal').style.display = 'flex'; 
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const searchType = document.querySelector('.nav-link.active')?.getAttribute('data-page') || 'events';
    
    if (searchType === 'attractions') {
        const filtered = attractions.filter(a => a.name.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query)));
        document.getElementById('dynamicContent').innerHTML = `<div class="search-results"><h2>Поиск места силы: "${escapeHtml(query)}"</h2>${filtered.length ? `<div class="attractions-grid">${sortAttractionsByDistance(filtered).map(a => getAttractionCardHtml(a)).join('')}</div>` : '<div class="empty-state">Ничего не найдено</div>'}</div>`;
    } else {
        const filtered = events.filter(e => e.name.toLowerCase().includes(query) || (e.description && e.description.toLowerCase().includes(query)));
        document.getElementById('dynamicContent').innerHTML = `<div class="search-results"><h2>Поиск мероприятия: "${escapeHtml(query)}"</h2>${filtered.length ? `<div class="events-grid">${sortEventsByDate(filtered).map(e => getEventCardHtml(e)).join('')}</div>` : '<div class="empty-state">Ничего не найдено</div>'}</div>`;
    }
}

function renderPage(page) {
    currentPage = page;
    setActiveNavLink(page);
    const dynamicDiv = document.getElementById('dynamicContent');
    const hero = document.getElementById('heroSection');
    if (hero) hero.style.display = 'block';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = page === 'events' ? 'Поиск мероприятий...' : 'Поиск мест силы...';
    
    if (page === 'events') {
        dynamicDiv.innerHTML = `<h2><i class="fas fa-calendar-alt"></i> Мероприятия</h2><p>Афиша событий в Пермском крае и Удмуртии (сортировка по дате: от ближайших к дальним)</p>${currentUser ? `<button class="add-button" style="width: auto; padding: 10px 24px; margin-bottom: 20px;" onclick="showAddEventModal()"><i class="fas fa-plus"></i> Добавить мероприятие</button>` : ''}<div class="events-grid">${sortEventsByDate(events).map(e => getEventCardHtml(e)).join('')}</div>`;
    } else if (page === 'attractions') {
        dynamicDiv.innerHTML = `<h2><i class="fas fa-mountain"></i> Места силы</h2><p>Точки притяжения в Пермском крае и Удмуртии (сортировка по расстоянию от Чайковского)</p>${currentUser ? `<button class="add-button" style="width: auto; padding: 10px 24px; margin-bottom: 20px;" onclick="showAddAttractionModal()"><i class="fas fa-plus"></i> Добавить место силы</button>` : ''}<div class="attractions-grid">${sortAttractionsByDistance(attractions).map(a => getAttractionCardHtml(a)).join('')}</div>`;
    }
    window.scrollTo({ top: 0 });
}

function setupPhotoUpload(inputId, previewId, imgId, storageVar) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const img = document.getElementById(imgId);
    if (input) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    img.src = event.target.result;
                    preview.style.display = 'block';
                    if (storageVar === 'attraction') attractionPhotoData = event.target.result;
                    else eventPhotoData = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function showAddAttractionModal() { 
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    document.getElementById('attractionModalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Добавить место силы';
    document.getElementById('editingAttractionId').value = '';
    ['attractionName', 'attractionLocation', 'attractionDistance', 'attractionLink', 'attractionDescription', 'attractionTime'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('attractionPhotoPreview').style.display = 'none';
    attractionPhotoData = null;
    document.getElementById('addAttractionModal').style.display = 'flex'; 
}

function showAddEventModal() { 
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    document.getElementById('eventModalTitle').innerHTML = '<i class="fas fa-calendar-plus"></i> Добавить мероприятие';
    document.getElementById('editingEventId').value = '';
    ['eventName', 'eventLocation', 'eventDate', 'eventDistance', 'eventLink', 'eventDescription', 'eventTime'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('eventPhotoPreview').style.display = 'none';
    eventPhotoData = null;
    document.getElementById('addEventModal').style.display = 'flex'; 
}

function setupRatingStars() {
    const stars = document.querySelectorAll('#ratingStars i');
    const ratingInput = document.getElementById('reviewRating');
    stars.forEach(star => {
        star.removeEventListener('mouseenter', star._mouseEnter);
        star.removeEventListener('mouseleave', star._mouseLeave);
        star.removeEventListener('click', star._click);
        
        const mouseEnter = () => {
            const r = parseInt(star.dataset.rating);
            stars.forEach(s => s.className = parseInt(s.dataset.rating) <= r ? 'fas fa-star' : 'far fa-star');
            stars.forEach(s => s.style.color = parseInt(s.dataset.rating) <= r ? '#FFD700' : '#ddd');
        };
        const mouseLeave = () => {
            const cur = ratingInput ? parseInt(ratingInput.value) : 0;
            stars.forEach(s => s.className = parseInt(s.dataset.rating) <= cur ? 'fas fa-star' : 'far fa-star');
            stars.forEach(s => s.style.color = parseInt(s.dataset.rating) <= cur ? '#FFD700' : '#ddd');
        };
        const click = () => {
            const r = parseInt(star.dataset.rating);
            if (ratingInput) ratingInput.value = r;
            stars.forEach(s => s.className = parseInt(s.dataset.rating) <= r ? 'fas fa-star' : 'far fa-star');
            stars.forEach(s => s.style.color = parseInt(s.dataset.rating) <= r ? '#FFD700' : '#ddd');
        };
        
        star._mouseEnter = mouseEnter;
        star._mouseLeave = mouseLeave;
        star._click = click;
        star.addEventListener('mouseenter', mouseEnter);
        star.addEventListener('mouseleave', mouseLeave);
        star.addEventListener('click', click);
    });
}

function bindEvents() {
    document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); renderPage(el.getAttribute('data-page')); }));
    document.getElementById('loginBtn').onclick = () => openAuthModal('login');
    document.getElementById('registerBtn').onclick = () => openAuthModal('register');
    document.getElementById('searchBtn').onclick = performSearch;
    document.getElementById('searchInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => document.getElementById('mainNav')?.classList.toggle('show'));
    
    document.getElementById('saveAttractionBtn').onclick = () => {
        const editingId = document.getElementById('editingAttractionId')?.value;
        const name = document.getElementById('attractionName')?.value || '';
        const location = document.getElementById('attractionLocation')?.value || '';
        const distance = document.getElementById('attractionDistance')?.value || '';
        const link = document.getElementById('attractionLink')?.value || '';
        const description = document.getElementById('attractionDescription')?.value || '';
        if (!name.trim() || !location.trim()) { alert("Заполните название и место проведения"); return; }
        
        if (editingId) {
            // Редактирование существующего
            const index = attractions.findIndex(a => a.id == editingId);
            if (index !== -1 && attractions[index].author === currentUser) {
                attractions[index] = { 
                    ...attractions[index], 
                    name: name.trim(), 
                    location: location.trim(), 
                    distance: distance.trim() || "", 
                    link: link.trim() || "", 
                    description: description.trim() || "Нет описания",
                    image: attractionPhotoData || attractions[index].image
                };
                saveAttractions();
            }
        } else {
            // Добавление нового
            attractions.push({ id: Date.now(), name: name.trim(), location: location.trim(), distance: distance.trim() || "", link: link.trim() || "", description: description.trim() || "Нет описания", image: attractionPhotoData || null, author: currentUser || "Аноним" });
            saveAttractions();
        }
        document.getElementById('addAttractionModal').style.display = 'none';
        renderPage(currentPage);
    };
    
    document.getElementById('saveEventBtn').onclick = () => {
        const editingId = document.getElementById('editingEventId')?.value;
        const name = document.getElementById('eventName')?.value || '';
        const location = document.getElementById('eventLocation')?.value || '';
        const date = document.getElementById('eventDate')?.value || '';
        const distance = document.getElementById('eventDistance')?.value || '';
        const link = document.getElementById('eventLink')?.value || '';
        const description = document.getElementById('eventDescription')?.value || '';
        if (!name.trim() || !location.trim()) { alert("Заполните название и место проведения"); return; }
        
        if (editingId) {
            // Редактирование существующего
            const index = events.findIndex(e => e.id == editingId);
            if (index !== -1 && events[index].author === currentUser) {
                events[index] = { 
                    ...events[index], 
                    name: name.trim(), 
                    location: location.trim(), 
                    date: date || "", 
                    distance: distance.trim() || "", 
                    link: link.trim() || "", 
                    description: description.trim() || "Нет описания",
                    image: eventPhotoData || events[index].image
                };
                saveEvents();
            }
        } else {
            // Добавление нового
            events.push({ id: Date.now(), name: name.trim(), location: location.trim(), date: date || "", distance: distance.trim() || "", link: link.trim() || "", description: description.trim() || "Нет описания", image: eventPhotoData || null, author: currentUser || "Аноним" });
            saveEvents();
        }
        document.getElementById('addEventModal').style.display = 'none';
        renderPage(currentPage);
    };
    
    document.getElementById('saveReviewBtn').onclick = () => {
        const editingId = document.getElementById('editingReviewId')?.value;
        const text = document.getElementById('reviewTextArea')?.value || '';
        const rating = parseInt(document.getElementById('reviewRating')?.value || '0');
        if (editingId) {
            if (addReview(currentItemForReview, currentReviewType, text, rating, parseInt(editingId))) {
                document.getElementById('addReviewModal').style.display = 'none';
                document.getElementById('reviewTextArea').value = '';
                renderPage(currentPage);
            } else {
                alert("Ошибка при редактировании отзыва");
            }
        } else {
            if (addReview(currentItemForReview, currentReviewType, text, rating)) {
                document.getElementById('addReviewModal').style.display = 'none';
                document.getElementById('reviewTextArea').value = '';
                renderPage(currentPage);
            } else {
                alert("Ошибка: проверьте текст и оценку");
            }
        }
    };
    
    ['closeModal', 'closeAttractionModal', 'closeEventModal', 'closeReviewModal'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => btn.closest('.modal').style.display = 'none');
    });
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) e.target.style.display = 'none'; });
}

function openAuthModal(mode) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('modalTitle');
    const actionBtn = document.getElementById('modalActionBtn');
    const errorEl = document.getElementById('modalError');
    const loginInput = document.getElementById('modalLogin');
    const passwordInput = document.getElementById('modalPassword');
    const confirmInput = document.getElementById('modalConfirmPassword');
    
    if (errorEl) errorEl.innerText = '';
    
    if (mode === 'login') {
        title.innerText = 'Вход';
        actionBtn.innerHTML = 'Войти';
        if (confirmInput) confirmInput.style.display = 'none';
        actionBtn.onclick = () => {
            if (loginUser(loginInput.value, passwordInput.value)) modal.style.display = 'none';
        };
    } else {
        title.innerText = 'Регистрация';
        actionBtn.innerHTML = 'Зарегистрироваться';
        if (confirmInput) {
            confirmInput.style.display = 'block';
            confirmInput.value = '';
        }
        actionBtn.onclick = () => {
            const confirmPassword = document.getElementById('modalConfirmPassword')?.value || '';
            if (register(loginInput.value, passwordInput.value, confirmPassword)) {
                alert("Регистрация прошла успешно! Теперь войдите.");
                openAuthModal('login');
            }
        };
    }
    loginInput.value = '';
    passwordInput.value = '';
    modal.style.display = 'flex';
}

// Добавляем стили
const style = document.createElement('style');
style.textContent = `
    .delete-review-btn, .edit-review-btn { background: none; border: none; cursor: pointer; font-size: 0.75rem; padding: 4px 8px; border-radius: 12px; transition: all 0.2s ease; margin-left: 5px; }
    .delete-review-btn { color: #e74c3c; }
    .delete-review-btn:hover { background: #e74c3c; color: white; }
    .edit-review-btn { color: #3498db; }
    .edit-review-btn:hover { background: #3498db; color: white; }
    .edit-btn { background: #3498db; color: white; border: none; padding: 10px; border-radius: 50px; cursor: pointer; font-size: 0.85rem; font-weight: 500; flex: 1; transition: all 0.2s ease; }
    .edit-btn:hover { background: #2980b9; transform: translateY(-2px); }
    .review-header { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
    .attraction-description { font-size: 0.85rem; color: var(--text-gray); margin: 10px 0; line-height: 1.4; }
    .review-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--gray-border); }
    .review-actions { display: flex; gap: 15px; }
    .like-btn, .dislike-btn { background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; transition: all 0.2s ease; color: var(--text-gray); }
    .like-btn:hover { background: rgba(46, 204, 113, 0.1); color: #2ecc71; }
    .dislike-btn:hover { background: rgba(231, 76, 60, 0.1); color: #e74c3c; }
    .like-btn.active { background: #2ecc71; color: white; }
    .dislike-btn.active { background: #e74c3c; color: white; }
    .like-btn i, .dislike-btn i { font-size: 0.85rem; }
`;
document.head.appendChild(style);

setupPhotoUpload('attractionPhoto', 'attractionPhotoPreview', 'attractionPhotoImg', 'attraction');
setupPhotoUpload('eventPhoto', 'eventPhotoPreview', 'eventPhotoImg', 'event');

updateStats();
bindEvents();
setupRatingStars();
updateAuthUI();
renderPage('events');