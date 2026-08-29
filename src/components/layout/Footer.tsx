import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { Diamond } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import {
  IconGitHub,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "@/components/ui/Icons";
import {
  addressOneLine,
  directionsHref,
  footerNav,
  mailHref,
  site,
  telHref,
  whatsappHref,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-olive text-cream">
      <Container width="wide" className="py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-4">
            <span className="text-brass-soft">
              <Monogram className="h-11 w-11" />
            </span>
            <p className="mt-6 font-serif text-2xl leading-none font-normal tracking-[0.2em] uppercase">
              {site.brand.name}
            </p>
            <p className="t-caption mt-3 tracking-[0.3em] uppercase text-cream/55">
              {site.brand.subBrand}
            </p>
            <p className="t-body mt-7 max-w-sm text-cream/70">{site.brand.support}</p>

            <ul className="mt-9 space-y-3.5">
              <li>
                <a href={telHref} className="group flex items-center gap-3">
                  <IconPhone className="h-4 w-4 text-brass-soft" />
                  <span className="num text-[0.9375rem] text-cream/85 group-hover:text-cream">
                    {site.contact.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={mailHref} className="group flex items-center gap-3">
                  <IconMail className="h-4 w-4 text-brass-soft" />
                  <span className="text-[0.9375rem] text-cream/85 group-hover:text-cream">
                    {site.contact.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-3"
                >
                  <IconPin className="mt-0.5 h-4 w-4 text-brass-soft" />
                  <span className="t-small max-w-xs text-cream/70 group-hover:text-cream">
                    {addressOneLine}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <h2 className="t-eyebrow text-brass-soft">{group.title}</h2>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="link-underline t-small text-cream/75 hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Reservations detail — the questions the desk is asked before every booking. */}
          <div className="lg:col-span-2">
            <h2 className="t-eyebrow text-brass-soft">Reservations</h2>
            <dl className="mt-6 space-y-3">
              <div>
                <dt className="t-caption text-cream/45">Check-in</dt>
                <dd className="t-small num text-cream/75">{site.policy.checkIn}</dd>
              </div>
              <div>
                <dt className="t-caption text-cream/45">Check-out</dt>
                <dd className="t-small num text-cream/75">{site.policy.checkOut}</dd>
              </div>
              <div>
                <dt className="t-caption text-cream/45">Front desk</dt>
                <dd className="t-small text-cream/75">Open 24 hours</dd>
              </div>
              <div>
                <dt className="t-caption text-cream/45">Reservations</dt>
                <dd className="t-small num text-cream/75">
                  {site.contact.hours.reservations.replace("Reservations desk · ", "")}
                </dd>
              </div>
            </dl>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-6 inline-flex items-center gap-2.5 text-cream/75 hover:text-cream"
            >
              <IconWhatsApp className="h-4 w-4 text-brass-soft" />
              <span className="link-underline t-small">Ask on WhatsApp</span>
            </a>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-eyebrow text-brass-soft">Follow</h2>
            <ul className="mt-6 space-y-3">
              {site.social.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline t-small text-cream/75 hover:text-cream"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-caption mt-6 text-cream/45">
              Tag us at @royalhaven and we will send the photograph on.
            </p>
          </div>
        </div>

        <Diamond className="mt-16 text-cream/15" />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <ul className="t-caption flex flex-wrap gap-x-6 gap-y-2 text-cream/45">
            {site.awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
          <p className="t-caption max-w-md text-cream/45 lg:text-right">
            © {year} {site.brand.legalName}. A fictional property built as a demonstration —
            reservations made here are not real and no payment is taken.
          </p>
        </div>

        {/* Studio credit — who built the site, on the record. */}
        <div className="mt-9 flex flex-col gap-3 border-t border-cream/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={site.credit.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Built by ${site.credit.label} — view the GitHub profile`}
            className="group inline-flex items-center gap-2.5"
          >
            <IconGitHub className="h-[1.15rem] w-[1.15rem] text-cream/55 transition-colors duration-500 group-hover:text-brass-soft" />
            <span className="t-caption tracking-[0.14em] uppercase text-cream/55">
              Built by{" "}
              <span className="link-underline text-cream/85 group-hover:text-cream">
                {site.credit.label}
              </span>
            </span>
          </a>
          <p className="t-caption text-cream/35">Built with {site.credit.stack}</p>
        </div>
      </Container>
    </footer>
  );
}
