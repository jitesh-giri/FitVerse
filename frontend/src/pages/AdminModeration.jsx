import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialReports = [
  {
    id: 1,
    type: 'Spam / Scams',
    typeClass: 'bg-error-container text-on-error-container',
    borderClass: 'border-error',
    reports: 'Reported by 12 users',
    time: '10 mins ago',
    author: '@crypto_bro_99',
    content:
      '"Guaranteed 50lbs muscle gain in 3 days with this one weird supplement! DM me for the link! 🚀💪💸"',
  },
  {
    id: 2,
    type: 'Harassment',
    typeClass: 'bg-tertiary-container text-on-tertiary-container',
    borderClass: 'border-tertiary',
    reports: 'Reported by 3 users',
    time: '1 hour ago',
    author: '@iron_lifter_x',
    content:
      '"Wow, you call that a squat? Pathetic depth. Why even bother coming to the gym if you\'re just going to half-rep it."',
  },
  {
    id: 3,
    type: 'Off-Topic',
    typeClass: 'bg-surface-variant text-on-surface-variant',
    borderClass: 'border-outline-variant',
    reports: 'Reported by 1 user',
    time: '3 hours ago',
    author: '@baking_enthusiast',
    content:
      '"Hey guys, not fitness related but does anyone have a good recipe for double chocolate brownies? Asking for a friend."',
  },
];

export default function AdminModeration() {
  const [reports, setReports] = useState(initialReports);
  const [activeTab, setActiveTab] = useState('flagged');
  const [filterType, setFilterType] = useState('all');
  const [actionNotice, setActionNotice] = useState('');

  const handleDelete = (id, author) => {
    setReports(reports.filter((r) => r.id !== id));
    setActionNotice(`Post by ${author} was deleted and user flagged.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleIgnore = (id, author) => {
    setReports(reports.filter((r) => r.id !== id));
    setActionNotice(`Report on ${author} ignored and cleared from queue.`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleRefresh = () => {
    setReports(initialReports);
    setActionNotice('Moderation queue refreshed.');
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filteredReports =
    filterType === 'all'
      ? reports
      : reports.filter((r) => r.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body selection:bg-primary selection:text-on-primary">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-surface-container-high border-b border-surface-variant px-4 md:px-12 py-3 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary text-on-primary rounded-full font-headline text-[10px] uppercase font-bold tracking-widest">
            FitVerse Security
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            AI Automated Trust & Safety Shield
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary font-headline font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          System Live
        </div>
      </div>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Navigation Drawer */}
        <nav className="hidden md:flex h-fit w-72 rounded-2xl bg-surface-container-high shadow-2xl flex-col p-6 my-8 shrink-0 border border-surface-variant sticky top-28">
          <div className="mb-8">
            <span className="font-headline text-xs text-on-surface-variant uppercase tracking-widest font-extrabold">
              Moderation Console
            </span>
          </div>
          <ul className="flex flex-col gap-2 font-body text-base">
            <li>
              <button
                onClick={() => setActiveTab('flagged')}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 w-full text-left font-bold ${
                  activeTab === 'flagged'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined icon-fill">flag</span>
                <span>Flagged Content</span>
                <span className="ml-auto bg-error text-on-error text-xs px-2 py-0.5 rounded-full font-black">
                  {reports.length}
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('banned')}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 w-full text-left font-medium ${
                  activeTab === 'banned'
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined">group_remove</span>
                <span>Banned Users</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('audit')}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 w-full text-left font-medium ${
                  activeTab === 'audit'
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined">gavel</span>
                <span>Audit Logs</span>
              </button>
            </li>
          </ul>

          <div className="mt-12 pt-6 border-t border-surface-variant">
            <h4 className="text-xs text-on-surface-variant font-headline uppercase font-bold mb-2">
              Queue Health
            </h4>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[85%]"></div>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2 font-body">85% cleared within SLA</p>
          </div>
        </nav>

        {/* Main Canvas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {actionNotice && (
            <div className="mb-6 p-4 bg-surface-container-high border border-primary text-primary rounded-xl text-sm font-medium flex items-center gap-3 animate-fadeIn">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              {actionNotice}
            </div>
          )}

          {activeTab === 'flagged' && (
            <>
              <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                  <h1 className="font-headline text-3xl md:text-4xl font-extrabold mb-2 text-on-surface">
                    Flagged Posts
                  </h1>
                  <p className="font-body text-sm md:text-base text-on-surface-variant">
                    Review and moderate community reports. High priority items are listed first.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border-2 border-outline-variant bg-surface-container rounded-lg text-on-surface hover:border-primary transition-colors text-xs font-bold uppercase tracking-wider outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="spam">Spam / Scams</option>
                    <option value="harassment">Harassment</option>
                    <option value="off-topic">Off-Topic</option>
                  </select>
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-surface-variant rounded-lg text-on-surface hover:bg-surface-container-highest transition-colors font-headline text-xs uppercase font-bold"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* List Container */}
              <div className="flex flex-col gap-4">
                {filteredReports.length === 0 ? (
                  <div className="p-12 text-center bg-surface-container rounded-2xl border-[8px] border-surface-variant">
                    <span className="material-symbols-outlined text-5xl text-primary mb-3">
                      task_alt
                    </span>
                    <h3 className="font-headline text-xl font-bold text-on-surface">
                      Moderation Queue Clean
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-1">
                      No reported content requires review at this time.
                    </p>
                    <button
                      onClick={handleRefresh}
                      className="mt-4 px-5 py-2.5 bg-primary text-on-primary rounded-lg font-headline text-xs font-bold uppercase"
                    >
                      Reload Reports
                    </button>
                  </div>
                ) : (
                  filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className={`bg-surface-container border-l-[8px] ${report.borderClass} rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:bg-surface-container-high transition-colors shadow-lg`}
                    >
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 ${report.typeClass} font-headline text-[10px] uppercase font-bold tracking-wider rounded-md`}
                          >
                            {report.type}
                          </span>
                          <span className="font-body text-xs text-on-surface-variant">{report.reports}</span>
                          <span className="font-body text-xs text-on-surface-variant">• {report.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                          <span className="font-headline text-sm font-bold text-primary">{report.author}</span>
                        </div>
                        <p className="font-body text-sm md:text-base mt-1 text-on-surface leading-relaxed italic bg-surface-container-lowest/60 p-3 rounded-lg">
                          {report.content}
                        </p>
                      </div>

                      <div className="flex flex-row md:flex-col gap-3 justify-end items-end shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-6 min-w-[160px]">
                        <button
                          onClick={() => handleDelete(report.id, report.author)}
                          className="flex items-center justify-center gap-2 px-5 py-3 bg-error text-on-error rounded-xl font-headline text-xs uppercase font-bold hover:opacity-90 transition-opacity w-full shadow-md"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                          Delete Post
                        </button>
                        <button
                          onClick={() => handleIgnore(report.id, report.author)}
                          className="flex items-center justify-center gap-2 px-5 py-3 border border-outline-variant text-on-surface-variant rounded-xl font-headline text-xs uppercase font-bold hover:border-on-surface hover:text-on-surface transition-colors w-full"
                        >
                          <span className="material-symbols-outlined text-base">check</span>
                          Ignore
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === 'banned' && (
            <div className="bg-surface-container p-8 rounded-2xl border-[8px] border-surface-variant">
              <h2 className="font-headline text-2xl font-bold mb-4">Banned Accounts</h2>
              <div className="space-y-3">
                {['@bot_spammer_01', '@scam_seller_99', '@toxic_troll_4'].map((user, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-surface rounded-xl">
                    <span className="font-headline text-sm font-bold text-error">{user}</span>
                    <span className="text-xs text-on-surface-variant">Permanent Shadowban</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="bg-surface-container p-8 rounded-2xl border-[8px] border-surface-variant">
              <h2 className="font-headline text-2xl font-bold mb-4">Safety Audit Logs</h2>
              <div className="space-y-3 font-mono text-xs text-on-surface-variant">
                <div className="p-3 bg-surface rounded-lg">[2026-08-16 04:50] Auto-shield flagged spam batch (14 entities).</div>
                <div className="p-3 bg-surface rounded-lg">[2026-08-16 03:12] Moderator Alex V. dismissed false positive on #Powerlifting.</div>
                <div className="p-3 bg-surface rounded-lg">[2026-08-16 01:00] Daily biometrics integrity verification passed.</div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t-8 border-surface-variant py-8 px-4 md:px-12 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          <span className="font-headline text-lg font-bold text-primary">FitVerse Moderator Console</span>
          <span className="text-xs text-on-surface-variant font-body">Internal Authorization Level 3 Required</span>
        </div>
      </footer>
    </div>
  );
}
