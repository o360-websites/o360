import Link from "next/link";
import styles from "./FounderSection.module.css";

const STAR_PATH =
  "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

function Stars({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(1, Math.max(0, value - i));
    return (
      <span className={styles.star} key={i}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path className={styles.starBase} d={STAR_PATH} />
        </svg>
        {fill > 0 ? (
          <span className={styles.starFill} style={{ width: `${fill * 100}%` }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
          </span>
        ) : null}
      </span>
    );
  });

  return (
    <span className={styles.stars} aria-label={`${value} out of 5 stars`}>
      {stars}
    </span>
  );
}

const badges = [
  {
    className: styles.badgeA,
    front: "434+",
    frontLabel: "5-Star Reviews on Google",
    backTitle: "Why are our ratings so high?",
    backBody: "Project Management\nHealthcare Specific\nDiverse Team",
  },
  {
    className: styles.badgeB,
    front: "20+",
    frontLabel: "Years in Healthcare Marketing",
    backTitle: "How do we stay on top?",
    backBody: "Progressive Team\nEffective Products\nStreamlined",
  },
  {
    className: styles.badgeC,
    front: "94%",
    frontLabel: "Client Retention Rate",
    backTitle: "Why is our retention rate so high?",
    backBody: "Proven Results\nConcierge Service\nCompliance",
  },
] as const;

const ratings = [
  { value: 4.9, label: "4.9/5 Rating On Google" },
  { value: 4.9, label: "4.8/5 Rating on Glassdoor" },
  { value: 4.9, label: "Ranked #1 on DentalCountry" },
] as const;

export function FounderSection() {
  return (
    <div className={styles.band}>
      <section className={styles.section} id="founder" aria-labelledby="founder-title">
        <div className={styles.inner}>
          <div className={styles.left}>
            <h2 className={styles.title} id="founder-title">
              Led by Doctors Who Understand Your Practice
            </h2>
            <div className={styles.body}>
              <p>
                <strong>O360</strong>
                <sup>®</sup>
                <strong> was founded in 2003 by Dr. Sean Fahimi — a dentist.</strong> He
                graduated from the University of Pennsylvania School of Dental Medicine,
                practiced dentistry for 15 years, and built several successful practices of
                his own before building the web design and marketing partner he wished he
                had as a client.
              </p>
              <p>
                That is still who runs it. Our marketing lead is a doctor. Much of our team
                came out of dental and medical offices. So when the conversation turns to
                case acceptance, referrals from other doctors, or why a new-patient call at
                7 p.m. matters, nobody here has to be brought up to speed.
              </p>
              <p>
                In more than twenty years we have designed and built over 3,100 custom
                websites, and we have stayed focused on one kind of client: the doctors who
                run private practices.{" "}
                <Link href="/about-us" title="About Us">
                  <strong>Meet the team behind O360</strong>
                </Link>
                .
              </p>
            </div>
            <div className={styles.ratings}>
              {ratings.map((row) => (
                <div className={styles.ratingRow} key={row.label}>
                  <Stars value={row.value} />
                  <h3 className={styles.ratingLabel}>{row.label}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            {badges.map((badge) => (
              <div className={`${styles.badge} ${badge.className}`} key={badge.front}>
                <div className={styles.flip} tabIndex={0}>
                  <div className={`${styles.layer} ${styles.front}`}>
                    <div className={styles.overlay}>
                      <p className={styles.frontNum}>{badge.front}</p>
                      <p className={styles.frontLabel}>{badge.frontLabel}</p>
                    </div>
                  </div>
                  <div className={`${styles.layer} ${styles.back}`}>
                    <div className={styles.overlay}>
                      <p className={styles.backTitle}>{badge.backTitle}</p>
                      <p className={styles.backBody}>{badge.backBody}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
