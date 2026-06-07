import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedUniverses = [
  {
    slug: "india-qualified-fifa-world-cup-2026",
    title: "India's Impossible 2026 Run",
    scenario: "What if India qualified for FIFA World Cup 2026?",
    summary:
      "India qualifies for the 2026 World Cup and turns South Asian football into FIFA's newest power market.",
    generatedContent: {
      title: "India's Impossible 2026 Run",
      summary:
        "India qualifies for the 2026 World Cup and turns South Asian football into FIFA's newest power market.",
      butterflyTimeline: [
        "India survives the expanded AFC playoff",
        "A record TV deal lands before the tournament",
        "European scouts flood the Indian Super League",
        "A round-of-16 finish changes FIFA's commercial map",
      ],
      groupStage: [
        "India draws Mexico after a stoppage-time header",
        "Brazil beats India but praises their pressing shape",
        "India beats New Zealand to reach the knockouts",
        "Mexico exits after a VAR-heavy final matchday",
      ],
      knockoutStage: [
        "India loses 2-1 to Spain in the round of 16",
        "Brazil eliminates France in the semifinal",
        "Spain defeats Germany on penalties",
        "Brazil beats Spain 2-1 in the final",
      ],
      winner: "Brazil",
      goldenBoot: "Vinicius Junior",
      goldenBall: "Pedri",
      youngPlayer: "Lamine Yamal",
      fairPlay: "Japan",
      headlines: [
        "India's World Cup Debut Rewrites Football's Map",
        "Brazil Survives Spain To Lift Sixth Crown",
        "AFC Investment Boom Begins After India Breakthrough",
        "Mexico Demands Answers After Group Stage Exit",
        "Yamal And Pedri Turn 2026 Into Spain's Relaunch",
      ],
      fanReactions: [
        { handle: "BlueTigersFC", quote: "India at a World Cup still feels unreal." },
        { handle: "StoppageTimeFC", quote: "That late equalizer changed my life." },
        { handle: "CopaCommentary", quote: "Brazil winning again just feels inevitable." },
        { handle: "AFCUnited", quote: "AFC football is never being ignored again." },
        { handle: "MidfieldMuseum", quote: "Spain's midfield was art." },
        { handle: "VARWatch", quote: "Mexico fans deserved better than that VAR call." },
        { handle: "KitCulture", quote: "The India away kit is already sold out everywhere." },
        { handle: "GoldenBootWatch", quote: "Vinicius Golden Boot was written in the stars." },
        { handle: "FairPlayJapan", quote: "Japan Fair Play again, no surprise." },
        { handle: "TimelineSplit", quote: "This timeline is pure cinema." },
      ],
      legacy:
        "India's qualification turns the World Cup into a truly global commercial engine. European scouting networks expand across South Asia, FIFA leans harder into expanded tournaments, and the old assumption that football's future belongs only to established powers finally breaks.",
    },
    divergenceScore: 48,
    chaosScore: 57,
    winner: "Brazil",
    views: 1240,
    shares: 118,
  },

  {
    slug: "iceland-wins-world-cup-2026",
    title: "Iceland Conquers Earth",
    scenario: "What if Iceland (pop. 370,000) won the FIFA World Cup 2026?",
    summary:
      "The smallest nation ever to qualify wins it all — a 370,000-person island of volcanoes and Vikings rewrites every assumption about elite football.",
    generatedContent: {
      title: "Iceland Conquers Earth",
      summary:
        "The smallest nation ever to qualify wins it all — a 370,000-person island of volcanoes and Vikings rewrites every assumption about elite football.",
      butterflyTimeline: [
        "A cold-snap winter shuts down training for rivals but hardens Iceland's squad",
        "A Reykjavik biomechanics lab discovers a pressing pattern that breaks high-defensive lines",
        "Iceland's entire nation — literally every citizen — watches every match live",
        "The Viking Clap becomes the most replicated stadium ritual on Earth",
      ],
      groupStage: [
        "Iceland holds Brazil 1-1 in the most-watched group stage game in history",
        "Iceland beats Argentina 2-0 in a game described as 'organised chaos'",
        "Iceland tops the group after France implodes in injury time",
        "Twitter trends 'How is this happening' in 47 languages simultaneously",
      ],
      knockoutStage: [
        "Iceland beats England on penalties — the goalkeeper scores the winning pen",
        "Spain eliminated 3-2 in the quarterfinal in a match of pure mayhem",
        "Iceland defeats Germany 1-0 in the semifinal via a 94th-minute header",
        "Iceland beats Portugal 2-1 in the final. 370,000 people. World champions.",
      ],
      winner: "Iceland",
      goldenBoot: "Aron Gunnarsson Jr.",
      goldenBall: "Birkir Már Sævarsson",
      youngPlayer: "Sigurður Eiríksson",
      fairPlay: "Iceland",
      headlines: [
        "Iceland Wins World Cup: The Most Improbable Triumph In Sporting History",
        "370,000 vs 8,000,000,000 — Iceland Wins",
        "Every Person In Iceland Is Now A World Champion",
        "The Viking Clap Heard Around The World",
        "FIFA Asks: Should Smaller Nations Get More Spots? Iceland Says Yes.",
      ],
      fanReactions: [
        { handle: "VikingClapper", quote: "I cannot process this. I genuinely cannot process this." },
        { handle: "SmallNationBigDream", quote: "Every underdog in every sport just got hope." },
        { handle: "ReykjavikFC", quote: "The entire country is the stadium. Always has been." },
        { handle: "FootballPhilosopher", quote: "Organisation, belief, and a goalkeeper who could bench press a car. That's the formula." },
        { handle: "TacticsBoard", quote: "Their pressing shape will be studied for 50 years." },
        { handle: "CryingInBrazilian", quote: "We drew with them in the group stage. We drew with THEM." },
        { handle: "GeographyFC", quote: "Iceland has more volcanoes than professional football clubs. Incredible." },
        { handle: "GlobalGame99", quote: "This is why we watch football. Moments like this." },
      ],
      legacy:
        "Iceland's win shatters the idea that population equals footballing destiny. FIFA restructures youth development grants for small nations. Seven Nordic countries launch joint academies within 18 months. The Viking Clap replaces the Mexican Wave as the world's default stadium ritual.",
    },
    divergenceScore: 97,
    chaosScore: 99,
    winner: "Iceland",
    views: 8410,
    shares: 2203,
  },

  {
    slug: "north-korea-wins-opens-borders-2030",
    title: "The DPRK Miracle That Opened A Nation",
    scenario: "What if North Korea won the 2030 World Cup and it opened the country to the world?",
    summary:
      "North Korea's shock 2030 World Cup win becomes the most politically consequential sporting event in human history — and the first crack in 80 years of isolation.",
    generatedContent: {
      title: "The DPRK Miracle That Opened A Nation",
      summary:
        "North Korea's shock 2030 World Cup win becomes the most politically consequential sporting event in human history — and the first crack in 80 years of isolation.",
      butterflyTimeline: [
        "A UN sports exchange program secretly allows North Korean players to train in South Korea",
        "DPRK's state-run programme produces a generation of technically flawless strikers",
        "The squad's cohesion — trained together for 14 years — is unlike anything the world has seen",
        "Winning the World Cup makes ignoring the outside world politically impossible",
      ],
      groupStage: [
        "DPRK beats Mexico 2-0 in complete silence — their bench doesn't even celebrate",
        "A 1-1 draw with France stuns the entire football world",
        "DPRK qualifies top of the group — state television broadcasts it for 72 hours straight",
        "South Korea fans cheer for them in secret — and openly by the knockout stage",
      ],
      knockoutStage: [
        "DPRK eliminates England 2-1 — the silence on the pitch is the loudest thing anyone has heard",
        "Brazil beaten on penalties — the goalkeeper hasn't conceded in 580 minutes",
        "DPRK beats France 1-0 in the semifinal via a goal that is immediately turned into a mural",
        "DPRK defeats Argentina 1-0 in the final. The world watches in disbelief.",
      ],
      winner: "North Korea",
      goldenBoot: "Ri Chŏl-Myŏng",
      goldenBall: "Pak Il-Gwang",
      youngPlayer: "Kim Sung-Ho",
      fairPlay: "Japan",
      headlines: [
        "North Korea Wins The World Cup. The World Doesn't Know What To Do.",
        "DPRK Goalkeeper Pak Il-Gwang: The Name The World Suddenly Knows",
        "Kim Jong-Un Invites FIFA Officials To Pyongyang For Victory Parade",
        "South Korea Opens Its Borders For North Korean Fans To Return Home As Champions",
        "The 1,000-Day Transition: How Football Cracked Open A Nation",
      ],
      fanReactions: [
        { handle: "GeopoliticsAndGoals", quote: "No sport has ever mattered this much. Not even close." },
        { handle: "SilentStrikeFC", quote: "They play like robots built to win football matches. Terrifyingly efficient." },
        { handle: "PyongyangPitch", quote: "The state TV broadcast went 72 hours. They showed it on billboards across the country." },
        { handle: "KoreanUnityWatch", quote: "North and South Korean fans hugging outside stadiums. In 2030. I'm done." },
        { handle: "ColdWarKick", quote: "Reagan tried diplomacy. Clinton tried diplomacy. Football just did it." },
        { handle: "TacticsNerd99", quote: "14 years of playing together. The on-pitch chemistry is genuinely superhuman." },
        { handle: "HumanRightsFC", quote: "The questions this raises are uncomfortable. And important." },
        { handle: "FootballChangesEverything", quote: "Whether you like it or not — this is the most important match ever played." },
      ],
      legacy:
        "DPRK's win triggers 18 months of quiet back-channel diplomacy. A cultural exchange program launches between North and South Korea. Three years later, the first North Korean football academy opens with international coaches. The reunification timeline shifts by decades.",
    },
    divergenceScore: 99,
    chaosScore: 96,
    winner: "North Korea",
    views: 14870,
    shares: 5640,
  },

  {
    slug: "8-6-final-germany-brazil-2026",
    title: "The 14-Goal Final",
    scenario: "What if the 2026 World Cup final ended Germany 8 – 6 Brazil?",
    summary:
      "The highest-scoring final in World Cup history produces 14 goals, 3 red cards, 2 missed penalties, and the most insane 120 minutes football has ever witnessed.",
    generatedContent: {
      title: "The 14-Goal Final",
      summary:
        "The highest-scoring final in World Cup history produces 14 goals, 3 red cards, 2 missed penalties, and the most insane 120 minutes football has ever witnessed.",
      butterflyTimeline: [
        "Both teams' first-choice goalkeepers are injured in the semifinal",
        "Germany's backup keeper has a hand injury that subtly affects his positioning",
        "Brazil's new pressing structure creates massive defensive holes — and massive opportunities",
        "The referee warns both teams about physicality early, then loses control completely by the 40th minute",
      ],
      groupStage: [
        "Germany tops Group A with 3 wins, conceding just once",
        "Brazil score 14 goals in the group stage — a tournament record",
        "Vinicius picks up a knock but plays through it — fatally affecting his tracking back",
        "Both teams cruise through the knockouts, their defences increasingly exposed",
      ],
      knockoutStage: [
        "Germany 8 – 6 Brazil: 14 goals, 2 missed penalties, 3 red cards, 120 minutes of madness",
        "Germany lead 5-2 at half time. Brazil score 4 in 22 minutes. 5-6 with 10 minutes left.",
        "Germany score twice in injury time. Brazil pull one back in the 121st minute. 8-6 FT.",
        "The broadcast breaks viewing records in 94 countries simultaneously.",
      ],
      winner: "Germany",
      goldenBoot: "Florian Wirtz",
      goldenBall: "Vinicius Junior",
      youngPlayer: "Lamine Yamal",
      fairPlay: "Japan",
      headlines: [
        "Germany 8-6 Brazil: Football Will Never Be This Insane Again",
        "14 Goals. 120 Minutes. The Greatest Match Ever Played.",
        "Wirtz Hat-Trick In World Cup Final Makes Him Immortal",
        "Brazil's Vinicius Scores 3, Wins Golden Ball, Loses Final — Football Is Cruel",
        "VAR Reviewed 9 Decisions In 120 Minutes. Still Got Two Wrong.",
      ],
      fanReactions: [
        { handle: "GoalMachineFC", quote: "I watched this with my father. We didn't speak for 10 minutes after the final whistle. Just sat there." },
        { handle: "TacticsIsDead", quote: "Pressing, shape, structure — none of it survived contact with this match." },
        { handle: "BrazilHeartbreak", quote: "5-2 at half time. FIVE TWO. And we nearly won." },
        { handle: "GermanyGlory26", quote: "Third star. Eight goals in a World Cup final. I will never recover from how good this felt." },
        { handle: "RefereeCritic99", quote: "The referee lost control at minute 38 and never found it again. Somehow that made it better." },
        { handle: "WirtzWatcher", quote: "Hat-trick in a World Cup final at 23. He is not of this earth." },
        { handle: "FIFARecordsBot", quote: "Every attacking record from this match is now in a category of one." },
        { handle: "PureFootball", quote: "I don't care about tactics or xG. That was the greatest 120 minutes I will ever see." },
      ],
      legacy:
        "The 8-6 final forces FIFA to revisit defensive rules and goalkeeper eligibility protocols. Analysts publish 200+ papers on what went wrong tactically. The match is permanently branded 'The Chaos Final' and the phrase enters everyday language as shorthand for beautiful, irredeemable disorder.",
    },
    divergenceScore: 88,
    chaosScore: 100,
    winner: "Germany",
    views: 19230,
    shares: 7800,
  },

  {
    slug: "ronaldo-45-world-cup-glory-2034",
    title: "The Ronaldo Paradox",
    scenario: "What if a 45-year-old Cristiano Ronaldo led Portugal to the 2034 World Cup?",
    summary:
      "At 45, Ronaldo defies biology, physics, and all common sense to become the oldest World Cup winner in history — and finally gets the trophy that has haunted his career.",
    generatedContent: {
      title: "The Ronaldo Paradox",
      summary:
        "At 45, Ronaldo defies biology, physics, and all common sense to become the oldest World Cup winner in history — and finally gets the trophy that has haunted his career.",
      butterflyTimeline: [
        "Ronaldo's cryotherapy and biometric training protocols become the template for athletic longevity",
        "A knee injury at 38 would have ended most careers — Ronaldo returns stronger at 39",
        "At 42 he switches to a deep-lying forward role that requires zero sprinting but maximum intelligence",
        "Portugal's squad is built around one objective: win a World Cup before Ronaldo dies on the pitch",
      ],
      groupStage: [
        "Ronaldo scores a free kick in the 89th minute to win Group C — and does the SIUUU facing the opposition dugout",
        "Portugal concede zero goals in the group stage — they play for Ronaldo",
        "Ronaldo gives an interview saying 'I have waited 20 years for this. I will not wait another.'",
        "The internet produces 40 million memes about a 45-year-old in a World Cup. He saves them all.",
      ],
      knockoutStage: [
        "Ronaldo scores the winner in the R16, QF, and SF — all from set pieces, all with his head",
        "Argentina eliminated in the quarterfinal — Messi, now retired, watches from the commentary box",
        "Ronaldo scores the opening goal in the final against France in the 7th minute",
        "Portugal win 2-0. Ronaldo lifts the trophy. He is crying. The world is crying.",
      ],
      winner: "Portugal",
      goldenBoot: "Cristiano Ronaldo",
      goldenBall: "Cristiano Ronaldo",
      youngPlayer: "Gonçalo Ramos Jr.",
      fairPlay: "Japan",
      headlines: [
        "Cristiano Ronaldo, Age 45, Is A World Champion",
        "The GOAT Debate Is Over. Ronaldo Has The Trophy.",
        "Messi Congratulates Ronaldo Live On TV. Both Are Crying.",
        "Ronaldo Scores Golden Boot At 45: Every Record He Now Holds",
        "Portugal's World Cup Win Is The Most Personal Trophy In Football History",
      ],
      fanReactions: [
        { handle: "CRSevenForever", quote: "I have cried at football exactly once before. Today is the second time." },
        { handle: "GOATDebateOver", quote: "Say whatever you want. He won the World Cup at 45. The debate is done." },
        { handle: "MessiWatcher", quote: "Messi on commentary saying 'well done Cris' with a trembling voice is one of the most human things ever broadcast." },
        { handle: "BiologyIsOptional", quote: "He is 45 years old. FORTY. FIVE. How." },
        { handle: "FreekickArt", quote: "Five tournament goals. All set pieces. All curved into the top corner. He's not human." },
        { handle: "PortugalPride34", quote: "We built our entire national identity on this man. He delivered. We owe him everything." },
        { handle: "SIUUUwatch", quote: "The SIUUU after the group stage winner will be the most replayed clip in football history." },
        { handle: "LegacyLockedIn", quote: "His legacy was already sealed. Now it's carved in stone and launched into orbit." },
      ],
      legacy:
        "Ronaldo's win triggers a global rethink of athletic longevity protocols. Sports science labs worldwide adopt his training regime. The 'Ronaldo Blueprint' becomes the standard model for extending elite careers. And the GOAT debate finally, mercifully, ends.",
    },
    divergenceScore: 91,
    chaosScore: 73,
    winner: "Portugal",
    views: 22100,
    shares: 9340,
  },

  {
    slug: "africa-all-four-semis-2030",
    title: "Africa's Reckoning",
    scenario: "What if all four World Cup 2030 semifinalists were African nations?",
    summary:
      "Nigeria, Morocco, Senegal, and Egypt fill all four semifinal slots — the most seismic shift in the power balance of world football since the game began.",
    generatedContent: {
      title: "Africa's Reckoning",
      summary:
        "Nigeria, Morocco, Senegal, and Egypt fill all four semifinal slots — the most seismic shift in the power balance of world football since the game began.",
      butterflyTimeline: [
        "CAF secures 9 World Cup slots following Morocco's 2022 semi-final run",
        "Premier League clubs invest £4bn in African academies over 8 years",
        "A generation of African stars who refused European citizenship play for home nations",
        "Morocco's 2030 tactical blueprint — ultra-aggressive pressing, 5-4-1 block — spreads across the continent",
      ],
      groupStage: [
        "Nigeria eliminates France from the group stage 3-1 in the biggest upset since 2002 South Korea",
        "Morocco tops Germany's group without conceding a single goal",
        "Senegal's Sadio Mané Jr. scores four goals in three group games at age 19",
        "Egypt qualifies top of Group D — their first World Cup in a generation, and they come as favorites",
      ],
      knockoutStage: [
        "Nigeria beats Spain 2-0 in the quarterfinal. Spain coach resigns live on television.",
        "Morocco eliminates Brazil on penalties — the goalkeeper saves three in a row",
        "Nigeria beats Egypt 1-0 in the first all-African semifinal in World Cup history",
        "Morocco beats Senegal 2-1 in an all-African final watched by 3.2 billion people",
      ],
      winner: "Morocco",
      goldenBoot: "Sadio Mané Jr.",
      goldenBall: "Achraf Hakimi",
      youngPlayer: "Sadio Mané Jr.",
      fairPlay: "Senegal",
      headlines: [
        "Africa Wins The World Cup. And The Semifinal. And The Other Semifinal.",
        "Morocco's Second World Cup Final Appearance Is Not A Surprise — It's A Statement",
        "All Four Semis: African. This Isn't A Fluke. This Is The Future.",
        "FIFA Admits: The Colonial-Era Power Map Is Dead",
        "Mané Jr. At 19: The Generational Heir Is Here",
      ],
      fanReactions: [
        { handle: "AfricaRising30", quote: "This is what happens when you invest in the continent instead of extracting from it." },
        { handle: "NigeriaSuper", quote: "We eliminated France. FRANCE. In a GROUP STAGE. I don't accept reality anymore." },
        { handle: "MoroccoMagic", quote: "2022 wasn't a fluke. 2030 is proof. Morocco is a global football power." },
        { handle: "SenegalLion", quote: "Mané Jr. is 19 years old and just won the Golden Boot. The next 15 years belong to him." },
        { handle: "EgyptPharaohFC", quote: "All four semis. We lose in the semi and it's still the greatest football tournament in history." },
        { handle: "EuropeIsOver", quote: "Eight European coaches left their jobs within a week of the final whistle. The tactical reckoning has arrived." },
        { handle: "FIFAPowerShift", quote: "CAF demanded 9 slots and they were right to demand them. History has confirmed it." },
        { handle: "GlobalGameFan", quote: "I love football more after this tournament than I ever have in my life." },
      ],
      legacy:
        "Morocco's win triggers the largest investment in African football infrastructure in history. UEFA clubs open 140 new African academies within two years. FIFA restructures World Cup slots permanently, giving CAF 12 places. The phrase 'African football is developing' is retired — it has arrived.",
    },
    divergenceScore: 85,
    chaosScore: 88,
    winner: "Morocco",
    views: 11540,
    shares: 4120,
  },

  {
    slug: "messi-hormone-never-treated-argentina-collapses",
    title: "The Treatment That Changed Everything",
    scenario: "What if Messi's growth hormone deficiency was never treated and he never played professional football?",
    summary:
      "A 13-year-old Leo Messi's family can't afford the treatment. He never grows. He never plays for Barcelona. The entire history of football forks at a pediatric clinic in Rosario.",
    generatedContent: {
      title: "The Treatment That Changed Everything",
      summary:
        "A 13-year-old Leo Messi's family can't afford the treatment. He never grows. He never plays for Barcelona. The entire history of football forks at a pediatric clinic in Rosario.",
      butterflyTimeline: [
        "In 1999, the Messi family is turned away from the Rosario Children's Hospital — the treatment costs too much",
        "Leo Messi grows to 4'9\" and is released by Newell's Old Boys at 14",
        "Barcelona's scouts see no viable path — they sign a different wonderkid from Catalonia",
        "Argentina loses 2006, 2010, 2014, and 2018 World Cup finals — every one, without him",
      ],
      groupStage: [
        "Argentina enters 2026 as a mid-table South American side with no superstar — and goes out in the group stage",
        "Ronaldo wins the 2010 World Cup for Portugal — it becomes his defining achievement",
        "Football's commercial value drops 34% without the global Messi-Ronaldo rivalry",
        "The 2014 final — Germany vs Netherlands — draws the lowest World Cup final ratings in 40 years",
      ],
      knockoutStage: [
        "Portugal wins 2010, 2014, and 2018 — Ronaldo becomes the undisputed greatest of all time",
        "Argentina fails to qualify for the 2018 World Cup for the first time since 1970",
        "South American football loses its dominant commercial narrative and FIFA funding follows",
        "The 2026 World Cup is co-hosted by North America — but it feels hollow without the greatest rivalry in sport",
      ],
      winner: "Portugal",
      goldenBoot: "Cristiano Ronaldo",
      goldenBall: "Cristiano Ronaldo",
      youngPlayer: "Kylian Mbappé",
      fairPlay: "Japan",
      headlines: [
        "The Boy Who Never Was: How One Medical Bill Changed Football Forever",
        "Argentina Fails To Qualify For 2018 — The Darkest Day In South American Football",
        "Ronaldo: Three World Cups. Undisputed. Unopposed. Alone.",
        "Football's £40bn Rivalry That Never Existed",
        "Rosario, 1999: The Clinic Visit That Split Football's Timeline",
      ],
      fanReactions: [
        { handle: "ButterflyCup", quote: "A single medical bill. That's all that separated our universe from this one." },
        { handle: "ArgentinaVoid", quote: "There's no word for what Argentina became without him. A ghost of potential." },
        { handle: "RonaldoAloat", quote: "Without Messi, Ronaldo wins everything. And somehow, the wins feel emptier." },
        { handle: "HealthcareAndFootball", quote: "This universe is a political argument dressed as a football thought experiment. And it works." },
        { handle: "MissingTimeline", quote: "2014 final. Germany vs Netherlands. I fell asleep. I actually fell asleep at a World Cup final." },
        { handle: "RivalryResearcher", quote: "The economic modelling shows football lost $40bn in commercial value without the rivalry. One boy. One bill." },
        { handle: "ArgentinaMourning", quote: "In this universe, 2022 never happens. Lusail Stadium never happens. That moment never happens. I can't." },
        { handle: "FootballPhilosopher", quote: "Greatness isn't inevitable. It's fragile. And we should fund it like we know that." },
      ],
      legacy:
        "In the years following this divergence point, FIFA launches a global initiative to fund youth football healthcare in developing nations. The stated motivation: 'We will not lose another Messi.' In this universe, they just don't know who they already lost.",
    },
    divergenceScore: 100,
    chaosScore: 82,
    winner: "Portugal",
    views: 17680,
    shares: 6910,
  },

  {
    slug: "scotland-wins-world-cup-2030",
    title: "Scotland's Thousand-Year Wait Ends",
    scenario: "What if Scotland won the 2030 FIFA World Cup?",
    summary:
      "Scotland — a nation that has failed to qualify for every World Cup since 1998 — wins the 2030 tournament in the most cathartic sporting moment in history.",
    generatedContent: {
      title: "Scotland's Thousand-Year Wait Ends",
      summary:
        "Scotland — a nation that has failed to qualify for every World Cup since 1998 — wins the 2030 tournament in the most cathartic sporting moment in history.",
      butterflyTimeline: [
        "Scotland appoints a Spanish manager in 2025 who implements a total pressing system",
        "Three Scottish players break through at Champions League level simultaneously for the first time since the 1970s",
        "Scotland qualifies from a playoff on away goals — after a last-minute penalty from their goalkeeper",
        "The national mood shifts from 'doomed to lose' to 'we have nothing to lose' — which turns out to be the key",
      ],
      groupStage: [
        "Scotland beats Argentina 1-0 in their opening game. The commentator cannot be heard over the screaming.",
        "Scotland draw Brazil 2-2 after being 2-0 down at half time",
        "Scotland qualify second from their group and the entire country calls in sick the next morning",
        "The phrase 'It's Scotland's year' is Tweeted 48 million times in 72 hours",
      ],
      knockoutStage: [
        "Scotland beat France 1-0 in the quarterfinal via a 94th-minute free kick from 45 yards",
        "Scotland defeat Germany in the semifinal on penalties — every Scot converts, every German misses",
        "In the final against Spain, Scotland go 1-0 down but equalise in the 88th minute",
        "Scotland win on penalties. Bagpipes start playing inside the stadium. The commentator is weeping openly.",
      ],
      winner: "Scotland",
      goldenBoot: "Kieran Tierney Jr.",
      goldenBall: "Andy Robertson",
      youngPlayer: "Cameron McGregor",
      fairPlay: "Scotland",
      headlines: [
        "Scotland Win The World Cup. This Is Not A Drill.",
        "32 Years Without A World Cup Appearance. Now World Champions.",
        "The Commentator Who Cried On Live Television — And Was Right To",
        "Bagpipes In The Stadium. Whisky In The Streets. Scotland Are Champions.",
        "England Watch Scotland Win A World Cup. The Nation Is Silent.",
      ],
      fanReactions: [
        { handle: "TartanArmyFC", quote: "I have been watching Scotland lose my entire life. And now this. And now THIS." },
        { handle: "BagpipesAtTheWorldCup", quote: "They actually played bagpipes inside the stadium after the final whistle. I have no words." },
        { handle: "EnglandWatch", quote: "England has watched Scotland win a World Cup. Let that marinate." },
        { handle: "ScottishPessimist", quote: "I didn't believe it was real until the trophy was in Robertson's hands. Even then I was suspicious." },
        { handle: "FreekickArt30", quote: "45 yards. No run-up. Into the top corner. To send Scotland to the semifinal. It doesn't exist." },
        { handle: "GermanyCry30", quote: "We missed all four penalties. Scotland missed zero. There is no justice in football." },
        { handle: "WorldCupHistory", quote: "The longest wait in World Cup history — over — in one night in 2030." },
        { handle: "FootballFeeling", quote: "This is why football exists. For moments like this. For nations like this. For waits like this." },
      ],
      legacy:
        "Scotland's win triggers a Scottish cultural renaissance. Football investment doubles overnight. The national team strips sell out globally. Six Scottish clubs enter European football for the first time in a decade. And across the border, a single uncomfortable question hangs in the English air: when is it our turn?",
    },
    divergenceScore: 94,
    chaosScore: 91,
    winner: "Scotland",
    views: 9870,
    shares: 3780,
  },
];

async function main() {
  for (const universe of seedUniverses) {
    await prisma.universe.upsert({
      where: { slug: universe.slug },
      update: {},
      create: {
        slug: universe.slug,
        title: universe.title,
        scenario: universe.scenario,
        summary: universe.summary,
        generatedContent: universe.generatedContent,
        divergenceScore: universe.divergenceScore,
        chaosScore: universe.chaosScore,
        winner: universe.winner,
        promptVersion: "seed-v1",
        model: "seed",
        views: universe.views,
        shares: universe.shares,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
