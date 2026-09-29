"use client";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Sparkles,
  Video,
  Check,
  Star,
  Target,
  Award,
  Lightbulb,
  Heart,
  Zap,
  Brain,
  MessageCircle,
} from "lucide-react";
import styles from "./landing.module.scss";
import { Video_URL } from "@/Constants/host";
import { Card, CardContent } from "../ui/card/Card";
import NavBar from "../NavSection/NavSection";

const path =
  `${Video_URL}Animated_Logo_mystorybank.mp4`;
const homeVideoPath = "/assets/homeVideo.mp4";
const secondVideoPath = "/assets/secondVideo.mp4";
const thirdVideoPath = "/assets/thirdVideo.mp4";

const Landing = () => {
  return (
    <div className={styles.container}>
      <NavBar />

      {/* Hero Section */}
      <section
        id="home"
        className={styles["hero-section"]}
        style={{
          backgroundImage: `url("/assets/hero-background-premium.jpg")`,
        }}
      >
        <div className={styles["hero-overlay"]} />
        <div className={styles["hero-content"]}>
          <h1 className={styles["hero-title"]}>MyStoryBank 2.0</h1>
          <p className={styles["hero-subtitle"]}>
            A curated vault of powerful stories, activities, and AI-generated
            storytelling crafted for speakers, trainers, coaches, and leaders.
          </p>
          <div className={styles["hero-actions"]}>
            <button className={styles["hero-button-primary"]}>Buy Now</button>
            <button className={styles["hero-button-secondary"]}>
              Watch Sample Stories
            </button>
          </div>
        </div>
      </section>

      {/* Why Storytelling Matters */}
      <section className={styles["section-padding"]}>
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["why-storytelling"]}>
            <div className={styles["why-storytelling__image-wrapper"]}>
              <Image
                src="/assets/storytelling-connection.jpg"
                alt="Communication through storytelling"
                width={600}
                height={400}
                className={styles["storytelling-image"]}
              />
            </div>
            <div className={styles["why-storytelling__content"]}>
              <h2 className={styles["section-title"]}>
                Why Storytelling Matters
              </h2>
              <blockquote className={styles.blockquote}>
                "Stories are the single most powerful weapon in a leader's
                arsenal."
              </blockquote>
              <p className={styles["text-muted"]}>
                Great leaders, trainers, and speakers know that stories create
                connection, inspire action, and transform perspectives.
              </p>
              <p className={styles["text-muted"]}>
                MyStoryBank gives you instant access to professionally curated
                stories that resonate with your audience and drive real results.
              </p>
              <button className={styles["button-cta"]}>
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section
        id="stories"
        className={`${styles["section-padding"]} ${styles["section-accent"]}`}
      >
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["text-center"]}>
            <h2 className={styles["section-title-large"]}>
              What You Get Inside MyStoryBank 2.0
            </h2>
            <p className={styles["section-subtitle"]}>
              Everything you need to captivate, inspire, and lead through the
              art of storytelling.
            </p>
          </div>

          {/* Feature 1 */}
          <div className={styles["feature-row"]}>
            <Card className={styles["feature-card"]}>
              <CardContent className={styles["feature-card-content"]}>
                <BookOpen className={styles["feature-icon"]} />
                <h3 className={styles["feature-title"]}>
                  190+ Curated Stories
                </h3>
                <ul className={styles["feature-list"]}>
                  {[
                    "30+ categories covering leadership, motivation, teamwork, and more",
                    "Fully indexed and searchable for instant access",
                    "Ready to use in presentations, workshops, and sermons",
                    "Designed for speakers, trainers, and coaches",
                    "Proven to increase audience engagement and retention",
                  ].map((item, i) => (
                    <li key={i} className={styles["feature-list-item"]}>
                      <Check className={styles["feature-check-icon"]} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div className={styles["feature-image-wrapper"]}>
              <Image
                src="/assets/stories-feature.jpg"
                alt="Curated stories"
                width={700}
                height={450}
                className={styles["feature-image"]}
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className={styles["feature-row-reverse"]}>
            <div className={styles["feature-image-wrapper"]}>
              <Image
                src="/assets/activities-feature.jpg"
                alt="Team-building activities"
                width={700}
                height={450}
                className={styles["feature-image"]}
              />
            </div>
            <Card className={styles["feature-card"]}>
              <CardContent className={styles["feature-card-content"]}>
                <Sparkles className={styles["feature-icon"]} />
                <h3 className={styles["feature-title"]}>Exclusive Bonuses</h3>
                <ul className={styles["feature-list"]}>
                  {[
                    "200+ team-building activities",
                    "Activities for Adults, Students, and Virtual settings",
                    "Gamification techniques to boost engagement",
                    "Categorized by context and audience type",
                    "Instantly downloadable and ready to implement",
                  ].map((text, i) => (
                    <li key={i} className={styles["feature-list-item-star"]}>
                      <Star className={styles["feature-star-icon"]} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Feature 3 */}
          <div className={styles["feature-row"]}>
            <Card className={styles["feature-card"]}>
              <CardContent className={styles["feature-card-content"]}>
                <Brain className={styles["feature-icon"]} />
                <h3 className={styles["feature-title"]}>
                  AI-Powered Story Generator
                </h3>
                <ul className={styles["feature-list"]}>
                  {[
                    "Create custom stories instantly using AI",
                    "Generate stories from themes, prompts, and audience types",
                    "Perfect for last-minute presentations",
                    "Produces original, high-quality narrative content",
                  ].map((text, i) => (
                    <li key={i} className={styles["feature-list-item"]}>
                      <Check className={styles["feature-check-icon"]} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div className={styles["feature-image-wrapper"]}>
              <Image
                src="/assets/ai-feature.jpg"
                alt="AI-powered story generation"
                width={700}
                height={450}
                className={styles["feature-image"]}
              />
            </div>
          </div>

          {/* Use Case Cards */}
          <div className={styles["text-center"]}>
            <h3 className={styles["section-subtitle-small"]}>
              Built For Real-World Use
            </h3>
          </div>
          <div className={styles["use-case-grid"]}>
            {[
              {
                icon: Zap,
                title: "Fast Access",
                desc: "Find the perfect story in seconds",
              },
              {
                icon: Heart,
                title: "Emotion-Driven",
                desc: "Content that connects deeply",
              },
              {
                icon: Target,
                title: "For Speakers",
                desc: "Designed by professionals",
              },
              {
                icon: Sparkles,
                title: "AI-Generated Stories",
                desc: "Create tailored AI-generated stories instantly",
              },
              {
                icon: Brain,
                title: "Story-First",
                desc: "Learning that sticks",
              },
            ].map((item, i) => (
              <Card key={i} className={styles["use-case-card"]}>
                <CardContent className={styles["use-case-card-content"]}>
                  <div className={styles["use-case-icon-wrapper"]}>
                    <item.icon className={styles["use-case-icon"]} />
                  </div>
                  <h4 className={styles["use-case-title"]}>{item.title}</h4>
                  <p className={styles["text-muted-small"]}>{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className={styles["section-padding"]}>
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["text-center"]}>
            <h2 className={styles["section-title-large"]}>Who Is This For?</h2>
            <p className={styles["section-subtitle"]}>
              Designed for professionals who understand the power of narrative
            </p>
          </div>
          <div className={styles["for-who-grid"]}>
            {[
              {
                icon: MessageCircle,
                title: "Speakers",
                desc: "Captivate audiences with stories that inspire action.",
              },
              {
                icon: Users,
                title: "Trainers",
                desc: "Make learning memorable with compelling narratives.",
              },
              {
                icon: Lightbulb,
                title: "Coaches",
                desc: "Guide clients with powerful storytelling.",
              },
              {
                icon: Award,
                title: "Leaders",
                desc: "Inspire teams through authentic storytelling.",
              },
            ].map((item, i) => (
              <Card key={i} className={styles["for-who-card"]}>
                <CardContent className={styles["for-who-card-content"]}>
                  <div className={styles["for-who-icon-wrapper"]}>
                    <item.icon className={styles["for-who-icon"]} />
                  </div>
                  <h3 className={styles["for-who-title"]}>{item.title}</h3>
                  <p className={styles["text-muted-relaxed"]}>{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Stories Work */}
      <section
        className={`${styles["section-padding"]} ${styles["why-stories-work-section"]}`}
      >
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["text-center"]}>
            <h2 className={styles["section-title-light"]}>Why Stories Work</h2>
            <p className={styles["section-subtitle-light"]}>
              The science and art behind narrative communication
            </p>
          </div>
          <div className={styles["why-stories-work-grid"]}>
            {[
              {
                icon: Brain,
                title: "Increase Retention",
                desc: "Stories are 22x more memorable than facts.",
              },
              {
                icon: Heart,
                title: "Build Connection",
                desc: "Stories create emotional bonds.",
              },
              {
                icon: Lightbulb,
                title: "Improve Learning",
                desc: "Narratives engage multiple brain regions.",
              },
              {
                icon: Zap,
                title: "Motivate Action",
                desc: "Stories inspire meaningful action.",
              },
            ].map((item, i) => (
              <div key={i} className={styles["stories-work-item"]}>
                <div className={styles["stories-work-icon-wrapper"]}>
                  <item.icon className={styles["stories-work-icon"]} />
                </div>
                <h3 className={styles["stories-work-title"]}>{item.title}</h3>
                <p className={styles["stories-work-desc"]}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className={styles["section-padding"]}>
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["text-center"]}>
            <Video className={styles["video-icon"]} />
            <h2 className={styles["section-title-large"]}>
              See Real Story Examples
            </h2>
            <p className={styles["section-subtitle"]}>
              Watch how storytelling transforms communication
            </p>
          </div>
          <div className={styles["video-grid"]}>
            {[
              {
                title: "Leadership Through Stories",
                desc: "A powerful example of narrative leadership.",
                src: homeVideoPath,
              },
              {
                title: "Team Building Success",
                desc: "How stories inspire powerful teamwork.",
                src: secondVideoPath,
              },
              {
                title: "Inspiring Change",
                desc: "Stories that transform and motivate.",
                src: thirdVideoPath,
              },
            ].map((video, i) => (
              <Card key={i} className={styles["video-card"]}>
                <CardContent className={styles["video-card-content"]}>
                  {/* Video Player */}
                  <div className={styles["video-player"]}>
                    <video
                      className={styles["video-element"]}
                      src={video.src}
                      controls
                      preload="metadata"
                    />
                  </div>
                  {/* Details */}
                  <div className={styles["video-details"]}>
                    <h3 className={styles["video-title"]}>{video.title}</h3>
                    <p className={styles["text-muted-small"]}>{video.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section
        className={`${styles["section-padding"]} ${styles["section-accent"]}`}
      >
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["behind-scenes"]}>
            <div className={styles["behind-scenes__image-wrapper"]}>
              <Image
                src="/assets/behind-scenes.jpg"
                alt="Speaker sharing stories"
                width={700}
                height={450}
                className={styles["storytelling-image"]}
              />
            </div>
            <div className={styles["behind-scenes__content"]}>
              <h2 className={styles["section-title"]}>Behind the Scenes</h2>
              <p className={styles["text-muted-relaxed"]}>
                Every story in this library is handpicked, refined, and
                categorized for real-world presentation needs.
              </p>
              <p className={styles["text-muted-relaxed"]}>
                Our team has spent years curating narratives that work — tested
                in front of real audiences and optimized for impact.
              </p>
              <p className={styles["text-muted-relaxed"]}>
                This isn't just a collection — it's a professional storytelling
                toolkit. MyStoryBank 2.0 even includes a smart AI storyteller to
                generate original stories from your theme or objective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles["final-cta-section"]}>
        <div className={styles["final-cta-overlay"]}>
          <div className={styles["cta-blob-1"]} />
          <div className={styles["cta-blob-2"]} />
        </div>
        <div className={styles["final-cta-content"]}>
          <h2 className={styles["final-cta-title"]}>
            Ready to Transform Your Communication?
          </h2>
          <p className={styles["final-cta-subtitle"]}>
            Get instant access to 190+ stories and 200+ activities. Start
            inspiring your audience today.
          </p>
          <button className={styles["final-cta-button"]}>Buy Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles["max-width-wrapper"]}>
          <div className={styles["footer-content"]}>
            <div className={styles["footer-brand"]}>
              <h3 className={styles["footer-title"]}>MyStoryBank</h3>
              <p className={styles["footer-subtitle"]}>
                Empowering communicators worldwide
              </p>
            </div>
            <div className={styles["footer-social"]}>
              <a href="#" className={styles["social-icon"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                </svg>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
