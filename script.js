// CineVerse - script.js : Master Database & Logic

// Optional Supabase helper when available.
let supabaseClient = null;
if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
  const supabaseUrl = 'https://ectftbenssqjnjbjiati.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjdGZ0YmVuc3Nxam5qYmppYXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzE0ODIsImV4cCI6MjA5NDk0NzQ4Mn0.2kWHuS41qV5Hi4Mfid9kn5bD_4u-MyqTvA5Q1I0DExA';
  supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
}

// --- 1. INITIALIZE LOCAL DATABASES ---
if (!localStorage.getItem('usersDB')) {
    localStorage.setItem('usersDB', JSON.stringify([]));
}
if (!localStorage.getItem('bookingsDB')) {
    localStorage.setItem('bookingsDB', JSON.stringify([]));
}

// --- 2. MOVIES ARRAY ---
const movies = [

{
    title: "The Mandalorian and Grogu",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/5Vi8dSauVwH1HOsiZceDMbRr1Ca.jpg",
    trailer: "https://www.youtube.com/embed/IHWlvwu8t1w",
    rating: "PG-13",
    duration: "140 min"
},

{
    title: "Mortal Kombat 2",
    poster: "https://m.media-amazon.com/images/M/MV5BNTg2YWNkN2EtMzc1Ny00ZTBhLWFmYTItMmMyNzhjNjhhNmVhXkEyXkFqcGc@._V1_.jpg",
    trailer: "https://www.youtube.com/embed/b24oG7qCwp4",
    rating: "R",
    duration: "122 min"
},

{
    title: "Backrooms",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/vpkNMkbisv5cTaIfCzUduYzXnjb.jpg",
    trailer: "https://www.youtube.com/embed/0HjdiohVOik",
    rating: "PG-13",
    duration: "118 min"
},

{
    title: "Passenger",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/2sOEJzhPzjTkZSlPbGxOJ7xgIyS.jpg",
    trailer: "https://www.youtube.com/embed/B_qj1YjI5a4",
    rating: "PG-13",
    duration: "116 min"
},

{
    title: "Project Hail Mary",
    poster: "https://m.media-amazon.com/images/M/MV5BNTkwNzJiYTctNzI3NC00NjE1LTlhYjktY2Q5MTdmMWFmNzcxXkEyXkFqcGc@._V1_.jpg",
    trailer: "https://www.youtube.com/embed/m08TxIsFTRI",
    rating: "PG-13",
    duration: "125 min"
},

{
    title: "The Devil Wears Prada 2",
    poster: "https://m.media-amazon.com/images/M/MV5BZmM3ZDU3ODItZmY5Yi00OTQ2LWE5OTctZTA5NDBhMWJkOGY3XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://www.youtube.com/embed/e9HXmMnUEdE",
    rating: "PG-13",
    duration: "119 min"
},

{
    title: "Pressure",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9RkDrI8V8QJBjhtyRX7y6Qow3aq.jpg",
    trailer: "https://www.youtube.com/embed/zdM4tdLQBg0",
    rating: "R",
    duration: "119 min"
},

{
    title: "Obsession",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/40I66L7QKguTFDPvcLcdiTbAD7I.jpg",
    trailer: "https://www.youtube.com/embed/TaaDkbG3I7g",
    rating: "R",
    duration: "124 min"
},

{
    title: "Hokum",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/jKPWwsbAM6HKURPYQ1eG8DmKMKn.jpg",
    trailer: "https://www.youtube.com/embed/EVCIK_MPyhc",
    rating: "PG-13",
    duration: "133 min"
},

];

const upcomingMovies = [
    {
        title: "The Odyssey",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/krVa7rKCQb4OBfsr2LTJv4rTz5q.jpg",
        trailer: "https://youtu.be/f_bKjZeJBBI"
    },
    {
        title: "Spider-Man: Brand New Day",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/yyB2VJEW3an2xCdcYCPQhn9QERR.jpg",
        trailer: "https://youtu.be/8TZMtslA3UY"
    },
    {
        title: "Avengers: Doomsday",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8HkIe2i4ScpCkcX9SzZ9IPasqWV.jpg",
        trailer: "https://youtu.be/399Ez7WHK5s"
    },
    {
        title: "Digger",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/1ATXKrIPJyKNwnJ6lcG088Sa6zi.jpg",
        trailer: "https://youtu.be/Rd21PhsDHww"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const heroWrapper = document.getElementById("heroWrapper");

    if (heroWrapper) {
        heroWrapper.innerHTML = movies.map(movie => `
            <div class="swiper-slide w-full h-full relative overflow-hidden flex items-center justify-center bg-gray-900">
                <!-- Blurred Background Layer (Absolute) -->
                <img 
                    src="${movie.poster}" 
                    class="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 brightness-50 z-0 transition duration-700"
                />

                <!-- Main Centered Poster (Foreground) -->
                <div class="relative z-10 h-[90%] aspect-[2/3] rounded-xl shadow-2xl overflow-hidden">
                    <img 
                        src="${movie.poster}" 
                        class="w-full h-full object-cover transition duration-700"
                    />

                    <!-- Dark gradient at the bottom for readability -->
                    <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

                    <!-- Text overlay -->
                    <div class="absolute bottom-0 left-0 w-full p-6 text-white z-20 flex flex-col items-center justify-end text-center">
                        <h2 class="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">${movie.title}</h2>
                        <p class="text-sm font-semibold text-gray-300 drop-shadow-md">${movie.rating} • ${movie.duration}</p>
                    </div>
                </div>
            </div>
        `).join("");
    }

    new Swiper('.heroSwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

function selectMovie(title, trailerUrl) {
    const movieData = {
        title,
        trailerUrl,
        bookingTime: new Date().toISOString()
    };

    localStorage.setItem('selectedMovie', JSON.stringify(movieData));
    transitionTo('details.html');
}

// Global logic for navigation
function transitionTo(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

function goHome() {
    transitionTo('index.html');
}

// --- 3. SEATING LOGIC (Fixed 8 JOD) ---
const config = {
    rows: ['A','B','C','D','E','F','G','H'],
    seatsPerRow: 16,
    pricePerSeat: 8  // 8 JOD Flat Rate
};

let selectedSeats = new Set();
let occupiedSeats = new Set(); // سيتم جلبها من قاعدة البيانات لاحقاً

function buildSeats(){
    // Check if we are on seats.html by looking for rowA
    if(!document.getElementById('rowA')) return;

    // Load active booking session (Movie, Date, Time)
    const sessionData = JSON.parse(localStorage.getItem('bookingSession') || '{}');
    if(sessionData.title) {
        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');
        if (pageTitle) pageTitle.innerText = `${sessionData.title} Seats`;
        if (pageSubtitle) pageSubtitle.innerText = `${sessionData.date} • ${sessionData.time}`;
    }

    // Read from DataBase: What seats are already booked for THIS specific movie & time?
    const allBookings = JSON.parse(localStorage.getItem('bookingsDB'));
    occupiedSeats.clear();
    allBookings.forEach(booking => {
        if(booking.movie === sessionData.title && booking.date === sessionData.date && booking.time === sessionData.time){
            booking.seats.forEach(s => occupiedSeats.add(s));
        }
    });

    // initialize selectedSeats from BookingContext storage
    const ctx = window.BookingContext && window.BookingContext.getState ? window.BookingContext.getState() : null;
    if(ctx && Array.isArray(ctx.selectedSeats)){
        selectedSeats = new Set(ctx.selectedSeats);
    }

    for(const row of config.rows){
        const container = document.getElementById('row'+row);
        if(!container) continue;
        container.innerHTML = '';
        for(let i=1; i<=config.seatsPerRow; i++){
            const seatId = row + i;
            const occ = occupiedSeats.has(seatId);
            const btn = document.createElement('button');
            
            const seatSvg = `
                <svg viewBox="0 0 80 80" class="seat-svg" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="seatGrad${row}${i}" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#2f2e33" />
                            <stop offset="45%" stop-color="#11151e" />
                            <stop offset="100%" stop-color="#090b10" />
                        </linearGradient>
                    </defs>
                    <rect x="14" y="18" width="52" height="28" rx="12" fill="url(#seatGrad${row}${i})" />
                    <rect x="16" y="12" width="48" height="22" rx="12" fill="#121826" />
                    <path d="M16 46 h48 v6 c0 4-4 8-8 8 h-32 c-4 0-8-4-8-8 z" fill="#0d1119" />
                    <ellipse cx="34" cy="46" rx="4" ry="2.2" fill="rgba(255,255,255,0.08)" />
                    <ellipse cx="46" cy="46" rx="4" ry="2.2" fill="rgba(255,255,255,0.08)" />
                    <path d="M20 10 h40 v6 c0 4-4 8-8 8 h-24 c-4 0-8-4-8-8 z" fill="rgba(255,255,255,0.08)" opacity="0.5"/>
                </svg>`;

            btn.className = 'seat-btn';
            btn.dataset.seatId = seatId;
            btn.dataset.price = `${config.pricePerSeat} JOD`;
            btn.innerHTML = `${seatSvg}<span class="seat-number">${i}</span>`;
            btn.title = `${config.pricePerSeat} JOD`;

            if(occ){
                // الكرسي المحجوز (أحمر غامق ومقفول)
                btn.classList.add('bg-red-900', 'cursor-not-allowed', 'opacity-50', 'border', 'border-red-700');
                btn.disabled = true;
            } else {
                // الكرسي المتاح (رمادي)
                btn.classList.add('hover:shadow-lg');
                btn.addEventListener('click', () => toggleSeatSelection(seatId, btn));
                if(selectedSeats.has(seatId)){
                    btn.classList.add('selected');
                }
            }
            container.appendChild(btn);
        }
    }

    // update booking context and UI states
    updateSummary();
    updateBookNowState();
}

function toggleSeatSelection(seatId, btn){
    if(selectedSeats.has(seatId)){
        selectedSeats.delete(seatId);
        btn.classList.remove('selected');
    } else {
        selectedSeats.add(seatId);
        btn.classList.add('selected');
    }
    updateSummary();
    updateBookNowState();
}

function updateSummary(){
    const selectedArr = Array.from(selectedSeats).sort();
    const count = selectedArr.length;
    const total = count * config.pricePerSeat; // Multiply by 8 JOD

    // Save to checkout cache
    localStorage.setItem('checkoutTotal', total);
    localStorage.setItem('checkoutSeats', JSON.stringify(selectedArr));

    // sync to BookingContext
    if(window.BookingContext && window.BookingContext.setSelectedSeats){
        window.BookingContext.setSelectedSeats(selectedArr, total);
    }

    const pageTitle = document.getElementById('pageTitle');
    const sessionData = JSON.parse(localStorage.getItem('bookingSession') || '{}');
    if (pageTitle && count > 0) {
        pageTitle.innerText = `${sessionData.title || 'Movie'} · ${count} seats selected`;
    }

    if (count === 0 && pageTitle) {
        pageTitle.innerText = sessionData.title ? `${sessionData.title} Seats` : 'Select Your Seats';
    }
}

function updateBookNowState(){
    const btn = document.getElementById('bookNowBtn') || document.getElementById('confirmBookingBtn');
    const count = selectedSeats.size;
    if(btn){
        btn.disabled = count === 0;
        btn.classList.toggle('opacity-50', count === 0);
    }
    // update booking bar summary if present
    const bookingSeats = document.getElementById('bookingSeats');
    const bookingTotal = document.getElementById('bookingTotal');
    const sessionData = JSON.parse(localStorage.getItem('bookingSession') || '{}');
    if(bookingSeats) bookingSeats.innerText = Array.from(selectedSeats).sort().join(', ') || '0';
    if(bookingTotal) bookingTotal.innerText = (Array.from(selectedSeats).length * config.pricePerSeat) || 0;
    const bookingMovie = document.getElementById('bookingMovie');
    const bookingDateTime = document.getElementById('bookingDateTime');
    if(bookingMovie) bookingMovie.innerText = sessionData.title || '-';
    if(bookingDateTime) bookingDateTime.innerText = `${sessionData.date || '-'} • ${sessionData.time || '-'}`;
}

function handleConfirmBooking() {
    const selectedArr = Array.from(selectedSeats).sort();
    if (selectedArr.length === 0) {
        showToast('Please select at least one seat first.');
        return;
    }

    const sessionData = JSON.parse(localStorage.getItem('bookingSession') || '{}');
    const total = selectedArr.length * config.pricePerSeat;

    localStorage.setItem('checkoutTotal', total);
    localStorage.setItem('checkoutSeats', JSON.stringify(selectedArr));
    localStorage.setItem('checkoutMovie', JSON.stringify(sessionData));

    const bookingBar = document.getElementById('booking-bar');
    const bookingSeats = document.getElementById('bookingSeats');
    const bookingMovie = document.getElementById('bookingMovie');
    const bookingDateTime = document.getElementById('bookingDateTime');
    const bookingTotal = document.getElementById('bookingTotal');

    if (bookingSeats) bookingSeats.innerText = selectedArr.join(', ');
    if (bookingMovie) bookingMovie.innerText = sessionData.title || 'Unknown';
    if (bookingDateTime) bookingDateTime.innerText = `${sessionData.date || '-'} • ${sessionData.time || '-'}`;
    if (bookingTotal) bookingTotal.innerText = total;

    if (bookingBar) {
        bookingBar.classList.add('active');
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
    }, 3200);
}


// Initialize Seats on Load
if(typeof window !== 'undefined'){
    window.addEventListener('DOMContentLoaded', buildSeats);
}

// Global password visibility toggle for any page using data-toggle="password"
function togglePasswordVisibility(event) {
    const icon = event.currentTarget;
    
    // 1. حاول تجيب الـ ID من data-target (لصفحة الـ signup)
    let targetId = icon.getAttribute('data-target');
    
    // 2. إذا ما لقينا، افترض إنه الحقل اسمه "password" (لصفحة الـ signin)
    if (!targetId) {
        targetId = 'password';
    }
    
    const input = document.getElementById(targetId);
    
    if (!input) return;

    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    
    // تبديل أيقونة العين
    icon.classList.toggle('fa-eye-slash', !isHidden);
    icon.classList.toggle('fa-eye', isHidden);
}

// استبدل الدالة القديمة بهذه النسخة المضمونة
function initPasswordToggles() {
    const icons = document.querySelectorAll('[data-toggle="password"]');
    icons.forEach(icon => {
        // remove any previous binding to avoid duplicates
        icon.removeEventListener('click', togglePasswordVisibility);
        icon.addEventListener('click', togglePasswordVisibility);
    });

    // Ensure the specific #togglePassword ID also has the listener (explicit requirement)
    const idIcon = document.getElementById('togglePassword');
    if (idIcon) {
        idIcon.removeEventListener('click', togglePasswordVisibility);
        idIcon.addEventListener('click', togglePasswordVisibility);
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initPasswordToggles);
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initPasswordToggles();
    }
}

// --- BookingContext: simple shared state and eventing across pages ---
window.BookingContext = (function(){
    const state = {
        selectedSeats: [],
        total: 0
    };

    function emit(){
        const ev = new CustomEvent('bookingUpdate', { detail: { ...state } });
        window.dispatchEvent(ev);
    }

    function loadFromStorage(){
        const seats = JSON.parse(localStorage.getItem('checkoutSeats') || '[]');
        const total = parseInt(localStorage.getItem('checkoutTotal') || '0');
        state.selectedSeats = seats;
        state.total = total;
    }

    function saveToStorage(){
        localStorage.setItem('checkoutSeats', JSON.stringify(state.selectedSeats));
        localStorage.setItem('checkoutTotal', state.total);
    }

    loadFromStorage();

    return {
        getState: () => ({ ...state }),
        setSelectedSeats: (seats, total) => {
            state.selectedSeats = Array.isArray(seats) ? seats : [];
            state.total = Number(total) || 0;
            saveToStorage();
            emit();
        },
        subscribe: (fn) => {
            window.addEventListener('bookingUpdate', (e) => fn(e.detail));
            // immediately call with current state
            fn({ ...state });
        }
    };
})();

// --- ميزة النافبار الذكي (المطور) ---
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("moviesGrid");
    if (container) {
        container.innerHTML = movies.map(movie => `
            <div class="group cursor-pointer transform transition duration-500 hover:-translate-y-3 hover:scale-[1.03]">
                
                <div class="relative overflow-hidden rounded-2xl aspect-[2/3] bg-gray-800 shadow-xl">
                    <img 
        src="${movie.poster}" 
        class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-75" 
    />

                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                        <button class="bg-red-600 hover:bg-red-700 px-7 py-3 rounded-xl font-bold tracking-wide shadow-2xl transition duration-300 hover active:scale-95"
                            onclick="selectMovie('${movie.title}', '${movie.trailer}')">
                            BUY TICKETS
                        </button>
                    </div>
                </div>

                <h3 class="text-xl font-bold mt-4">${movie.title}</h3>
                <p class="text-gray-400 text-sm">${movie.rating} • ${movie.duration}</p>

            </div>
        `).join("");
    }

    const upcomingContainer = document.getElementById("upcomingGrid");
    if (upcomingContainer) {
        upcomingContainer.innerHTML = upcomingMovies.map(movie => `
            <div class="group cursor-pointer transform transition duration-500 hover:-translate-y-3 hover:scale-[1.03]">
                
                <div class="relative overflow-hidden rounded-2xl aspect-[2/3] bg-gray-800 shadow-xl">
                    <img 
        src="${movie.poster}" 
        class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-75" 
    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center space-y-4">
                        <span class="text-2xl font-bold text-white drop-shadow-md">Coming Soon</span>
                        <a href="${movie.trailer}" target="_blank" rel="noopener noreferrer" 
                           class="bg-red-600 hover:bg-red-700 px-7 py-3 rounded-xl font-bold tracking-wide shadow-2xl transition duration-300 hover active:scale-95 text-white">
                            Watch Trailer
                        </a>
                    </div>
                </div>

                <h3 class="text-xl font-bold mt-4">${movie.title}</h3>
            </div>
        `).join("");
    }
});

// SIGN IN WITH SUPABASE
document.addEventListener("DOMContentLoaded", () => {

    const signinForm = document.getElementById("signinForm");

    if (!signinForm) return;

    signinForm.addEventListener("submit", async function(e) {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const btn = signinForm.querySelector("button[type='submit']");

        if (btn) {
            btn.innerHTML = "Loading...";
            btn.disabled = true;
        }

        if (!supabaseClient) {
    alert("Supabase is not connected.");
    return;
}

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert(error.message);

            if (btn) {
                btn.innerHTML = "SIGN IN";
                btn.disabled = false;
            }

            return;
        }

        localStorage.setItem("userSession", JSON.stringify(data.user));

        window.location.href = "index.html";
    });

});