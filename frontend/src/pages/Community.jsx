import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialPosts = [
  {
    id: 1,
    author: 'IronJunkie99',
    time: '2 hours ago',
    tag: '#Powerlifting',
    title: 'Finally hit the 405lb deadlift! 🚀',
    content:
      'Been grinding for 6 months to break this plateau. Form broke down a bit at the top, but we take those. Next stop 450.',
    avatar: '/images/hero/hero-1.jpg',
    image: '/images/hero/hero-2.jpg',
    upvotes: 342,
    comments: 45,
    userVote: null,
  },
  {
    id: 2,
    author: 'CardioQueen',
    time: '5 hours ago',
    tag: '#Endurance',
    title: 'Zone 2 Training: My 8-week results',
    content:
      'I committed to strict Zone 2 cardio (keeping HR around 135bpm) for the last two months. Dropped my average pace by 45 seconds/mile while keeping the same heart rate. The boring stuff works.',
    avatar: '/images/hero/hero-3.jpg',
    metrics: [
      { label: 'Avg Pace', val: '8:15 /mi', color: 'gradient-text' },
      { label: 'Avg HR', val: '134 bpm', color: 'text-primary' },
    ],
    upvotes: 891,
    comments: 112,
    userVote: 'up',
  },
];

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [selectedHub, setSelectedHub] = useState('All');
  const [flaggedPosts, setFlaggedPosts] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'Alex V.',
      time: 'Just now',
      tag: selectedHub === 'All' ? '#Community' : selectedHub,
      title: 'Workout Progress Update 🔥',
      content: newPostText.trim(),
      avatar: '/images/hero/hero-1.jpg',
      image: '/images/hero/hero-4.jpg',
      upvotes: 1,
      comments: 0,
      userVote: 'up',
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleVote = (id, type) => {
    setPosts(
      posts.map((post) => {
        if (post.id !== id) return post;
        let delta = 0;
        let nextVote = null;
        if (post.userVote === type) {
          delta = type === 'up' ? -1 : 1;
          nextVote = null;
        } else if (post.userVote === null) {
          delta = type === 'up' ? 1 : -1;
          nextVote = type;
        } else {
          delta = type === 'up' ? 2 : -2;
          nextVote = type;
        }
        return {
          ...post,
          upvotes: post.upvotes + delta,
          userVote: nextVote,
        };
      })
    );
  };

  const handleFlag = (id) => {
    setFlaggedPosts({
      ...flaggedPosts,
      [id]: true,
    });
  };

  return (
    <div className="text-on-background min-h-screen flex flex-col font-body selection:bg-primary selection:text-on-primary">
      {/* Hero-style Header Section */}
      <header className="mb-4 text-left w-full max-w-7xl mx-auto px-4 md:px-12 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-headline font-semibold text-primary mb-4 shadow-sm w-fit">
          <span className="material-symbols-outlined text-sm text-primary">groups</span>
          GLOBAL ATHLETE FEED • 24.8K ACTIVE
        </div>
        <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-on-background leading-[1.08] tracking-tight">
          <span className="gradient-text uppercase">CONNECT</span>
          <span className="text-white ml-2 sm:ml-3">With The Tribe</span>
        </h1>
        <p className="font-body text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
          Share PRs, exchange data-backed strategies, and evolve alongside driven athletes worldwide.
        </p>
      </header>

      {/* Main Canvas */}
      <div className="flex-grow flex justify-center w-full px-4 md:px-12 py-8 relative z-10 max-w-7xl mx-auto">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden xl:block w-64 shrink-0 mr-10 sticky top-28 h-fit">
          <div className="space-y-6">
            {/* Community Hubs */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 shadow-2xl">
              <h2 className="font-headline text-xl font-black text-primary mb-4">FitVerse Hubs</h2>
              <div className="flex flex-col gap-2">
                {['All', '#Powerlifting', '#NutritionHacks', '#MarathonPrep'].map((hub) => (
                  <button
                    key={hub}
                    onClick={() => setSelectedHub(hub)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all duration-150 ease-out cursor-pointer ${
                      selectedHub === hub
                        ? 'bg-white/15 text-white font-bold shadow-sm'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{hub}</span>
                    {hub !== 'All' && (
                      <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white/60">
                        {hub === '#Powerlifting' ? '2.4k' : hub === '#NutritionHacks' ? '1.8k' : '940'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-lg">
              <h3 className="font-headline text-xs font-bold text-white mb-3 uppercase tracking-wider">
                Community Guidelines
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Respect, discipline, and data-backed motivation. No spam or commercial solicitations.
              </p>
            </div>
          </div>
        </aside>

        {/* Feed Center */}
        <main className="w-full max-w-2xl flex flex-col gap-8">
          {/* Create Post */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-5 flex gap-4 items-center shadow-2xl">
            <img
              className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
              alt="User avatar"
              src="/images/hero/hero-1.jpg"
            />
            <form onSubmit={handleCreatePost} className="flex-grow flex gap-3">
              <input
                className="flex-grow bg-white/5 border border-white/15 focus:border-primary text-white p-3.5 transition-all outline-none rounded-full text-sm placeholder-white/40"
                placeholder="Share your progress or PR..."
                type="text"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />
              <button
                type="submit"
                className="px-5 py-3.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] hover:brightness-110 active:scale-95 transition-all shrink-0 flex items-center justify-center cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-lg font-bold">send</span>
              </button>
            </form>
          </div>

          {/* Posts Feed */}
          <div key={selectedHub} className="flex flex-col gap-8 tab-transition">
            {posts
              .filter((p) => selectedHub === 'All' || p.tag === selectedHub)
              .map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 relative group overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                          alt={post.author}
                          src={post.avatar}
                        />
                        <div>
                          <h4 className="font-headline text-sm font-bold text-white">{post.author}</h4>
                          <p className="text-xs text-white/60">
                            {post.time} • <span className="text-primary font-medium">{post.tag}</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFlag(post.id)}
                        className="text-white/50 hover:text-error opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                        title="Report to Moderator"
                      >
                        <span className={`material-symbols-outlined text-sm ${flaggedPosts[post.id] ? 'text-error' : ''}`}>
                          flag
                        </span>
                      </button>
                    </div>

                    {flaggedPosts[post.id] && (
                      <div className="mb-3 px-3 py-1.5 bg-error-container/40 border border-error/50 rounded-lg text-xs text-error font-medium">
                        Report submitted to moderation queue.
                      </div>
                    )}

                    <h3 className="font-headline text-lg md:text-xl font-bold mb-2 text-white">{post.title}</h3>
                    <p className="font-body text-sm md:text-base text-white/75 mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <div className="w-full aspect-video rounded-xl relative border border-white/10 overflow-hidden shadow-md">
                        <img
                          className="w-full h-full object-cover"
                          alt={post.title}
                          src={post.image}
                        />
                      </div>
                    )}

                    {/* Post Metrics if present */}
                    {post.metrics && (
                      <div className="w-full bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col gap-3">
                        {post.metrics.map((m, idx) => (
                          <div key={idx} className="flex justify-between items-end border-b border-white/10 pb-2">
                            <span className="text-xs text-white/70 font-medium">{m.label}</span>
                            <span className={`font-headline text-lg font-bold ${m.color}`}>{m.val}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interaction Bar */}
                  <div className="bg-white/5 px-6 py-3 flex justify-between items-center border-t border-white/10">
                    <div className="flex gap-1 bg-white/10 rounded-full border border-white/10 items-center">
                      <button
                        onClick={() => handleVote(post.id, 'up')}
                        className={`p-2 rounded-l-full flex items-center transition-colors cursor-pointer ${
                          post.userVote === 'up'
                            ? 'text-primary bg-primary/20 font-bold'
                            : 'text-white/70 hover:text-primary hover:bg-white/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                      </button>
                      <span className="font-headline text-xs font-black px-2 py-1 flex items-center text-white">
                        {post.upvotes}
                      </span>
                      <button
                        onClick={() => handleVote(post.id, 'down')}
                        className={`p-2 rounded-r-full flex items-center transition-colors cursor-pointer ${
                          post.userVote === 'down'
                            ? 'text-error bg-error/20 font-bold'
                            : 'text-white/70 hover:text-error hover:bg-white/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      </button>
                    </div>

                    <button className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-xs font-semibold cursor-pointer">
                      <span className="material-symbols-outlined text-base">chat_bubble</span>
                      <span>{post.comments} Comments</span>
                    </button>

                    <button className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-xs font-semibold cursor-pointer">
                      <span className="material-symbols-outlined text-base">share</span>
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </main>

        {/* Right Sidebar (Desktop Stats) */}
        <aside className="hidden lg:block w-72 shrink-0 ml-10 sticky top-28 h-fit">
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 mb-6 shadow-2xl">
            <h3 className="font-headline text-base font-bold mb-1 text-white">Your Weekly Stats</h3>
            <p className="text-xs text-white/60 mb-4">Goal: 5 Sessions / Week</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 text-white/70 font-medium">
                  <span>Workouts</span>
                  <span className="text-primary font-bold">4 / 5</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#adc6ff] to-[#ffb595] h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5 text-white/70 font-medium">
                  <span>Active Minutes</span>
                  <span className="text-tertiary font-bold">320m</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 text-primary font-headline text-xs flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-10 w-full mt-auto">
        <div className="font-headline text-xl font-bold text-primary mb-4 md:mb-0">FitVerse</div>
        <nav className="flex flex-wrap justify-center gap-6 font-headline text-xs uppercase font-bold text-white/60">
          <Link to="/onboarding" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/onboarding" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
          <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
        </nav>
        <div className="text-white/40 font-headline text-[10px] uppercase tracking-widest mt-4 md:mt-0">
          © {new Date().getFullYear()} FitVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
