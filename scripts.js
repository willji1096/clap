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

  // 주간 클랩 차트
  const ctx = document.getElementById('weeklyClapChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금'],
        datasets: [
          {
          label: '받은 클랩 한줄평',
          data: [2, 3, 1, 4, 2],
          backgroundColor: '#4F8CFF',
          borderRadius: 20,
            borderSkipped: false,
          maxBarThickness: 12,
          barPercentage: 0.7
          },
          {
          label: '보낸 클랩 한줄평',
          data: [1, 3, 2, 3, 2],
          backgroundColor: '#E2E8F0',
          borderRadius: 20,
            borderSkipped: false,
          maxBarThickness: 12,
          barPercentage: 0.7
          }
        ]
      },
      options: {
      responsive: true,
      maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          align: 'center',
            labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
            boxWidth: 6,
            boxHeight: 6,
            font: {
              family: 'Pretendard',
              size: 13
            }
          }
          }
        },
        scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false
          },
            ticks: {
            stepSize: 1
            }
          },
        x: {
          grid: {
            display: false
          }
        }
      }
          }
  });

  // 모달 관련 모든 이벤트 핸들러
  function openClapModal() {
    document.getElementById('clapModal').style.display = 'flex';
  }

  function closeClapModal() {
    document.getElementById('clapModal').style.display = 'none';
    }

  // 모달 열기 트리거들
  // 1. 상단 박수 아이콘
  document.querySelectorAll('.topbar-icon .clap-svg-icon').forEach(function(img) {
    img.addEventListener('click', function(e) {
      openClapModal();
      e.stopPropagation();
    });
  });

  // 2. 상단 '클랩 한줄평 보내기' 버튼
  var sendClapBtn = document.querySelector('.reward-tabs .clap-btn-reply');
  if (sendClapBtn) {
    sendClapBtn.addEventListener('click', function() {
      console.log('클랩 한줄평 보내기 버튼 클릭됨');
      openClapModal();
  });
  }

  // 3. 받은 클랩의 '감사 답장' 버튼 (이벤트 위임)
  var receivedList = document.querySelector('.clap-list[data-tab="received"]');
  if (receivedList) {
    receivedList.addEventListener('click', function(e) {
      var btn = e.target.closest('.clap-btn-reply');
      if (btn) {
        console.log('감사 답장 버튼 클릭됨');
        openClapModal();
      }
  });
  }

  // 4. 보낸 클랩의 '수정' 버튼
  document.querySelectorAll('.clap-btn-edit').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = btn.closest('.clap-item');
      openClapModal();
      // 값 세팅
      document.querySelector('#clapModal select').value = item.dataset.name;
      document.querySelectorAll('#clapModal select')[1].value = item.dataset.team;
      document.querySelector('.clap-modal-keyword').value = item.dataset.keywords;
      document.querySelector('.clap-modal-textarea').value = item.dataset.message;
    });
  });

  // 모달 닫기
  document.querySelectorAll('.clap-modal-close, .clap-modal-cancel, .clap-modal-overlay').forEach(function(btn) {
    btn.addEventListener('click', closeClapModal);
  });

  // 모달 전송
  document.querySelector('.clap-modal-submit').addEventListener('click', function() {
    alert('Clap이 전송되었습니다!');
    closeClapModal();
  });

  // 테스트용: F2 누르면 모달 열기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F2') {
      openClapModal();
    }
  });

  // 멤버 프로필 모달 관련 코드
  const memberModal = document.getElementById('memberModal');
  const memberProfileImg = memberModal.querySelector('.member-profile-img');
  const memberName = memberModal.querySelector('.member-name');
  const memberRole = memberModal.querySelector('.member-role');
  const memberClapCount = memberModal.querySelector('.clap-count');
  const historyList = memberModal.querySelector('.history-list');

  // 더미 클랩 히스토리 데이터
  const dummyHistories = {
    1: [ // 이수진
      { from: '김태현', role: '운영팀 · 매니저', message: '디자인 시스템 개선 제안 감사합니다!', time: '방금 전' },
      { from: '박민지', role: '기획팀 · PM', message: 'UI 개선 아이디어 정말 좋았어요.', time: '3일 전' },
      { from: '정태우', role: '개발팀 · 백엔드', message: '협업하기 정말 좋은 동료예요.', time: '4일 전' },
      { from: '한승민', role: '운영팀 · 시니어', message: '새로운 기능 제안 감사합니다.', time: '5일 전' },
      { from: '임수진', role: '디자인팀 · 주니어', message: '멘토링 감사합니다!', time: '1주일 전' }
    ],
    2: [ // 박지훈
      { from: '이준호', role: '개발팀 · 프론트엔드', message: '버그 빠르게 잡아주셔서 감사해요!', time: '5분 전' },
      { from: '김서연', role: '디자인팀 · 시니어', message: '코드 리뷰 꼼꼼하게 해주셔서 감사해요!', time: '1일 전' },
      { from: '최유진', role: '마케팅팀 · 매니저', message: '기술 문서 작성 감사합니다.', time: '2일 전' },
      { from: '강동현', role: '개발팀 · 인턴', message: '개발 가이드 작성 감사합니다.', time: '3일 전' }
    ],
    3: [ // 최민수
      { from: '송지원', role: '기획팀 · 주니어', message: '테스트 케이스 꼼꼼하게 작성해주셔서 감사합니다.', time: '30분 전' },
      { from: '오현우', role: 'QA · 시니어', message: '품질 개선에 많은 도움을 주셨어요.', time: '1일 전' },
      { from: '윤서아', role: '마케팅팀 · 주니어', message: '버그 리포트 감사합니다.', time: '2일 전' }
    ],
    4: [ // 김하늘
      { from: '장민석', role: '운영팀 · 매니저', message: '캠페인 결과가 정말 좋았어요!', time: '1시간 전' },
      { from: '이소정', role: '디자인팀 · 시니어', message: '마케팅 전략 수립 감사합니다.', time: '2일 전' },
      { from: '한지민', role: '기획팀 · PM', message: '데이터 분석 리포트 감사해요.', time: '3일 전' }
    ],
    5: [ // 이정훈
      { from: '김민준', role: '개발팀 · 시니어', message: '긴급 이슈 해결 감사합니다!', time: '2시간 전' },
      { from: '박서연', role: 'QA · 매니저', message: '시스템 안정화에 기여해주셔서 감사해요.', time: '1일 전' }
    ],
    6: [ // 정유진
      { from: '이현우', role: '기획팀 · 시니어', message: '새로운 플로우 제안 감사합니다.', time: '3시간 전' },
      { from: '최지아', role: '디자인팀 · 주니어', message: '기획 문서 작성 감사해요.', time: '2일 전' },
      { from: '강민호', role: '개발팀 · 백엔드', message: '요구사항 정리 감사합니다.', time: '4일 전' }
    ],
    7: [ // 한지훈
      { from: '박준영', role: '개발팀 · 프론트엔드', message: 'API 문서화 감사합니다!', time: '4시간 전' },
      { from: '김다은', role: 'QA · 주니어', message: '테스트 환경 구축 감사해요.', time: '2일 전' }
    ],
    8: [ // 오지은
      { from: '이승현', role: '개발팀 · 시니어', message: '테스트 자동화 도입 제안 감사합니다!', time: '5시간 전' },
      { from: '최준호', role: 'QA · 매니저', message: '품질 개선 아이디어 감사해요.', time: '3일 전' }
    ],
    9: [ // 김태현
      { from: '박소영', role: '운영팀 · 주니어', message: '팀 분위기 개선 감사합니다!', time: '6시간 전' },
      { from: '정민우', role: '기획팀 · PM', message: '협업 문화 개선 감사해요.', time: '2일 전' }
    ],
    10: [ // 박지수
      { from: '김현지', role: '마케팅팀 · 시니어', message: 'SNS 홍보 전략 감사합니다!', time: '7시간 전' },
      { from: '이동훈', role: '디자인팀 · 매니저', message: '콘텐츠 기획 감사해요.', time: '3일 전' }
    ]
  };

  function openMemberModal(memberId, name, role, clapCount, imgSrc) {
    memberProfileImg.src = imgSrc;
    memberName.textContent = name;
    memberRole.textContent = role;
    memberClapCount.textContent = clapCount;
    
    // 클랩 히스토리 렌더링
    historyList.innerHTML = '';
    const histories = dummyHistories[memberId] || [];
    histories.forEach(history => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-meta">
          <span>${history.from} · ${history.role}</span>
          <span>${history.time}</span>
        </div>
        <div class="history-message">${history.message}</div>
      `;
      historyList.appendChild(historyItem);
    });

    memberModal.style.display = 'flex';
  }

  function closeMemberModal() {
    memberModal.style.display = 'none';
  }

  // 프로필 이미지 클릭 이벤트
  document.querySelectorAll('.right-profile-img-wrap').forEach(profile => {
    profile.addEventListener('click', function() {
      const memberId = this.dataset.memberId;
      const name = this.dataset.name;
      const role = this.dataset.role;
      const clapCount = this.dataset.clapCount;
      const imgSrc = this.querySelector('img').src;
      openMemberModal(memberId, name, role, clapCount, imgSrc);
    });
  });

  // 모달 닫기 이벤트
  memberModal.querySelector('.clap-modal-close').addEventListener('click', closeMemberModal);
  memberModal.querySelector('.clap-modal-overlay').addEventListener('click', closeMemberModal);
}); 