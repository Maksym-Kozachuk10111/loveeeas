function triggerPulse() {
    const ring = document.createElement('div');
    ring.className = 'pulse-ring';
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 500);
}

function startStory() {
    document.getElementById('start-block').style.display = 'none';
    triggerPulse();
    document.getElementById('card-1').classList.add('active');
}

function nextCard(currentId, nextId) {
    const currentCard = document.getElementById('card-' + currentId);
    triggerPulse();

    if (currentId === 1) {
        effectGlitchSlice(currentCard, () => showNext(currentId, nextId));
    } else if (currentId === 2) {
        effectShardShatter(currentCard, () => showNext(currentId, nextId));
    } else if (currentId === 3) {
        currentCard.classList.add('vortex-out');
        setTimeout(() => {
            currentCard.classList.remove('vortex-out');
            showNext(currentId, nextId);
        }, 550);
    } else if (currentId === 4) {
        effectAshDissolve(currentCard, () => showNext(currentId, nextId));
    } else if (currentId === 5) {
        currentCard.classList.add('shockwave-out');
        setTimeout(() => {
            currentCard.classList.remove('shockwave-out');
            showNext(currentId, nextId);
        }, 480);
    }
}

function showNext(currentId, nextId) {
    document.getElementById('card-' + currentId).style.display = 'none';
    const nextCard = document.getElementById('card-' + nextId);
    nextCard.classList.add('active');

    const video = nextCard.querySelector('video');
    if (video) {
        video.play().catch(() => {});
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function effectGlitchSlice(card, callback) {
    const rect = card.getBoundingClientRect();
    const slices = 8;
    const sliceHeight = rect.height / slices;
    const elements = [];

    for (let i = 0; i < slices; i++) {
        const slice = document.createElement('div');
        slice.className = 'glitch-slice';
        slice.style.width = rect.width + 'px';
        slice.style.height = sliceHeight + 'px';
        slice.style.top = (rect.top + i * sliceHeight) + 'px';
        slice.style.left = rect.left + 'px';
        document.body.appendChild(slice);
        elements.push(slice);

        const dir = i % 2 === 0 ? 1 : -1;
        const dist = (Math.random() * 200 + 150) * dir;

        requestAnimationFrame(() => {
            slice.style.transform = `translateX(${dist}px)`;
            slice.style.opacity = '0';
        });
    }

    card.style.display = 'none';
    setTimeout(() => {
        elements.forEach(el => el.remove());
        callback();
    }, 450);
}

function effectShardShatter(card, callback) {
    const rect = card.getBoundingClientRect();
    const count = 16;
    const shards = [];

    for (let i = 0; i < count; i++) {
        const shard = document.createElement('div');
        shard.className = 'shard';
        const w = Math.random() * 60 + 20;
        const h = Math.random() * 60 + 20;
        shard.style.width = w + 'px';
        shard.style.height = h + 'px';
        shard.style.top = (rect.top + Math.random() * rect.height) + 'px';
        shard.style.left = (rect.left + Math.random() * rect.width) + 'px';

        document.body.appendChild(shard);
        shards.push(shard);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        requestAnimationFrame(() => {
            shard.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(0)`;
            shard.style.opacity = '0';
        });
    }

    card.style.display = 'none';
    setTimeout(() => {
        shards.forEach(s => s.remove());
        callback();
    }, 480);
}

function effectAshDissolve(card, callback) {
    const rect = card.getBoundingClientRect();
    const particles = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'ash-particle';
        const size = Math.random() * 6 + 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.top = (rect.top + Math.random() * rect.height) + 'px';
        p.style.left = (rect.left + Math.random() * rect.width) + 'px';

        document.body.appendChild(p);
        particles.push(p);

        const ty = -(Math.random() * 150 + 80);
        const tx = (Math.random() - 0.5) * 100;

        requestAnimationFrame(() => {
            p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            p.style.opacity = '0';
        });
    }

    card.style.opacity = '0';
    card.style.transition = 'opacity 0.4s';

    setTimeout(() => {
        particles.forEach(p => p.remove());
        card.style.opacity = '1';
        card.style.transition = 'none';
        callback();
    }, 500);
}