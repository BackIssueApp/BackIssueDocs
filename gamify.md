---
description: "Turn reading into a quest with experience points, levels, streaks, achievements and a household leaderboard."
---

# Gamify

The **Gamify plugin** turns reading into a quest. Earn XP for every page and
issue, level up through comic-flavoured titles, keep a daily streak alive, chase
achievements, and clear a weekly quest board generated from **your own
library**. Households get a monthly co-op quest and a leaderboard.

Reading history comes from the **[Reader](reading)** plugin — install
that too (it's what records what you read).

## Playing

**Quests** in the sidebar opens the board:

- **Level & XP** — issues and pages read become XP; levels carry titles from
  *Newsstand Browser* up to *Legend*.
- **Streaks** — read every day to build a streak. **Freeze tokens** auto-cover a
  missed day: you earn one at every seventh day of a streak and one on each
  level-up, hold two at most, and one is spent for yesterday, on your behalf,
  the moment a live streak would otherwise break.
- **Yearly goal** — set an issues-per-year target and watch the bar fill.
- **Weekly quests** — auto-generated missions, three rerolls a week.
- **Achievements** — a medal wall for milestones.
- **Household** — a monthly co-op quest everyone contributes to, plus a
  per-month leaderboard, with a per-user opt-out on the Household tab.

Your profile page shows the level card at a glance, and completions, unlocks and
level-ups land in the notification bell (and any
[Notifications Hub](notifications) channels). The board recalculates when you
open it, and hourly on its own so notifications fire even when nobody is looking.

## Earning XP

| What | XP |
|---|---|
| Finishing an issue in the reader | 50 |
| Each page turned in the reader | 1 |
| Unlocking an achievement | 50–1,500, per the table below |
| Clearing a weekly quest | Scales with the quest: 60 XP per issue for *Finish what you started*, 50 for *Backlog slayer*, 40 for *Arc hunter*, 30 for *Keep the pace* |

A typical 22-page issue read cover to cover is about 72 XP. The household co-op
quest is the exception: clearing it announces itself, but pays no XP into
anyone's personal total.

## Levels

Each level costs more than the last: level *L* begins at 150 × *L*² XP.

| Level | Title | XP |
|---|---|---|
| 0 | Newsstand Browser | 0 |
| 1 | Sidekick | 150 |
| 2 | Back-Issue Digger | 600 |
| 3 | Cape Chaser | 1,350 |
| 4 | Panel Hopper | 2,400 |
| 5 | Vigilante | 3,750 |
| 6 | Longbox Legend-in-Training | 5,400 |
| 7 | Crusader | 7,350 |
| 8 | Hero | 9,600 |
| 9 | Multiverse Wanderer | 12,150 |
| 10 | Keeper of the Vault | 15,000 |
| 11 | Legend | 18,150 |

Levels keep climbing past 11 — the title just stays *Legend*.

## Weekly quests

The board draws from four flavours, at most one of each, so four is the ceiling.
A quest you don't fancy can be rerolled for a different flavour, three times a
week.

- **Finish what you started** — a series you've already read from with one to
  six owned-but-unread issues left.
- **Arc hunter** — a [reading list](reading) of yours with a handful of unread
  items on it.
- **Backlog slayer** — your five oldest unread issues by cover date.
- **Keep the pace** — finish *n* issues this week, where *n* is half again your
  recent weekly average (from the last four weeks), between 3 and 15.

## Achievements

| Achievement | How you earn it | XP |
|---|---|---|
| Origin Story | Finish your first issue | 50 |
| Pull List Regular | Finish 10 issues | 100 |
| Longbox Diver | Finish 50 issues | 250 |
| Century Club | Finish 100 issues | 500 |
| Omnibus Incarnate | Finish 500 issues | 1,500 |
| Completionist | Finish every issue of a series (6+ issues) | 300 |
| Arc Hunter | Finish every issue of a reading list (5+ issues) | 250 |
| Decade Traveler | Read comics from 5 different decades | 300 |
| Publisher Sampler | Read comics from 5 different publishers | 200 |
| Marathon | Read 100+ pages in a single day | 150 |
| Night Owl | Finish an issue in the small hours | 100 |
| Weekly Ritual | A 7-day reading streak | 200 |
| Iron Reader | A 30-day reading streak | 750 |

## Fair play

Only reading done **in the reader** scores — "mark read" updates your library
but earns nothing, and re-reads never double-count. Daily caps bound what a
single day can earn toward XP, quests and the leaderboard: by default the first
**20 issues** and **500 pages** of any one day count, so an evening of skimming
scores like a very good day rather than a month. A streak day needs at least
**3 pages** actually turned (or a finished issue), so a one-page tap doesn't
keep one alive. All three numbers are adjustable below.

## On your own

Household features still work for one person: the leaderboard is a board of one
(the podium needs three), and the monthly co-op quest asks for 20 issues — it
grows by 15 per extra reader. If that's not the game you want, turn **Household
features** off and the tab disappears.

## Settings

**Settings → Plugins → Gamify** — everything here is on by default.

| Setting | What it does |
|---|---|
| Gamify | Master switch. Off stops the hourly sweep and the board says why. |
| Household features | The monthly co-op quest and the leaderboard. Off = solo. |
| Notifications | Bell and [Notifications Hub](notifications) events. With this off, progress is still tracked — it just stays quiet. |
| Level-up celebration | The one-shot overlay when you level up. |
| Weekly quests | How many quests the board draws — default 3, range 1–4. |
| Issues/day that count | Fair-play cap — default 20, range 1–200. |
| Pages/day that count | Fair-play cap — default 500, range 50–5,000. |
| Min pages for a streak day | Fair-play floor — default 3, range 1–50. |
