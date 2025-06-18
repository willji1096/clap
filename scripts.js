// goal.html에서 분리한 JS
document.addEventListener('DOMContentLoaded', function() {
  // 모든 메뉴 그룹의 하위 메뉴를 접음 (.hide 클래스로)
  document.querySelectorAll('.menu-group .menu-sub').forEach(function(sub, idx) {
    if(idx === 0) {
      sub.classList.remove('hide'); // '신규 기능'만 펼침
    } else {
      sub.classList.add('hide'); // 나머지는 접음
    }
  });

  document.querySelectorAll('.menu-main').forEach(function(mainBtn) {
    mainBtn.addEventListener('click', function(e) {
      // 화살표 span
      const arrow = mainBtn.querySelector('.arrow');
      // 바로 다음 .menu-sub
      const subMenu = mainBtn.parentElement.querySelector('.menu-sub');
      if (subMenu) {
        const isOpen = !subMenu.classList.contains('hide');
        if (isOpen) {
          subMenu.classList.add('hide');
          arrow.style.transform = 'rotate(-90deg)';
        } else {
          subMenu.classList.remove('hide');
          arrow.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  // 햄버거 메뉴/오버레이 사이드바
  const hamburger = document.getElementById('hamburger-menu');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  function openSidebar() {
    sidebar.classList.add('sidebar-mobile', 'open');
    overlay.style.display = 'block';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
  }
  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
  }
  // 태블릿 이하에서만 햄버거 보이게
  function handleResize() {
    if (!hamburger || !sidebar || !overlay) return;
    if (window.innerWidth <= 1024) {
      hamburger.style.display = 'inline-flex';
      sidebar.classList.add('sidebar-mobile');
    } else {
      hamburger.style.display = 'none';
      sidebar.classList.remove('sidebar-mobile', 'open');
      overlay.style.display = 'none';
    }
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  document.querySelectorAll('.reward-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      // 아래 코드는 일단 주석처리
      // const modal = document.getElementById('exchange-modal');
      // if (!modal) {
      //   console.log('모달이 DOM에 없음');
      //   return;
      // }
      // if (e.target.closest('.reward-buy-btn')) return;
      // const title = card.querySelector('.reward-title')?.textContent || '';
      // const amount = (card.querySelector('.reward-amount-band') || card.querySelector('.reward-amount'))?.textContent || '';
      // document.getElementById('exchange-modal-title').textContent = title;
      // document.getElementById('exchange-modal-amount').textContent = amount;
      // modal.style.display = 'flex';
      // console.log('모달 display set to flex');
    });
  });

  var ctx = document.getElementById('weeklyClapChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금'],
        datasets: [
          {
            label: '받은 인정',
            data: [1, 2, 0, 3, 1],
            backgroundColor: 'rgba(37, 99, 235, 0.75)',
            borderRadius: 12,
            borderSkipped: false,
            maxBarThickness: 28,
            hoverBackgroundColor: 'rgba(37, 99, 235, 1)'
          },
          {
            label: '보낸 인정',
            data: [0, 1, 1, 0, 1],
            backgroundColor: 'rgba(176, 184, 193, 0.55)',
            borderRadius: 12,
            borderSkipped: false,
            maxBarThickness: 28,
            hoverBackgroundColor: 'rgba(176, 184, 193, 0.85)'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              font: { family: 'Pretendard', size: 13, weight: 600 },
              color: '#888',
              boxWidth: 14,
              boxHeight: 14,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#2563eb',
            borderWidth: 1.2,
            padding: 10,
            caretSize: 6,
            cornerRadius: 8,
            titleFont: { family: 'Pretendard', weight: 700 },
            bodyFont: { family: 'Pretendard', weight: 500 }
          }
        },
        scales: {
          x: {
            grid: { display: false, drawBorder: false },
            border: { display: false },
            ticks: {
              color: '#b0b8c1', font: { family: 'Pretendard', size: 13 },
              display: true // 요일만 보이게
            }
          },
          y: {
            grid: { display: false, drawBorder: false },
            border: { display: false },
            min: 0,
            ticks: { display: false }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 900, easing: 'easeOutQuart' },
        layout: { padding: { top: 8, bottom: 0, left: 0, right: 0 } }
      }
    });
  }

  // Clap 작성 모달 동작 (테스트용: F2 누르면 열림)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F2') {
      document.getElementById('clapModal').style.display = 'flex';
    }
  });
  // 상단 박수 아이콘 클릭 시 모달 열기
  document.querySelectorAll('.topbar-icon .clap-svg-icon').forEach(function(img) {
    img.addEventListener('click', function(e) {
      document.getElementById('clapModal').style.display = 'flex';
      e.stopPropagation();
    });
  });
  function closeClapModal() {
    document.getElementById('clapModal').style.display = 'none';
  }
  document.querySelectorAll('.clap-modal-close, .clap-modal-cancel, .clap-modal-overlay').forEach(function(btn) {
    btn.addEventListener('click', closeClapModal);
  });
  document.querySelector('.clap-modal-submit').addEventListener('click', function() {
    alert('Clap이 전송되었습니다!');
    closeClapModal();
  });

  document.querySelectorAll('.clap-btn-edit').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = btn.closest('.clap-item');
      document.getElementById('clapModal').style.display = 'flex';
      // 값 세팅
      document.querySelector('#clapModal select').value = item.dataset.name;
      document.querySelectorAll('#clapModal select')[1].value = item.dataset.team;
      document.querySelector('.clap-modal-keyword').value = item.dataset.keywords;
      document.querySelector('.clap-modal-textarea').value = item.dataset.message;
    });
  });
}); 