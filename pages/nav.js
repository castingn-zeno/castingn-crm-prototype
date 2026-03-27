// CastingN CRM - 공통 네비게이션 주입 스크립트
// 모든 페이지에서 <script src="nav.js"></script> 로 로드하면 사이드바가 자동 삽입됨

(function(){
  // iframe 내에서 로드된 경우 사이드바 주입 스킵
  if (window.parent !== window) return;

  const current = location.pathname.split('/').pop();

  const menuItems = [
    { section: '분석' },
    { label: '대시보드 - 마케팅', icon: 'bar-chart', href: 'dashboard-marketing.html' },
    { label: '대시보드 - 세일즈', icon: 'trending-up', href: 'dashboard-sales.html' },
    { label: '대시보드 - 경영진', icon: 'award', href: 'dashboard-exec.html' },
    { section: '마케팅' },
    { label: '리드', icon: 'users', href: 'lead-list.html' },
    { label: '웹 폼', icon: 'file-text', href: 'webform.html' },
    { section: '세일즈' },
    { label: '딜 파이프라인', icon: 'columns', href: 'deal-pipeline.html' },
    { label: '견적서', icon: 'file', href: 'quote.html' },
    { section: '연락처' },
    { label: '고객', icon: 'user', href: 'contact-list.html' },
    { label: '회사', icon: 'briefcase', href: 'company-list.html' },
    { section: '자동화' },
    { label: '시퀀스', icon: 'repeat', href: 'sequence.html' },
    { label: '워크플로우', icon: 'activity', href: 'workflow.html' },
    { section: '커뮤니케이션' },
    { label: '이메일', icon: 'mail', href: 'email.html' },
    { section: '설정' },
    { label: '오브젝트 관리', icon: 'settings', href: 'settings.html' },
    { label: '레이아웃 (Shell)', icon: 'layout', href: 'shell.html' },
  ];

  const icons = {
    'bar-chart': '<path d="M18 20V10M12 20V4M6 20v-6"/>',
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>',
    'award': '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    'users': '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>',
    'file-text': '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    'columns': '<path d="M12 3h7a2 2 0 012 2v14a2 2 0 01-2 2h-7m0-18H5a2 2 0 00-2 2v14a2 2 0 002 2h7m0-18v18"/>',
    'file': '<path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/>',
    'user': '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>',
    'repeat': '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>',
    'activity': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    'mail': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
    'layout': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  };

  function svgIcon(name) {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name]||''}</svg>`;
  }

  // Build sidebar HTML
  let html = `
  <div id="crm-nav-sidebar" style="
    position:fixed;left:0;top:0;bottom:0;width:220px;background:#1A2332;color:#fff;
    font-family:system-ui,-apple-system,sans-serif;overflow-y:auto;z-index:9999;
    display:flex;flex-direction:column;
  ">
    <a href="deal-pipeline.html" style="text-decoration:none;display:flex;align-items:center;gap:10px;padding:16px;border-bottom:1px solid rgba(255,255,255,.08)">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      <div><div style="font-size:14px;font-weight:700;color:#fff">업무마켓9</div><div style="font-size:10px;color:#64748B">CRM Prototype</div></div>
    </a>
    <div style="flex:1;padding:8px 0">`;

  menuItems.forEach(item => {
    if (item.section) {
      html += `<div style="padding:14px 16px 4px;font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:#64748B;font-weight:600">${item.section}</div>`;
    } else {
      const isActive = current === item.href;
      const bg = isActive ? 'rgba(8,145,178,.15)' : 'transparent';
      const color = isActive ? '#06B6D4' : 'rgba(255,255,255,.65)';
      const border = isActive ? '3px solid #0891B2' : '3px solid transparent';
      html += `<a href="${item.href}" style="
        display:flex;align-items:center;gap:9px;padding:8px 14px;
        text-decoration:none;font-size:12.5px;color:${color};
        background:${bg};border-left:${border};transition:all .15s;
      " onmouseover="this.style.background='rgba(255,255,255,.05)';this.style.color='#fff'"
         onmouseout="this.style.background='${bg}';this.style.color='${color}'"
      >${svgIcon(item.icon)}<span>${item.label}</span></a>`;
    }
  });

  html += `</div>
    <div style="padding:12px 16px;border-top:1px solid rgba(255,255,255,.08);font-size:10px;color:#64748B">
      CastingN CRM Proto v1.0
    </div>
  </div>`;

  // Inject sidebar
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.prepend(container.firstElementChild);

  // Push existing content to the right
  document.body.style.marginLeft = '220px';
  document.body.style.minHeight = '100vh';
})();
