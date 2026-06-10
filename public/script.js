// ========== ПЕРЕМЕННЫЕ ==========
let attractions = [];
let events = [];
let reviews = [];
let users = [];
let currentUser = null;
let currentPage = 'events';
let editingAttractionId = null;
let editingEventId = null;
let editingReviewId = null;
let currentReviewItemId = null;
let currentReviewType = null;

// ========== НАЧАЛЬНЫЕ ДАННЫЕ (ИЗ ФАЙЛА) ==========

// МЕСТА СИЛЫ (29 мест)
const defaultAttractions = [
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

// МЕРОПРИЯТИЯ (30 мероприятий)
const defaultEvents = [
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

const defaultUsers = [
    { login: "admin", password: "admin123", isAdmin: true }
];

// ========== ЗАГРУЗКА ДАННЫХ ==========
function loadData() {
    const savedAttractions = localStorage.getItem('chaik_attractions');
    const savedEvents = localStorage.getItem('chaik_events');
    const savedReviews = localStorage.getItem('chaik_reviews');
    const savedUsers = localStorage.getItem('chaik_users');
    const savedCurrentUser = localStorage.getItem('chaik_currentUser');
    
    attractions = savedAttractions ? JSON.parse(savedAttractions) : [...defaultAttractions];
    events = savedEvents ? JSON.parse(savedEvents) : [...defaultEvents];
    reviews = savedReviews ? JSON.parse(savedReviews) : [];
    users = savedUsers ? JSON.parse(savedUsers) : [...defaultUsers];
    currentUser = savedCurrentUser;
    
    updateAuthUI();
    updateStats();
    renderPage(currentPage);
}

function saveAll() {
    localStorage.setItem('chaik_attractions', JSON.stringify(attractions));
    localStorage.setItem('chaik_events', JSON.stringify(events));
    localStorage.setItem('chaik_reviews', JSON.stringify(reviews));
    localStorage.setItem('chaik_users', JSON.stringify(users));
    updateStats();
}

function updateStats() {
    document.getElementById('totalAttractionsCount').textContent = attractions.length;
    document.getElementById('totalEventsCount').textContent = events.length;
    document.getElementById('totalReviewsCount').textContent = reviews.length;
}

function updateAuthUI() {
    const authDiv = document.getElementById('authWidget');
    const welcomeDiv = document.getElementById('userWelcome');
    
    if (currentUser) {
        authDiv.style.display = 'none';
        welcomeDiv.style.display = 'flex';
        const isAdminUser = currentUser === 'admin';
        welcomeDiv.innerHTML = `<i class="fas fa-user-circle"></i> ${escapeHtml(currentUser)} ${isAdminUser ? '<span style="background: gold; color: #005AB5; padding: 2px 8px; border-radius: 20px; font-size: 12px;">Админ</span>' : ''} <button id="logoutBtn" class="btn-outline" style="padding:4px 12px;">Выйти</button>`;
        document.getElementById('logoutBtn')?.addEventListener('click', logout);
    } else {
        authDiv.style.display = 'flex';
        welcomeDiv.style.display = 'none';
    }
}

// ========== ФОРМАТИРОВАНИЕ ДАТЫ С ГОДОМ ==========
function formatDate(dateString) {
    if (!dateString || dateString === "") return "Дата уточняется";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Дата уточняется";
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch (e) {
        return "Дата уточняется";
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

function setActiveNavLink(page) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// ========== СОРТИРОВКА МЕРОПРИЯТИЙ: СНАЧАЛА БУДУЩИЕ ОТ БЛИЖАЙШИХ К ДАЛЬНИМ, ЗАТЕМ ПРОШЕДШИЕ ==========
function sortEventsByDate(eventsList) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const futureEvents = [];
    const pastEvents = [];
    const noDateEvents = [];
    
    eventsList.forEach(event => {
        if (!event.date || event.date === "") {
            noDateEvents.push(event);
        } else {
            const eventDate = new Date(event.date);
            if (!isNaN(eventDate.getTime())) {
                if (eventDate >= today) {
                    futureEvents.push(event);
                } else {
                    pastEvents.push(event);
                }
            } else {
                noDateEvents.push(event);
            }
        }
    });
    
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return [...futureEvents, ...pastEvents, ...noDateEvents];
}

function sortAttractionsByDistance(attractionsList) {
    return [...attractionsList].sort((a, b) => {
        const distA = parseInt(a.distance) || 9999;
        const distB = parseInt(b.distance) || 9999;
        return distA - distB;
    });
}

// ========== РЕЙТИНГИ ==========
function getAverageRating(itemId, type) {
    const itemReviews = reviews.filter(r => r.itemId === itemId && r.type === type);
    if (!itemReviews.length) return 0;
    return (itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length).toFixed(1);
}

function getItemReviews(itemId, type) {
    return reviews.filter(r => r.itemId === itemId && r.type === type);
}

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

// ========== КАРТОЧКА МЕСТА СИЛЫ ==========
function getAttractionCardHtml(a) {
    const avgRating = getAverageRating(a.id, 'attraction');
    const reviewsCount = getItemReviews(a.id, 'attraction').length;
    const isAdminUser = currentUser === 'admin';
    
    return `
        <div class="attraction-card" onclick="showDetail(${a.id}, 'attraction')">
            <div class="attraction-card-img">
                <i class="fas fa-mountain fa-3x"></i>
                <span class="category-badge">⚡ Место силы</span>
            </div>
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
                ${isAdminUser ? `<div style="display: flex; gap: 8px; margin-top: 8px;"><button onclick="event.stopPropagation(); editAttraction(${a.id})" class="edit-btn"><i class="fas fa-edit"></i> Редактировать</button><button onclick="event.stopPropagation(); deleteAttraction(${a.id})" class="delete-btn"><i class="fas fa-trash"></i> Удалить</button></div>` : ''}
            </div>
        </div>
    `;
}

// ========== КАРТОЧКА МЕРОПРИЯТИЯ (С ПОЛНОЙ ДАТОЙ) ==========
function getEventCardHtml(e) {
    const formattedDate = formatDate(e.date);
    const isAdminUser = currentUser === 'admin';
    
    return `
        <div class="event-card" onclick="showDetail(${e.id}, 'event')">
            <div class="event-card-img">
                <i class="fas fa-calendar-alt fa-3x"></i>
                <span class="category-badge">🎉 Мероприятие</span>
            </div>
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
                ${isAdminUser ? `<div style="display: flex; gap: 8px; margin-top: 8px;"><button onclick="event.stopPropagation(); editEvent(${e.id})" class="edit-btn"><i class="fas fa-edit"></i> Редактировать</button><button onclick="event.stopPropagation(); deleteEvent(${e.id})" class="delete-btn"><i class="fas fa-trash"></i> Удалить</button></div>` : ''}
            </div>
        </div>
    `;
}

// ========== CRUD ОПЕРАЦИИ ==========
function deleteAttraction(id) {
    if (currentUser !== 'admin') { alert("Только администратор может удалять"); return; }
    if (confirm("Удалить место силы?")) {
        attractions = attractions.filter(a => a.id !== id);
        reviews = reviews.filter(r => !(r.itemId === id && r.type === 'attraction'));
        saveAll();
        renderPage(currentPage);
    }
}

function deleteEvent(id) {
    if (currentUser !== 'admin') { alert("Только администратор может удалять"); return; }
    if (confirm("Удалить мероприятие?")) {
        events = events.filter(e => e.id !== id);
        reviews = reviews.filter(r => !(r.itemId === id && r.type === 'event'));
        saveAll();
        renderPage(currentPage);
    }
}

function editAttraction(id) {
    if (currentUser !== 'admin') { alert("Только администратор может редактировать"); return; }
    const item = attractions.find(a => a.id === id);
    if (item) {
        editingAttractionId = id;
        document.getElementById('attractionModalTitle').innerHTML = '<i class="fas fa-edit"></i> Редактировать место силы';
        document.getElementById('editingAttractionId').value = id;
        document.getElementById('attractionName').value = item.name;
        document.getElementById('attractionLocation').value = item.location;
        document.getElementById('attractionDistance').value = item.distance || '';
        document.getElementById('attractionDescription').value = item.description || '';
        document.getElementById('attractionLink').value = item.link || '';
        document.getElementById('addAttractionModal').style.display = 'flex';
    }
}

function editEvent(id) {
    if (currentUser !== 'admin') { alert("Только администратор может редактировать"); return; }
    const item = events.find(e => e.id === id);
    if (item) {
        editingEventId = id;
        document.getElementById('eventModalTitle').innerHTML = '<i class="fas fa-edit"></i> Редактировать мероприятие';
        document.getElementById('editingEventId').value = id;
        document.getElementById('eventName').value = item.name;
        document.getElementById('eventLocation').value = item.location;
        document.getElementById('eventDate').value = item.date || '';
        document.getElementById('eventDistance').value = item.distance || '';
        document.getElementById('eventDescription').value = item.description || '';
        document.getElementById('eventLink').value = item.link || '';
        document.getElementById('addEventModal').style.display = 'flex';
    }
}

function addReviewToServer(itemId, type, text, rating) {
    if (!currentUser) { alert("Войдите в аккаунт чтобы оставить отзыв"); return false; }
    if (!text.trim()) { alert("Введите текст отзыва"); return false; }
    if (rating < 1) { alert("Поставьте оценку"); return false; }
    
    const review = {
        id: Date.now(),
        itemId, type,
        author: currentUser,
        text: text.trim(),
        rating: rating,
        likes: 0,
        dislikes: 0,
        userReaction: null,
        date: new Date().toLocaleDateString()
    };
    
    reviews.push(review);
    saveAll();
    return true;
}

function updateReviewOnServer(id, text, rating) {
    const index = reviews.findIndex(r => r.id === id);
    if (index !== -1 && reviews[index].author === currentUser) {
        reviews[index].text = text.trim();
        reviews[index].rating = rating;
        saveAll();
        return true;
    }
    return false;
}

function deleteReview(id) {
    const review = reviews.find(r => r.id === id);
    if (review && (review.author === currentUser || currentUser === 'admin')) {
        if (confirm("Удалить отзыв?")) {
            reviews = reviews.filter(r => r.id !== id);
            saveAll();
            renderPage(currentPage);
        }
    }
}

async function likeReview(reviewId) {
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
    saveAll();
    renderPage(currentPage);
}

async function dislikeReview(reviewId) {
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
    saveAll();
    renderPage(currentPage);
}

// ========== ОТОБРАЖЕНИЕ ==========
function showDetail(id, type) {
    let item = type === 'attraction' ? attractions.find(a => a.id === id) : events.find(e => e.id === id);
    if (!item) return;
    
    const avgRating = (type !== 'event') ? getAverageRating(id, type) : 0;
    const reviewsCount = (type !== 'event') ? getItemReviews(id, type).length : 0;
    const formattedDate = type === 'event' ? formatDate(item.date) : null;
    const isAdminUser = currentUser === 'admin';
    
    let html = `
        <span class="close-modal" onclick="document.getElementById('detailModal').style.display='none'">&times;</span>
        <div style="background: #e8ecf2; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 16px; margin-bottom: 20px;">
            <i class="fas ${type === 'attraction' ? 'fa-mountain' : 'fa-calendar-alt'} fa-5x" style="color: #a0a8b5;"></i>
        </div>
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
    
    if (isAdminUser) {
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
                        <button class="edit-review-btn" onclick="editReview(${r.id}, '${escapeHtml(name).replace(/'/g, "\\'")}'); document.getElementById('reviewsModal')?.remove();"><i class="fas fa-edit"></i> Редактировать</button>
                        <button class="delete-review-btn" onclick="deleteReview(${r.id}); document.getElementById('reviewsModal')?.remove();"><i class="fas fa-trash"></i> Удалить</button>
                    </div>` : ''}
                </div>
                <p>${escapeHtml(r.text)}</p>
                <div class="review-footer">
                    <div class="review-actions">
                        <button class="like-btn ${isLiked ? 'active' : ''}" onclick="likeReview(${r.id})"><i class="fas fa-thumbs-up"></i> <span>${likes}</span></button>
                        <button class="dislike-btn ${isDisliked ? 'active' : ''}" onclick="dislikeReview(${r.id})"><i class="fas fa-thumbs-down"></i> <span>${dislikes}</span></button>
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

function editReview(id, name) {
    const review = reviews.find(r => r.id === id);
    if (review && review.author === currentUser) {
        editingReviewId = id;
        currentReviewItemId = review.itemId;
        currentReviewType = review.type;
        document.getElementById('reviewModalTitle').innerHTML = '<i class="fas fa-edit"></i> Редактировать отзыв';
        document.getElementById('reviewAttractionName').innerText = name;
        document.getElementById('reviewTextArea').value = review.text;
        document.getElementById('reviewRating').value = review.rating;
        
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

function showAddReviewModal(id, type, name) {
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    editingReviewId = null;
    currentReviewItemId = id;
    currentReviewType = type;
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
    const isAdminUser = currentUser === 'admin';
    
    if (page === 'events') {
        dynamicDiv.innerHTML = `<h2><i class="fas fa-calendar-alt"></i> Мероприятия</h2>${isAdminUser ? `<button class="add-button" style="width: auto; padding: 10px 24px; margin-bottom: 20px;" onclick="showAddEventModal()"><i class="fas fa-plus"></i> Добавить мероприятие</button>` : ''}<div class="events-grid">${sortEventsByDate(events).map(e => getEventCardHtml(e)).join('')}</div>`;
    } else if (page === 'attractions') {
        dynamicDiv.innerHTML = `<h2><i class="fas fa-mountain"></i> Места силы</h2>${isAdminUser ? `<button class="add-button" style="width: auto; padding: 10px 24px; margin-bottom: 20px;" onclick="showAddAttractionModal()"><i class="fas fa-plus"></i> Добавить место силы</button>` : ''}<div class="attractions-grid">${sortAttractionsByDistance(attractions).map(a => getAttractionCardHtml(a)).join('')}</div>`;
    }
    window.scrollTo({ top: 0 });
}

function showAddAttractionModal() {
    if (currentUser !== 'admin') { alert("Только администратор может добавлять места силы"); return; }
    editingAttractionId = null;
    document.getElementById('attractionModalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Добавить место силы';
    document.getElementById('editingAttractionId').value = '';
    ['attractionName', 'attractionLocation', 'attractionDistance', 'attractionLink', 'attractionDescription'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('addAttractionModal').style.display = 'flex';
}

function showAddEventModal() {
    if (currentUser !== 'admin') { alert("Только администратор может добавлять мероприятия"); return; }
    editingEventId = null;
    document.getElementById('eventModalTitle').innerHTML = '<i class="fas fa-calendar-plus"></i> Добавить мероприятие';
    document.getElementById('editingEventId').value = '';
    ['eventName', 'eventLocation', 'eventDate', 'eventDistance', 'eventLink', 'eventDescription'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('addEventModal').style.display = 'flex';
}

function resetUserData() {
    if (!currentUser) { alert("Войдите в аккаунт"); return; }
    if (confirm(`Очистить ваши данные (${currentUser})?`)) {
        reviews = reviews.filter(r => r.author !== currentUser);
        saveAll();
        renderPage(currentPage);
    }
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
    document.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            renderPage(el.getAttribute('data-page'));
        });
    });
    
    document.getElementById('loginBtn').onclick = () => openAuthModal('login');
    document.getElementById('registerBtn').onclick = () => openAuthModal('register');
    document.getElementById('searchBtn').onclick = performSearch;
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
        document.getElementById('mainNav')?.classList.toggle('show');
    });
    
    document.getElementById('saveAttractionBtn').onclick = () => {
        if (currentUser !== 'admin') { alert("Только администратор может добавлять"); return; }
        const name = document.getElementById('attractionName')?.value || '';
        const location = document.getElementById('attractionLocation')?.value || '';
        const distance = document.getElementById('attractionDistance')?.value || '';
        const link = document.getElementById('attractionLink')?.value || '';
        const description = document.getElementById('attractionDescription')?.value || '';
        if (!name.trim() || !location.trim()) { alert("Заполните название и место проведения"); return; }
        
        const data = {
            id: editingAttractionId ? parseInt(editingAttractionId) : Date.now(),
            name: name.trim(),
            location: location.trim(),
            distance: distance.trim() || "",
            link: link.trim() || "",
            description: description.trim() || "Нет описания",
            author: currentUser
        };
        
        if (editingAttractionId) {
            const index = attractions.findIndex(a => a.id === parseInt(editingAttractionId));
            if (index !== -1) attractions[index] = data;
        } else {
            attractions.push(data);
        }
        saveAll();
        document.getElementById('addAttractionModal').style.display = 'none';
        renderPage(currentPage);
    };
    
    document.getElementById('saveEventBtn').onclick = () => {
        if (currentUser !== 'admin') { alert("Только администратор может добавлять"); return; }
        const name = document.getElementById('eventName')?.value || '';
        const location = document.getElementById('eventLocation')?.value || '';
        const date = document.getElementById('eventDate')?.value || '';
        const distance = document.getElementById('eventDistance')?.value || '';
        const link = document.getElementById('eventLink')?.value || '';
        const description = document.getElementById('eventDescription')?.value || '';
        if (!name.trim() || !location.trim()) { alert("Заполните название и место проведения"); return; }
        
        const data = {
            id: editingEventId ? parseInt(editingEventId) : Date.now(),
            name: name.trim(),
            location: location.trim(),
            date: date || "",
            distance: distance.trim() || "",
            link: link.trim() || "",
            description: description.trim() || "Нет описания",
            author: currentUser
        };
        
        if (editingEventId) {
            const index = events.findIndex(e => e.id === parseInt(editingEventId));
            if (index !== -1) events[index] = data;
        } else {
            events.push(data);
        }
        saveAll();
        document.getElementById('addEventModal').style.display = 'none';
        renderPage(currentPage);
    };
    
    document.getElementById('saveReviewBtn').onclick = () => {
        const text = document.getElementById('reviewTextArea')?.value || '';
        const rating = parseInt(document.getElementById('reviewRating')?.value || '0');
        
        if (editingReviewId) {
            updateReviewOnServer(editingReviewId, text, rating);
        } else {
            addReviewToServer(currentReviewItemId, currentReviewType, text, rating);
        }
        document.getElementById('addReviewModal').style.display = 'none';
        document.getElementById('reviewTextArea').value = '';
        renderPage(currentPage);
    };
    
    ['closeModal', 'closeAttractionModal', 'closeEventModal', 'closeReviewModal'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => btn.closest('.modal').style.display = 'none');
    });
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) e.target.style.display = 'none';
    });
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
            const user = users.find(u => u.login === loginInput.value && u.password === passwordInput.value);
            if (user) {
                currentUser = user.login;
                localStorage.setItem('chaik_currentUser', currentUser);
                updateAuthUI();
                renderPage(currentPage);
                modal.style.display = 'none';
            } else {
                if (errorEl) errorEl.innerText = "Неверный логин или пароль";
            }
        };
    } else {
        title.innerText = 'Регистрация';
        actionBtn.innerHTML = 'Зарегистрироваться';
        if (confirmInput) {
            confirmInput.style.display = 'block';
            confirmInput.value = '';
        }
        actionBtn.onclick = () => {
            const login = loginInput.value;
            const password = passwordInput.value;
            const confirmPassword = document.getElementById('modalConfirmPassword')?.value || '';
            
            if (!login.trim()) { if (errorEl) errorEl.innerText = "Введите логин"; return; }
            if (password.length < 6) { if (errorEl) errorEl.innerText = "Пароль должен быть не менее 6 символов"; return; }
            if (password !== confirmPassword) { if (errorEl) errorEl.innerText = "Пароли не совпадают"; return; }
            if (users.find(u => u.login === login)) { if (errorEl) errorEl.innerText = "Пользователь уже существует"; return; }
            
            users.push({ login: login.trim(), password: password, isAdmin: false });
            saveAll();
            alert("Регистрация прошла успешно! Теперь войдите.");
            openAuthModal('login');
        };
    }
    loginInput.value = '';
    passwordInput.value = '';
    modal.style.display = 'flex';
}

function logout() {
    currentUser = null;
    localStorage.removeItem('chaik_currentUser');
    updateAuthUI();
    renderPage('events');
}

// Запуск
window.onload = () => {
    loadData();
    bindEvents();
    setupRatingStars();
};
