"use client";

import { useState } from "react";

type GeneratedContent = {
  post: string;
  hashtags: string[];
  hooks: string[];
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [style, setStyle] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState("");

  const parseAIResponse = (text: string): GeneratedContent => {
    const clean = text.replace(/\r/g, "").trim();

    const postMatch = clean.match(
      /POST\s*([\s\S]*?)(?=\n\s*HASHTAGS\b)/i
    );

    const hashtagsMatch = clean.match(
      /HASHTAGS\s*([\s\S]*?)(?=\n\s*ALTERNATIVE HOOKS\b)/i
    );

    const hooksMatch = clean.match(
      /ALTERNATIVE HOOKS\s*([\s\S]*)$/i
    );

    const post = postMatch?.[1]?.trim() || "";

    const hashtags = hashtagsMatch?.[1]
      ? hashtagsMatch[1]
          .split("\n")
          .map((line) =>
            line
              .replace(/^\s*\d+[\.\):-]?\s*/, "")
              .replace(/^[-•]\s*/, "")
              .trim()
          )
          .filter(Boolean)
      : [];

    const hooks = hooksMatch?.[1]
      ? hooksMatch[1]
          .split("\n")
          .map((line) =>
            line
              .replace(/^\s*\d+[\.\):-]?\s*/, "")
              .replace(/^[-•]\s*/, "")
              .trim()
          )
          .filter(Boolean)
      : [];

    return {
      post,
      hashtags,
      hooks,
    };
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter your post topic.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          details: details.trim(),
          style,
          length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong while generating content."
        );
      }

      if (!data?.result) {
        throw new Error("AI returned an empty result.");
      }

      const generated = parseAIResponse(data.result);

      if (
        !generated.post &&
        generated.hashtags.length === 0 &&
        generated.hooks.length === 0
      ) {
        throw new Error("AI response could not be formatted correctly.");
      }

      setResult(generated);
    } catch (err) {
      console.error("GENERATION ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate LinkedIn content."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;

    const text = [
      "LINKEDIN POST",
      "",
      result.post,
      "",
      "HASHTAGS",
      "",
      ...result.hashtags.map((tag, index) => `${index + 1}. ${tag}`),
      "",
      "ALTERNATIVE HOOKS",
      "",
      ...result.hooks.map((hook, index) => `${index + 1}. ${hook}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied successfully!");
    } catch {
      alert("Unable to copy. Please copy manually.");
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#061b3a] via-[#071225] to-black text-white">

      {/* BACKGROUND GLOWS */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[800px] max-w-[100vw] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[40%] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[55%] h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[140px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-blue-400/10 bg-zinc-950/70 px-4 py-4 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          {/* BRAND */}

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-400/20 bg-white/10">

              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />

            </div>

            <div className="min-w-0">

              <h2 className="truncate text-sm font-bold text-white sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>

            </div>

          </div>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-blue-300"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-blue-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-blue-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-blue-300"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-400 px-5 py-2 font-medium text-black shadow-lg shadow-blue-400/20 transition hover:bg-blue-300"
            >
              Follow
            </a>

          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs text-blue-300 transition hover:bg-blue-400/20 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="relative z-30 mx-4 mt-2 rounded-3xl border border-blue-400/10 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-1">

            {[
              ["#home", "Home"],
              ["#features", "Features"],
              ["#how", "How To Use"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-blue-400/10 hover:text-blue-300"
              >
                {label}
              </a>
            ))}

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-blue-400 px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-blue-300"
            >
              Follow
            </a>

          </div>

        </div>
      )}

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs text-blue-200">
          ✨ AI-Powered LinkedIn Post Generator
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-blue-400">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Create Posts That

          <br />

          <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Get Noticed.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Generate professional LinkedIn posts, engaging hooks and relevant
          hashtags with AI in seconds.
        </p>

        {/* PILLS */}

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            💼 Professional Posts
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            🎯 Engaging Hooks
          </span>

          <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300">
            ⚡ Instant Generation
          </span>

        </div>

        {/* GENERATOR */}

        <div
          id="generator"
          className="mt-12 w-full max-w-4xl"
        >

          <div className="w-full rounded-[2rem] border border-blue-400/10 bg-zinc-950/60 p-4 text-left shadow-2xl shadow-blue-950/30 backdrop-blur-2xl sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              LinkedIn Post Generator
            </p>

            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">
              Turn your idea into a LinkedIn post.
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Add your topic, choose a style and let AI write your content.
            </p>

            <div className="mt-7 space-y-5">

              {/* TOPIC */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Post Topic
                </label>

                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Example: What I learned while building my first AI project..."
                  rows={6}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10 sm:px-5"
                />

              </div>

              {/* DETAILS */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Extra Details{" "}
                  <span className="text-zinc-600">(Optional)</span>
                </label>

                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Your audience, key points, experience, context, etc..."
                  rows={6}
                  className="box-border block w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10 sm:px-5"
                />

              </div>

              {/* STYLE */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Content Style
                </label>

                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="box-border block h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10"
                >
                  <option>Professional</option>
                  <option>Personal</option>
                  <option>Storytelling</option>
                  <option>Thought Leadership</option>
                  <option>Educational</option>
                  <option>Inspirational</option>
                  <option>Casual</option>
                </select>

              </div>

              {/* LENGTH */}

              <div>

                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Post Length
                </label>

                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="box-border block h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>

              </div>

              {/* BUTTON */}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-blue-400 px-5 text-sm font-semibold text-black shadow-xl shadow-blue-400/20 transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "🧠 Creating Your Post..."
                  : "✨ Generate LinkedIn Post"}
              </button>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
                ⚠️ {error}
              </div>
            )}

            {/* RESULT */}

            {result && (
              <div
                id="linkedin-result"
                className="mt-8 rounded-3xl border border-blue-400/10 bg-black/40 p-5 shadow-xl shadow-blue-950/10 sm:p-7"
              >

                {/* HEADER */}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                      AI Generated Result
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      Your LinkedIn Content
                    </h3>

                  </div>

                  <button
                    type="button"
                    onClick={copyResult}
                    className="rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-medium text-blue-300 transition hover:bg-blue-400/20"
                  >
                    📋 Copy All
                  </button>

                </div>

                {/* LINKEDIN POST */}

                <div className="mt-7">

                  <div className="flex items-center gap-2">

                    <span className="text-lg">💼</span>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                      LinkedIn Post
                    </h4>

                  </div>

                  <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/5 bg-zinc-950/70 p-5 text-sm leading-8 text-zinc-200">
                    {result.post || "No LinkedIn post returned."}
                  </div>

                </div>

                {/* HOOKS */}

                <div className="mt-8">

                  <div className="flex items-center gap-2">

                    <span className="text-lg">🎯</span>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                      Alternative Hooks
                    </h4>

                  </div>

                  <div className="mt-4 space-y-3">

                    {result.hooks.length > 0 ? (
                      result.hooks.map((hook, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/5 bg-zinc-950/70 p-4 text-sm leading-7 text-zinc-300"
                        >
                          <span className="mr-3 font-bold text-blue-400">
                            {index + 1}.
                          </span>

                          {hook}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-zinc-500">
                        No alternative hooks returned.
                      </div>
                    )}

                  </div>

                </div>

                {/* HASHTAGS */}

                <div className="mt-8">

                  <div className="flex items-center gap-2">

                    <span className="text-lg">🏷️</span>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                      Hashtags
                    </h4>

                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {result.hashtags.length > 0 ? (
                      result.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-blue-400/10 bg-blue-400/5 px-3 py-2 text-xs text-zinc-300"
                        >
                          {hashtag}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-zinc-500">
                        No hashtags returned.
                      </span>
                    )}

                  </div>

                </div>

              </div>
            )}

            <p className="mt-4 text-xs text-zinc-600">
              AI-generated content should be reviewed and customized before
              publishing.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            What You Get
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Better LinkedIn content, faster.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Create professional and engaging LinkedIn content without staring
            at a blank screen.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="💼"
            title="Professional Posts"
            description="Create polished LinkedIn posts based on your topic and context."
          />

          <FeatureCard
            icon="🎯"
            title="Strong Hooks"
            description="Generate alternative opening hooks to make your post more engaging."
          />

          <FeatureCard
            icon="🏷️"
            title="Relevant Hashtags"
            description="Get relevant hashtags that match the topic of your post."
          />

          <FeatureCard
            icon="📏"
            title="Flexible Length"
            description="Choose between short, medium and long-form LinkedIn posts."
          />

          <FeatureCard
            icon="✨"
            title="Multiple Styles"
            description="Generate professional, personal, educational and storytelling content."
          />

          <FeatureCard
            icon="📋"
            title="Easy To Copy"
            description="Copy the complete generated content instantly."
          />

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            How To Use
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Turn your idea into LinkedIn-ready content.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Add Your Topic"
            description="Tell AI what you want to post about."
          />

          <StepCard
            number="02"
            title="Choose Your Style"
            description="Select your preferred writing style and post length."
          />

          <StepCard
            number="03"
            title="Generate Content"
            description="Get a LinkedIn post, hooks and relevant hashtags."
          />

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="What can this LinkedIn generator create?"
            answer="It creates a LinkedIn post along with alternative hooks and relevant hashtags based on your topic and details."
          />

          <Faq
            question="Can I choose the post length?"
            answer="Yes. You can choose Short, Medium or Long before generating your LinkedIn content."
          />

          <Faq
            question="Can I choose a writing style?"
            answer="Yes. You can choose from Professional, Personal, Storytelling, Thought Leadership, Educational, Inspirational and Casual styles."
          />

          <Faq
            question="Can I publish the generated post directly?"
            answer="You can use the generated content as a starting point, but reviewing and customizing it before publishing is recommended."
          />

        </div>

      </section>

      {/* SIMPLE CTA */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 sm:px-8">

        <div className="rounded-[2rem] border border-blue-400/10 bg-blue-950/20 px-5 py-12 text-center shadow-2xl shadow-blue-950/20">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to create your next post?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Turn your next idea into engaging LinkedIn content with AI.
          </p>

          <a
            href="#generator"
            className="mt-7 inline-flex rounded-2xl bg-blue-400 px-6 py-3 text-sm font-semibold text-black shadow-xl shadow-blue-400/20 transition hover:bg-blue-300"
          >
            ✨ Create Your Post
          </a>

        </div>

      </section>

{/* FOOTER */}

<footer className="relative z-10 border-t border-[#0f9f9c]/10 px-4 py-14">

  <div className="mx-auto w-full max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-12">

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0f9f9c]">
          Explore More
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          More AI Writing Tools
        </h2>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Explore more AI-powered tools to write, improve and manage
          your emails and professional content.
        </p>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* AI EMAIL WRITER */}

        <a
          href="https://aiemailwriter.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✉️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Email Writer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Write clear and professional emails quickly with AI.
          </p>

        </a>

        {/* AI GRAMMAR & WRITING FIXER */}

        <a
          href="https://aigrammarwritingfixer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✍️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Grammar & Writing Fixer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Fix grammar, spelling and improve your writing with AI.
          </p>

        </a>

        {/* AI TEXT HUMANIZER */}

        <a
          href="https://aitexthumanizer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✨
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Text Humanizer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Make AI-generated text sound natural and human.
          </p>

        </a>

        {/* AI COVER LETTER GENERATOR */}

        <a
          href="https://aicoverlettergenerator.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            💼
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Cover Letter Generator
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Create personalized cover letters for your job applications.
          </p>

        </a>

      </div>

    </div>

    {/* FOOTER MAIN */}

    <div className="border-t border-white/5 pt-8">

      <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#0f9f9c]/20">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-white">
              KrishAIWorks
            </p>

            <p className="text-xs text-zinc-600">
              AI Solutions That Work
            </p>

          </div>

        </div>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} KrishAIWorks. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</footer>

    </main>
  );
}

/* FEATURE CARD */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/20 hover:bg-zinc-950/70">

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-400/10 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* STEP CARD */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-6 backdrop-blur-xl">

      <p className="text-sm font-bold text-blue-400">
        {number}
      </p>

      <h3 className="mt-4 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* FAQ */

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/5 bg-zinc-950/50 p-5">

      <summary className="cursor-pointer list-none text-sm font-semibold text-white">
        <div className="flex items-center justify-between gap-4">
          <span>{question}</span>

          <span className="text-blue-400 transition group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}