document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // SISTEMA DE SEGURANÇA: CONTROLE DE ACESSO
    // ==========================================================================
    const SENHA_CORRETA = "1009"; // 🌟 MUDAR AQUI: Coloque a senha que você preferir!

    const overlay = document.getElementById("login-overlay");
    const passwordInput = document.getElementById("password-input");
    const submitBtn = document.getElementById("login-submit-btn");
    const errorMsg = document.getElementById("login-error-msg");

    function verificarSenha() {
        if (!passwordInput || !overlay) return;

        if (passwordInput.value === SENHA_CORRETA) {
            // Se a senha estiver certa, esconde a tela preta com efeito fade-out
            overlay.classList.add("hidden");
            errorMsg.textContent = "";
        } else {
            // Se estiver errada, avisa e limpa o campo
            if (errorMsg) errorMsg.textContent = "Senha incorreta... tente novamente. 🌹";
            passwordInput.value = "";
            passwordInput.focus();
        }
    }

    if (submitBtn && passwordInput) {
        // Dispara ao clicar no botão
        submitBtn.addEventListener("click", verificarSenha);

        // Dispara se ela apertar a tecla "Enter" no teclado
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") verificarSenha();
        });
    }
    // ==========================================================================
    // CONFIGURAÇÕES DE DATAS CHAVE
    // ==========================================================================
    const DATA_ENCONTRO = new Date(2020, 1, 24, 15, 0, 0); // 24 de Fev de 2020
    const DATA_CAPSULA = new Date(2031, 1, 24, 0, 0, 0);

    // Banco de Dados de Memórias Acidentais do Céu Noturno
    const MEMORIAS_ESTRELAS = [
        "✨ Lembro daquele ônibus.",
        "✨ Lembro da primeira vez que te vi.",
        "✨ Lembro do ENJA.",
        "✨ Lembro da sua risada.",
        "✨ Lembro de sentir sua falta.",
        "✨ Lembro de quando nossas histórias voltaram a se cruzar.",
        "✨ Lembro daquele abraço.",
        "✨ Lembro de agradecer a Deus por você."
    ];

    // Banco de Frases para a Caixinha de Música (Until I Found You)
    const frasesDaMusica = [
        "Envolva-me em todos os seus braços... ✨",
        "Ah, deixa eu te abraçar. Eu nunca vou deixar você ir de novo.",
        "Eu nunca me apaixonaria novamente, até que a encontrasse. ❤️",
        "Eu nunca cairia, a menos que fosse em você que eu cairia.",
        "Eu estava perdido na escuridão, mas então eu a encontrei.",
        "Eu encontrei você. 🌹",
        "Amá-la, mais uma vez...",
        "Você caiu e eu te peguei.",
        "Georgia, me puxou para perto... 🎵"
    ];

    /* ==========================================================================
       1. Motor do Céu Noturno Ampliado (Com Pontos de Memórias Guardadas)
       ========================================================================== */
    const canvas = document.getElementById('sky-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let starsArray = [];
        const maxStars = 70;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.8;
                this.twinkleSpeed = 0.008 + Math.random() * 0.015;
                this.opacity = Math.random();
                this.direction = Math.random() > 0.5 ? 1 : -1;
                this.hasMemory = Math.random() < 0.40;
                this.isTargeted = false;
            }
            update() {
                this.opacity += this.twinkleSpeed * this.direction;
                if (this.opacity >= 0.85 || this.opacity <= 0.1) {
                    this.direction *= -1;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.isTargeted ? this.size * 2.5 : this.size, 0, Math.PI * 2);
                
                if (this.isTargeted) {
                    ctx.fillStyle = `rgba(214, 177, 126, 1)`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = "#d6b17e";
                } else {
                    ctx.fillStyle = `rgba(214, 177, 126, ${this.opacity})`;
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            }
        }

        for (let i = 0; i < maxStars; i++) {
            starsArray.push(new Star());
        }

        window.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON' || e.target.closest('.widget-wrapper') || document.body.classList.contains('in-blackout')) return;

            starsArray.forEach(star => {
                const distance = Math.hypot(e.clientX - star.x, e.clientY - star.y);
                
                if (distance < 25 && star.hasMemory && !star.isTargeted) {
                    star.isTargeted = true;
                    
                    const fraseAleatoria = MEMORIAS_ESTRELAS[Math.floor(Math.random() * MEMORIAS_ESTRELAS.length)];
                    
                    const textNode = document.createElement('div');
                    textNode.className = 'star-memory-text';
                    textNode.textContent = fraseAleatoria;
                    
                    let posX = e.clientX > window.innerWidth - 180 ? e.clientX - 160 : e.clientX + 15;
                    let posY = e.clientY - 10;
                    
                    textNode.style.left = `${posX}px`;
                    textNode.style.top = `${posY}px`;
                    document.body.appendChild(textNode);

                    setTimeout(() => textNode.classList.add('is-visible'), 50);

                    setTimeout(() => {
                        textNode.classList.remove('is-visible');
                        setTimeout(() => {
                            textNode.remove();
                            star.isTargeted = false;
                        }, 1500);
                    }, 4000);
                }
            });
        });

        function animateSky() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            starsArray.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animateSky);
        }
        animateSky();
    }

    /* ==========================================================================
       2. Sequenciador Cinematográfico: A Valsa no Apagão
       ========================================================================== */
    const btnIgnite = document.getElementById("ignite-candle-btn");
    const triggerContainer = document.getElementById("candle-trigger-container");
    const sceneContainer = document.getElementById("candle-scene");

    if (btnIgnite) {
        btnIgnite.addEventListener("click", () => {
            document.body.classList.add("in-blackout");
            triggerContainer.style.opacity = "0";
            
            setTimeout(() => {
                triggerContainer.style.display = "none";
                sceneContainer.style.display = "block";
                setTimeout(() => sceneContainer.style.opacity = "1", 100);

                const linhasNarrativa = [
                    { id: "line-1", delay: 1500 },
                    { id: "line-2", delay: 4500 },
                    { id: "line-3", delay: 7500 },
                    { id: "line-4", delay: 11000 },
                    { id: "line-5", delay: 14500 }
                ];

                linhasNarrativa.forEach(item => {
                    setTimeout(() => {
                        const el = document.getElementById(item.id);
                        if (el) el.classList.add("is-revealed");
                    }, item.delay);
                });

                setTimeout(() => {
                    document.body.classList.remove("in-blackout");
                }, 22000);

            }, 600);
        });
    }

    /* ==========================================================================
       3. Cronômetro de Encontros em Tempo Real
       ========================================================================== */
    function updateChronometer() {
        const agora = new Date();
        
        let anos = agora.getFullYear() - DATA_ENCONTRO.getFullYear();
        let meses = agora.getMonth() - DATA_ENCONTRO.getMonth();
        let dias = agora.getDate() - DATA_ENCONTRO.getDate();
        let horas = agora.getHours() - DATA_ENCONTRO.getHours();
        let minutos = agora.getMinutes() - DATA_ENCONTRO.getMinutes();
        let segundos = agora.getSeconds() - DATA_ENCONTRO.getSeconds();

        if (segundos < 0) { segundos += 60; minutes--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            const diasMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += diasMesAnterior;
            meses--;
        }
        if (meses < 0) { meses += 12; anos--; }

        const pad = (n) => String(n).padStart(2, '0');

        const elY = document.getElementById("c-years");
        if(elY) {
            elY.textContent = pad(anos);
            document.getElementById("c-months").textContent = pad(meses);
            document.getElementById("c-days").textContent = pad(dias);
            document.getElementById("c-hours").textContent = pad(horas);
            document.getElementById("c-mins").textContent = pad(minutos);
            document.getElementById("c-secs").textContent = pad(segundos);
        }
    }
    setInterval(updateChronometer, 1000);
    updateChronometer();

    /* ==========================================================================
       4. Medidor de Sentimento Complexo (Infinito Automático)
       ========================================================================== */
    const measureBtn = document.getElementById("measure-trigger");
    const fillBar = document.getElementById("intensity-fill");
    const gaugeNum = document.getElementById("gauge-number");
    const gaugeTxt = document.getElementById("gauge-text");

    if (measureBtn) {
        measureBtn.addEventListener("click", () => {
            measureBtn.disabled = true;
            let currentPercent = 0;
            const checkpoints = [10, 35, 70, 99];
            let checkIdx = 0;

            gaugeTxt.textContent = "Calculando eixos emocionais...";

            const interval = setInterval(() => {
                if (checkIdx < checkpoints.length) {
                    currentPercent = checkpoints[checkIdx];
                    fillBar.style.width = `${currentPercent}%`;
                    gaugeNum.textContent = `${currentPercent}%`;
                    checkIdx++;
                } else {
                    clearInterval(interval);
                    fillBar.style.width = "100%";
                    gaugeNum.textContent = "∞";
                    gaugeNum.classList.add("gold-glow");
                    gaugeTxt.textContent = "Resultado incompatível com a matemática.";
                }
            }, 900);
        });
    }

    /* ==========================================================================
       5. Sistema de Modais e Elementos Físicos (Envelope / Conquistas)
       ========================================================================== */
    const modal = document.getElementById("achievements-modal");
    const openBtn = document.getElementById("open-achievements-btn");
    const closeBtn = document.getElementById("close-achievements-btn");

    if(openBtn && modal) openBtn.addEventListener("click", () => modal.classList.add("is-active"));
    if(closeBtn && modal) closeBtn.addEventListener("click", () => modal.classList.remove("is-active"));

    const envelope = document.getElementById("envelope");
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.add("is-open");
        });
    }

    /* ==========================================================================
       6. Controle do Carrossel Mobile
       ========================================================================== */
    const viewport = document.getElementById("carousel-viewport");
    const nextBtn = document.getElementById("next-slide");
    const prevBtn = document.getElementById("prev-slide");

    if(viewport && nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => viewport.scrollBy({ left: 240, behavior: 'smooth' }));
        prevBtn.addEventListener("click", () => viewport.scrollBy({ left: -240, behavior: 'smooth' }));
    }

    /* ==========================================================================
       7. Contagem Regressiva para Cápsula do Tempo (2031)
       ========================================================================== */
    function updateCapsule() {
        const agora = new Date();
        let diff = DATA_CAPSULA.getTime() - agora.getTime();

        if (diff <= 0) return;

        let anosF = DATA_CAPSULA.getFullYear() - agora.getFullYear();
        let mesesF = DATA_CAPSULA.getMonth() - agora.getMonth();
        let diasF = DATA_CAPSULA.getDate() - agora.getDate();

        if (diasF < 0) {
            const diasMesAtual = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).getDate();
            diasF += diasMesAtual;
            mesesF--;
        }
        if (mesesF < 0) { mesesF += 12; anosF--; }

        const elCapY = document.getElementById("cap-years");
        if(elCapY) {
            elCapY.textContent = String(anosF).padStart(2, '0');
            document.getElementById("cap-months").textContent = String(mesesF).padStart(2, '0');
            document.getElementById("cap-days").textContent = String(diasF).padStart(2, '0');
        }
    }
    setInterval(updateCapsule, 60000);
    updateCapsule();

    /* ==========================================================================
       8. SISTEMA EXCLUSIVO DO PLAYER: CAIXINHA DE MÚSICA & FRASES ALEATÓRIAS
       ========================================================================== */
    const audio = document.getElementById("audio-track");
    const playBtn = document.getElementById("global-play-btn");
    const progressBar = document.getElementById("progress-bar");
    const playerContainer = document.querySelector(".mini-player");
    const lyricsText = document.getElementById("lyrics-text");

    // Função interna que altera o texto aleatoriamente com fade-out suave
    function sortearFrase() {
        if (!lyricsText) return;
        const fraseAtual = lyricsText.textContent;
        let novaFrase = fraseAtual;

        while (novaFrase === fraseAtual) {
            const indiceAleatorio = Math.floor(Math.random() * frasesDaMusica.length);
            novaFrase = frasesDaMusica[indiceAleatorio];
        }

        lyricsText.style.opacity = "0";
        setTimeout(() => {
            lyricsText.textContent = novaFrase;
            lyricsText.style.opacity = "1";
        }, 200);
    }

    // Monitor de Erros do arquivo de áudio
    if (audio) {
        audio.addEventListener("error", () => {
            console.error("Erro: arquivo 'musicaa.mp3' não encontrado em assets/music/");
            alert("Não consegui encontrar o arquivo de música em assets/music/musicaa.mp3!");
        });

        // Atualização contínua da barra de progresso dourada
        audio.addEventListener("timeupdate", () => {
            if (audio.duration && progressBar) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        });

        // Evento disparado quando a trilha sonora chega ao fim
        audio.addEventListener("ended", () => {
            if (playBtn) playBtn.classList.remove("playing");
            if (playerContainer) playerContainer.classList.remove("playing");
            if (progressBar) progressBar.style.width = "0%";
            if (lyricsText) lyricsText.textContent = "Eu encontrei você. ❤️";
        });
    }

    // Evento unificado de gatilho do Play / Pause da Caixinha
    if (playBtn && audio && playerContainer) {
        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.classList.add("playing");
                    playerContainer.classList.add("playing"); // Ativa o giro do vinil no CSS
                    sortearFrase(); // Sorteia a frase dinamicamente no clique
                }).catch(error => {
                    console.error("O navegador bloqueou a reprodução imediata:", error);
                });
            } else {
                audio.pause();
                playBtn.classList.remove("playing");
                playerContainer.classList.remove("playing"); // Pausa a rotação
            }
        });
    }
/* ==========================================================================
       9. Mecanismo do Pote de Vaga-lumes e Mensagens Flutuantes
       ========================================================================== */
    const jarBtn = document.getElementById("firefly-jar-btn");
    
    // Lista de bilhetinhos e motivos fofos
    const mensagensVagalumes = [
        "Seu abraço é meu lugar favorito no mundo.",
        "Cada detalhe seu me encanta.",
        "Você está presente em minhas orações.",
        "Meu pensamento preferido do dia é você.",
        "Você deixa todo momento melhor.",
        "Meu coração escolheu você e escolhe todos os dias.",
        "Você traz luz para os meus dias."
    ];

    if (jarBtn) {
        jarBtn.addEventListener("click", (e) => {
            // Cria a luzinha flutuante
            const firefly = document.createElement("div");
            firefly.className = "free-firefly";
            
            // Posição inicial exata saindo de cima do pote
            const rect = jarBtn.getBoundingClientRect();
            firefly.style.left = `${rect.left + rect.width / 2}px`;
            firefly.style.top = `${rect.top}px`;
            
            // Define uma oscilação aleatória para o zigue-zague via CSS variable
            const zigzag = (Math.random() - 0.5) * 100; // de -50px a 50px
            firefly.style.setProperty('--zigzag-x', `${zigzag}px`);
            
            document.body.appendChild(firefly);
            
            // EVENTO CORRIGIDO: Detecta clique ou toque na tela
            const dispararMemoria = (event) => {
                event.preventDefault();
                event.stopPropagation(); // Impede que o céu lá atrás roube o clique
                
                // Escolhe um bilhete aleatório
                const textoIndex = Math.floor(Math.random() * mensagensVagalumes.length);
                const textoSorteado = mensagensVagalumes[textoIndex];
                
                // Pega a posição exata de onde o vaga-lume estava no milissegundo do clique
                const cliqueX = event.clientX || (event.touches && event.touches[0].clientX);
                const cliqueY = event.clientY || (event.touches && event.touches[0].clientY);

                // Cria a caixinha de texto flutuante
                const textoNode = document.createElement("div");
                textoNode.className = "firefly-memory-text";
                textoNode.textContent = textoSorteado;
                textoNode.style.left = `${cliqueX}px`;
                textoNode.style.top = `${cliqueY - 20}px`;
                
                document.body.appendChild(textoNode);
                
                // Efeito de entrada suave
                setTimeout(() => textoNode.classList.add("show"), 20);
                
                // Some com a bolinha brilhante imediatamente
                firefly.remove();
                
                // Destrói o texto após 3.5 segundos
                setTimeout(() => {
                    textoNode.classList.remove("show");
                    setTimeout(() => textoNode.remove(), 300);
                }, 3500);
            };

            // Escuta tanto cliques de mouse quanto toques de dedos em celulares
            firefly.addEventListener("click", dispararMemoria);
            firefly.addEventListener("touchstart", dispararMemoria, { passive: false });
            
            // Se ninguém clicar no vaga-lume, ele se destrói sozinho ao sair da tela (6 segundos)
            setTimeout(() => {
                if (firefly.parentNode) firefly.remove();
            }, 6000);
        });
    }    
});
