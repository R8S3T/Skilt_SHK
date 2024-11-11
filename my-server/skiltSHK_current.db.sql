BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Chapters" (
	"ChapterId"	INTEGER,
	"ChapterName"	TEXT NOT NULL,
	"ChapterIntro"	TEXT,
	"Year"	INTEGER,
	PRIMARY KEY("ChapterId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ClozeTestOptions" (
	"OptionId"	INTEGER,
	"QuizId"	INTEGER,
	"OptionTexts"	TEXT,
	"CorrectOptions"	TEXT,
	PRIMARY KEY("OptionId" AUTOINCREMENT),
	FOREIGN KEY("QuizId") REFERENCES "Quiz"("QuizId")
);
CREATE TABLE IF NOT EXISTS "Flashcards" (
	"FlashcardId"	INTEGER,
	"Question"	TEXT,
	"Answer"	TEXT,
	"ChapterId"	INTEGER,
	PRIMARY KEY("FlashcardId" AUTOINCREMENT),
	FOREIGN KEY("ChapterId") REFERENCES "Chapters"("ChapterId") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "MathChapters" (
	"ChapterId"	INTEGER,
	"ChapterName"	TEXT NOT NULL,
	"Description"	TEXT,
	"SortOrder"	INTEGER,
	"Image"	TEXT,
	PRIMARY KEY("ChapterId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "MathMiniQuiz" (
	"QuizId"	INTEGER,
	"ContentId"	INTEGER,
	"Question"	TEXT,
	"Answer"	TEXT,
	"Option1"	TEXT,
	"Option2"	TEXT,
	"Option3"	TEXT,
	PRIMARY KEY("QuizId" AUTOINCREMENT),
	FOREIGN KEY("ContentId") REFERENCES "MathSubchapterContent"("ContentId")
);
CREATE TABLE IF NOT EXISTS "MathSubchapterContent" (
	"ContentId"	INTEGER,
	"SubchapterId"	INT,
	"ContentData"	TEXT,
	"SortOrder"	INT,
	PRIMARY KEY("ContentId" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "MathSubchapters" (
	"SubchapterId"	INTEGER,
	"ChapterId"	INTEGER,
	"SubchapterName"	TEXT,
	"SortOrder"	INTEGER,
	PRIMARY KEY("SubchapterId" AUTOINCREMENT),
	FOREIGN KEY("ChapterId") REFERENCES "MathChapters"("ChapterId") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "MultipleChoiceOptions" (
	"OptionId"	INTEGER,
	"QuizId"	INTEGER,
	"OptionText1"	TEXT,
	"OptionText2"	TEXT,
	"OptionText3"	TEXT,
	"OptionText4"	TEXT,
	PRIMARY KEY("OptionId" AUTOINCREMENT),
	FOREIGN KEY("QuizId") REFERENCES "Quiz"("QuizId")
);
CREATE TABLE IF NOT EXISTS "Quiz" (
	"QuizId"	INTEGER,
	"ContentId"	INTEGER,
	"Question"	TEXT,
	"QuizType"	TEXT,
	"Answer"	TEXT,
	PRIMARY KEY("QuizId" AUTOINCREMENT),
	FOREIGN KEY("ContentId") REFERENCES "SubchapterContent"("ContentId")
);
CREATE TABLE IF NOT EXISTS "SubchapterContent" (
	"ContentId"	INTEGER,
	"SubchapterId"	INTEGER,
	"ContentData"	TEXT,
	"SortOrder"	INTEGER,
	"ImageUrl"	TEXT,
	PRIMARY KEY("ContentId" AUTOINCREMENT),
	FOREIGN KEY("SubchapterId") REFERENCES "Subchapters"("SubchapterId") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Subchapters" (
	"SubchapterId"	INTEGER,
	"ChapterId"	INTEGER,
	"SubchapterName"	TEXT,
	"SortOrder"	INTEGER,
	"ImageName"	TEXT,
	PRIMARY KEY("SubchapterId" AUTOINCREMENT),
	FOREIGN KEY("ChapterId") REFERENCES "Chapters"("ChapterId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "Chapters" VALUES (1,'LF 1','Bauelemente mit handgeführten Werkzeugen fertigen',1);
INSERT INTO "Chapters" VALUES (2,'LF 2','Bauelemente mit Maschinen fertigen',1);
INSERT INTO "Chapters" VALUES (3,'LF 3','Erstellen von Baugruppen',1);
INSERT INTO "Chapters" VALUES (4,'LF 4','Technische Systeme instandhalten',1);
INSERT INTO "Chapters" VALUES (5,'LF 5','Trinkwasserinstallation',2);
INSERT INTO "Chapters" VALUES (6,'LF 6','Abwasserinstallation',2);
INSERT INTO "Chapters" VALUES (7,'LF 7','Wärmeverteilung',2);
INSERT INTO "Chapters" VALUES (8,'LF 8','Sanitärräume ausstatten',2);
INSERT INTO "Chapters" VALUES (9,'LF 9','Inhalte LF 9',3);
INSERT INTO "Chapters" VALUES (10,'LF 10','Inhalte LF 10',3);
INSERT INTO "Chapters" VALUES (11,'LF 11','Inhalte LF 11',3);
INSERT INTO "Chapters" VALUES (12,'LF 12','Inhalte LF 12',3);
INSERT INTO "Chapters" VALUES (13,'LF 13','Inhalte LF 13',3);
INSERT INTO "Chapters" VALUES (14,'LF 14','Inhalte LF 14',4);
INSERT INTO "Chapters" VALUES (15,'LF 15','Inhalte LF 15',4);
INSERT INTO "Flashcards" VALUES (4,'Was ist eine technische Zeichnung?
','Ein Plan, den Handwerker und Ingenieure benutzen, um Bauteile und Anlagen zu planen und zu bauen.',1);
INSERT INTO "Flashcards" VALUES (5,'Warum sind technische Zeichnungen in der SHK-Branche wichtig?','Sie geben genaue Anweisungen zum Bau und zur Installation von Bauteilen und Anlagen.',1);
INSERT INTO "Flashcards" VALUES (6,'Welche Informationen enthalten technische Zeichnungen?','Maße, Materialien und Formen von Bauteilen.',1);
INSERT INTO "Flashcards" VALUES (7,'Was ist ein Zeichenblatt?','Das Papier, auf dem technische Zeichnungen erstellt werden.',1);
INSERT INTO "Flashcards" VALUES (8,'Wieviel Freiraum bleibt beim Falten eines Zeichenblatts für die Ablage?
','Etwa 20 mm.',1);
INSERT INTO "Flashcards" VALUES (9,'Was bedeutet der Maßstab 1:50 in einer technischen Zeichnung?','Das gezeichnete Objekt ist 50-mal kleiner als in der Realität.',1);
INSERT INTO "Flashcards" VALUES (10,'Welche Linie zeigt sichtbare Kanten in einer technischen Zeichnung?','Die Vollinie.',1);
INSERT INTO "Flashcards" VALUES (11,'Was zeigt eine Strichlinie in einer technischen Zeichnung?','Verdeckte Kanten, die im fertigen Produkt nicht sichtbar sind.',1);
INSERT INTO "Flashcards" VALUES (12,'Wofür wird eine Strich-Punkt-Linie verwendet?','Zum Anzeigen von Symmetrie oder Mittelachsen.',1);
INSERT INTO "Flashcards" VALUES (13,'Was bedeutet Bemaßung in einer technischen Zeichnung?','Das Eintragen von Maßen wie Längen, Breiten und Durchmessern.',1);
INSERT INTO "Flashcards" VALUES (14,' Warum gibt es verschiedene Breiten und Arten von Linien in technischen Zeichnungen?','Um unterschiedliche Details und Funktionen darzustellen.',1);
INSERT INTO "Flashcards" VALUES (15,'Wo werden die Maßzahlen in einer technischen Zeichnung normalerweise positioniert?','Über den Maßlinien.',1);
INSERT INTO "Flashcards" VALUES (16,'Warum sind verschiedene Ansichten in einer technischen Zeichnung wichtig?','Sie zeigen das Bauteil aus verschiedenen Perspektiven für ein vollständiges Verständnis.',1);
INSERT INTO "Flashcards" VALUES (17,'Was ist eine Vorderansicht?','Die Darstellung eines Bauteils von vorne.',1);
INSERT INTO "Flashcards" VALUES (18,'Was zeigt die Draufsicht?','Die Darstellung eines Bauteils von oben.',1);
INSERT INTO "Flashcards" VALUES (19,'Was ist eine Seitenansicht?','Die Darstellung eines Bauteils von der Seite.',1);
INSERT INTO "Flashcards" VALUES (20,'Wozu dient ein Schnitt in einer technischen Zeichnung?','Um das Innere eines Bauteils sichtbar zu machen.',1);
INSERT INTO "Flashcards" VALUES (21,'Was ist ein Vollschnitt?','Ein Schnitt, bei dem das gesamte Bauteil durchgeschnitten wird.
',1);
INSERT INTO "Flashcards" VALUES (22,'Was zeigt ein Halbschnitt?','Nur eine Hälfte des Bauteils wird durchgeschnitten.',1);
INSERT INTO "Flashcards" VALUES (23,'Wann wird ein Teilschnitt verwendet?','Wenn nur ein kleiner Teil eines Bauteils dargestellt werden soll.',1);
INSERT INTO "Flashcards" VALUES (24,'Was gibt der Maßstab in einer technischen Zeichnung an?','Wie groß oder klein das gezeichnete Objekt im Vergleich zur Realität ist.',1);
INSERT INTO "Flashcards" VALUES (25,'Was bedeutet ein Maßstab von 1:2?','Das Objekt ist halb so groß wie in Wirklichkeit.',1);
INSERT INTO "Flashcards" VALUES (26,'Warum wird in technischen Zeichnungen Normschrift verwendet?','Sie sorgt für einheitliche Darstellung der Beschriftung.',1);
INSERT INTO "Flashcards" VALUES (27,'Welche Angaben enthält Normschrift in einer technischen Zeichnung?','Zahlen, Buchstaben und Symbole in genormter Größe.',1);
INSERT INTO "Flashcards" VALUES (28,'Welche Informationen sind wichtig für die Bemaßung?','Die exakten Maße und Abstände der Bauteile.',1);
INSERT INTO "Flashcards" VALUES (29,'Was ist der Hauptnutzen technischer Zeichnungen im SHK-Handwerk?','Sie ermöglichen präzises Arbeiten und die korrekte Montage von Bauteilen',1);
INSERT INTO "Flashcards" VALUES (30,'Wer überwacht die Einhaltung der Arbeitssicherheitsvorschriften?','Die Berufsgenossenschaften (BG).',2);
INSERT INTO "Flashcards" VALUES (31,'Warum sind Sicherheitszeichen auf Baustellen unverzichtbar?','Um Gefahren zu erkennen und Unfälle zu vermeiden.',2);
INSERT INTO "Flashcards" VALUES (32,'Was ist die Bedeutung von Warnzeichen?','Sie weisen auf mögliche Gefahren hin, die besondere Vorsicht erfordern.',2);
INSERT INTO "Flashcards" VALUES (33,'Welche Funktion haben Rettungszeichen?','Sie weisen auf sichere Fluchtwege oder Erste-Hilfe-Stationen hin.',2);
INSERT INTO "Flashcards" VALUES (34,'Warum ist eine gute Beleuchtung am Arbeitsplatz wichtig?','Um Unfälle zu verhindern und eine sichere Arbeitsumgebung zu schaffen.',2);
INSERT INTO "Flashcards" VALUES (35,'Warum sind Atemschutzmasken bei schädlichen Gasen notwendig?','Sie schützen vor schädlichen Einflüssen auf die Atemwege.',2);
INSERT INTO "Flashcards" VALUES (36,'Welche Funktion hat die Schutzbrille in der PSA?','Schutz der Augen vor Staub, Funken oder chemischen Stoffen.',2);
INSERT INTO "Flashcards" VALUES (37,'Warum ist das Tragen von Schutzhandschuhen bei Arbeiten mit Chemikalien wichtig?','Sie schützen die Haut vor Verätzungen und Chemikalienschäden.',2);
INSERT INTO "Flashcards" VALUES (38,'Was ist der Vorteil von Originalbehältern bei gefährlichen Stoffen?','Sie sind korrekt gekennzeichnet und minimieren Verwechslungsgefahr.',2);
INSERT INTO "Flashcards" VALUES (39,'Warum sind Sicherheitsanweisungen bei gefährlichen Stoffen wichtig?','Sie helfen, Unfälle wie Verätzungen und Vergiftungen zu vermeiden.',2);
INSERT INTO "Flashcards" VALUES (40,'Welche Schutzmaßnahmen gibt es für Mitarbeiter auf Baustellen?','Absperren gefährlicher Bereiche und Bereitstellen von Atemschutzmasken.',2);
INSERT INTO "Flashcards" VALUES (41,'Was gibt ein Gebotszeichen an?','Welche Schutzmaßnahmen ergriffen werden müssen, um sicher zu arbeiten.',2);
INSERT INTO "Flashcards" VALUES (42,'Was macht ein Warnzeichen?','Es weist auf mögliche Gefahren hin, die besondere Vorsicht erfordern.',2);
INSERT INTO "Flashcards" VALUES (43,'Warum sollte die PSA auch bei kurzen Arbeiten getragen werden?','Sie kann auch bei kleinen Arbeiten lebensrettend sein.',2);
INSERT INTO "Flashcards" VALUES (44,'Welcher Bohrertyp ist ideal für harte Materialien wie Beton?','Steinbohrer',2);
INSERT INTO "Flashcards" VALUES (45,'Was ist die Funktion der Spiralnuten an einem Bohrer?','Sie transportieren die Späne ab und kühlen das Bohrloch.',2);
INSERT INTO "Flashcards" VALUES (46,'Warum ist ein größerer Schneidwinkel von etwa 150° für Betonbohrer notwendig?','Um das harte Material effektiv zu durchdringen.',2);
INSERT INTO "Flashcards" VALUES (47,'Wofür dient der Schaft eines Bohrers?','Der Schaft wird im Spannfutter eingespannt, um den Bohrer zu fixieren.',2);
INSERT INTO "Flashcards" VALUES (48,'Was ist die Aufgabe der Schneidkanten an einem Bohrer?','Sie tragen das Material ab und bestimmen den Bohrlochdurchmesser.',2);
INSERT INTO "Flashcards" VALUES (49,'Warum ist es wichtig, den Bohrer regelmäßig abkühlen zu lassen?','Um Überhitzung und möglichen Verschleiß zu vermeiden.',2);
INSERT INTO "Flashcards" VALUES (50,'Wofür steht das "d" in der Formel zur Berechnung der Schnittgeschwindigkeit?','Durchmesser des Bohrers',2);
INSERT INTO "Flashcards" VALUES (51,'Warum sollten beim Maschinenbohren keine Handschuhe getragen werden?','Sie können sich in den rotierenden Teilen verfangen und Verletzungen verursachen.',2);
INSERT INTO "Flashcards" VALUES (52,'Was muss beim Bohren in hartes Material wie Beton beachtet werden?','Der Bohrer sollte regelmäßig abgekühlt werden.',2);
INSERT INTO "Flashcards" VALUES (53,'Welches Werkzeug ist für präzise Löcher in Keramik am besten geeignet?','Keramikbohrer',2);
INSERT INTO "Flashcards" VALUES (54,'Warum ist der Schaftrand an einem Bohrer wichtig?','Er schützt die Schneide und reduziert die Reibung beim Bohren.',2);
INSERT INTO "Flashcards" VALUES (55,'Was sollte beim Bohren in Holz immer verwendet werden?','Holzbohrer mit Zentrierspitze',2);
INSERT INTO "Flashcards" VALUES (56,'Warum sollte ein Bohrer regelmäßig auf Abnutzung überprüft werden?','Um eine gute Bohrleistung und Sicherheit zu gewährleisten.',2);
INSERT INTO "Flashcards" VALUES (57,'Wofür wird ein Trennschleifer verwendet?','Zum Schneiden von Materialien, Glätten von Oberflächen und Entfernen von Material',2);
INSERT INTO "Flashcards" VALUES (58,'Wofür ist ein Winkelschleifer besonders geeignet?','Für flächiges Arbeiten mit Scheiben von 75 bis 230 mm.',2);
INSERT INTO "Flashcards" VALUES (59,'Was bestimmt die Schleifgeschwindigkeit eines Trennschleifers?','Drehzahl und Durchmesser der Scheibe',2);
INSERT INTO "Flashcards" VALUES (60,'Warum darf eine abgenutzte Scheibe nicht bei hohen Drehzahlen verwendet werden?','Sie kann durch die entstehenden Fliehkräfte zerreißen.',2);
INSERT INTO "Flashcards" VALUES (61,'Warum ist die richtige Scheibengröße für die Maschine wichtig?','Nur die vorgesehene Scheibengröße gewährleistet sichere und effektive Drehzahlen.',2);
INSERT INTO "Flashcards" VALUES (62,'Wie sollte die Maschine beim Schleifen gehalten werden?','Mit beiden Händen',2);
INSERT INTO "Flashcards" VALUES (63,'Welche Gefahr besteht, wenn lockere Kleidung beim Schleifen getragen wird?','Sie kann sich in der Maschine verfangen und Verletzungen verursachen.',2);
INSERT INTO "Flashcards" VALUES (64,'Wie wird die Drehzahl beim Schleifen berechnet?','Durch die Kombination von Drehzahl und Durchmesser der Schleifscheibe.',2);
INSERT INTO "Flashcards" VALUES (65,'Was ist ein Gewinde?','Eine spiralförmige Rille, die Bauteile verbindet',2);
INSERT INTO "Flashcards" VALUES (66,'Wofür werden Gewinde verwendet?','Zum festen Verbinden von Bauteilen.',2);
INSERT INTO "Flashcards" VALUES (67,'Was beschreibt die Steigung eines Gewindes?','Den Abstand zwischen zwei Gewindegängen',2);
INSERT INTO "Flashcards" VALUES (68,'Was ist ein Außengewinde?','Ein Gewinde, das sich an der Außenseite einer Schraube befindet.',2);
INSERT INTO "Flashcards" VALUES (69,'Was ist ein Gewindebohrer?','Ein Werkzeug zum Schneiden von Innengewinden in vorgebohrten Löchern.',2);
INSERT INTO "Flashcards" VALUES (70,'Welches Werkzeug wird für das Schneiden von Außengewinden verwendet?','Gewindebohrer',2);
INSERT INTO "Flashcards" VALUES (71,'In welcher Reihenfolge werden Handgewindebohrer beim Schneiden verwendet?','Fertigschneider, Mittelschneider, Vorschneider',2);
INSERT INTO "Flashcards" VALUES (72,'Warum sollte der Gewindebohrer regelmäßig zurückgedreht werden?','Um die Späne zu brechen und Verklemmen zu vermeiden.',2);
INSERT INTO "Flashcards" VALUES (73,'Wo kann man die passende Bohrergröße für ein Gewinde nachschlagen?','Im Tabellenbuch oder auf der Rückseite mancher Messschieber.',2);
INSERT INTO "Flashcards" VALUES (74,NULL,NULL,NULL);
INSERT INTO "MathChapters" VALUES (1,'Algebra','Grundlagen Algebra
',1,'equations_math_algebra');
INSERT INTO "MathChapters" VALUES (2,'Gleichungen','Gleichungen',2,'equations_math_scales');
INSERT INTO "MathChapters" VALUES (3,'Einheiten und Messungen','Einheiten und Messungen',3,'equations_math_measurements');
INSERT INTO "MathChapters" VALUES (4,'Geometrie und Trigonometrie','',4,'equations_math_geometry');
INSERT INTO "MathChapters" VALUES (5,'Mechanik und technische Mathematik','',5,'equations_math_mechanic');
INSERT INTO "MathMiniQuiz" VALUES (1,2,'Wie viel wiegt ein einzelnes Quadrat?','10 kg','8 kg','10 kg','12 kg');
INSERT INTO "MathMiniQuiz" VALUES (2,2,'Wie würdest du die letzte Grafik als Gleichung schreiben?','5x = 50','5 + x = 50','5x = 50','5x + 50 = 0');
INSERT INTO "MathMiniQuiz" VALUES (3,4,'In der Gleichung 3x = 8, was ist die Variable?','x','3','x','8');
INSERT INTO "MathMiniQuiz" VALUES (4,4,'Welches der folgenden ist ein Term?
(Mehrere Antworten möglich)','3x + 5, 4 = 2y, x - y = 7','3x + 5','4 = 2y','x - y = 7');
INSERT INTO "MathMiniQuiz" VALUES (5,10,'Woher stammt das Wort „Algebra“?','Aus dem Arabischen','Aus dem Griechischen','Aus dem Lateinischen','Aus dem Arabischen');
INSERT INTO "MathMiniQuiz" VALUES (6,11,'Was enthält ein Term?','Zahlen und Variablen','Nur Zahlen','Zahlen und Variablen','Nur Variablen');
INSERT INTO "MathMiniQuiz" VALUES (7,15,'Was ist das Ergebnis von 3²?','9','6','9','12');
INSERT INTO "MathMiniQuiz" VALUES (8,18,'Welcher der folgenden Ausdrücke ist quadratisch?','4x² + 2x - 1','3x + 7','4x² + 2x - 1','5x³ - 4');
INSERT INTO "MathMiniQuiz" VALUES (9,19,'','4/9','4/5','4/9','5/9');
INSERT INTO "MathMiniQuiz" VALUES (10,6,'Welche der folgenden Gleichungen ist lineal?','2x + 5 = 11','x² - 2 = 0','1/x = 4','2x + 5 = 11');
INSERT INTO "MathSubchapterContent" VALUES (1,1,'[underline]Gleichungen erstellen und lösen[/underline]

In diesem Kurs zeigen wir dir Schritt für Schritt, wie du Gleichungen verstehst und anwendest.              
[equations_algebra_2_welcome]
Vorab sollten wir aber einige wichtige Begriffe klären.
',1);
INSERT INTO "MathSubchapterContent" VALUES (2,1,'[bold]Definition von Gleichungen[/bold]

Eine Gleichung kannst du dir wie eine Waage vorstellen.

[equations_1]

Damit die Waage im Gleichgewicht bleibt, müssen beide Seiten immer ausgeglichen sein.

[equations_2]

Wenn du auf einer Seite etwas hinzufügst oder wegnimmst, muss das Gleiche auch auf der anderen Seite passieren, um das Gleichgewicht zu bewahren.
[continue]
[bgcolor-block=#ececec]Eine Gleichung zeigt, dass zwei Seiten denselben Wert haben. 
Ändert man etwas auf einer Seite, muss man dasselbe auf der anderen tun, um das Gleichgewicht zu erhalten.[/bgcolor-block]
[continue]
Sehen wir uns die folgende Gleichung an:
[equations_7]
Wenn du nun auf beiden Seiten [bold]1[/bold] subtrahierst, bleibt die Gleichung gültig: 
[equations_8]
Das führt zu:
[equations_9]
[continue]
Eine Gleichung wird oft verwendet, um einen unbekannten Wert zu ermitteln. 
Dieser unbekannte Wert wird durch einen Buchstaben wie [bold]x[/bold] dargestellt. 
Unser Ziel ist es, den Wert zu finden, der die Gleichung erfüllt.
[continue]
[equations_3]
[quiz_1]
[continue]
[bold]Erkärung[/bold]
Wir können das Gesamtgewicht ([bold]50 kg[/bold]) auf der linken Seite durch die Anzahl [bold](5)[/bold] der Quadrate teilen, um das Gewicht der einzelnen Quadrate zu berechnen
Jedes einzelne Quadrat wiegt also [bold]10 kg[/bold].
[continue]
[quiz_2][continue]
Weitere korrekte Antworten wären: 
[equations_10]
[equations_11]
[continue]
Diese Formen sind ebenfalls richtig, da sie das Gleiche ausdrücken. 
Der Einfachheit halber schreiben wir Gleichungen jedoch oft zusammengefasst, wie in [bold]5x = 50[/bold]. 
Dies macht die Gleichung übersichtlicher und leichter zu lösen.',4);
INSERT INTO "MathSubchapterContent" VALUES (3,1,'Gleichungen gehören zum Berufsalltag und helfen dabei, Maße, Materialbedarf oder Kosten zu berechnen.

[equations_welcome]

Wir schauen uns nun an, was eine Gleichung eigentlich ist und wie man sie löst.',3);
INSERT INTO "MathSubchapterContent" VALUES (4,1,'[bold]Variable[/bold]
Eine Variable ist ein Symbol (oft ein Buchstabe wie [bold]x[/bold] oder [bold]y[/bold]), das für eine unbekannte Zahl steht.
Die Aufgabe besteht darin, den Wert der Variablen zu finden, der die Gleichung wahr macht.
Variablen ermöglichen es, allgemeine Probleme zu lösen, da sie für viele verschiedene Werte stehen können.
[equations_algebra_201_big]
[continue]
[quiz_1]
[continue]
[bgcolor-block=#e3e3e3]"Variabel" bedeutet veränderlich. 
Eine Variable in der Mathematik ist also ein veränderlicher Wert, der je nach Gleichung unterschiedlich sein kann.[/bgcolor-block]
[continue]
[bold]Konstante[/bold]
Eine Konstante ist eine feste Zahl, die in einer Gleichung immer gleich bleibt. 
[equations_algebra_202_big]
Im Gegensatz zu einer Variable, die sich ändern kann, bleibt eine Konstante immer derselbe Wert.
[continue]
[bold]Koeffizient[/bold]
Ein Koeffizient ist die Zahl vor einer Variablen, die zeigt, wie oft diese Variable genommen wird. 
In unserem Beispiel bedeutet [bold]5x[/bold], dass [bold]x fünf Mal[/bold] genommen wird – also ist [bold]5[/bold] der Koeffizient von [bold]x[/bold].
[equations_algebra_203_big]
[continue]
[quiz_2]
[continue]
Tatsächlich sind alle der genannten Beispiele Terme.
[continue]
[bold]Gleichheitszeichen[/bold]
Das Gleichheitszeichen [bold]=[/bold] zeigt an, dass zwei Ausdrücke den gleichen Wert haben. 
Es bedeutet, dass das, was auf der linken Seite steht, genau das Gleiche ist wie das, was auf der rechten Seite steht.
[equations_algebra_204_big]
[continue]
[bold]Lösen einer Gleichung[/bold]
Das Lösen einer Gleichung bedeutet, den Wert der Variablen zu finden, der die Gleichung korrekt macht.
Dazu werden auf beiden Seiten der Gleichung dieselben mathematischen Operationen durchgeführt, um die Variable zu isolieren.
[equations_algebra_205_big]
Ziel ist es, die Variable allein auf einer Seite der Gleichung zu haben.',2);
INSERT INTO "MathSubchapterContent" VALUES (5,2,'
Als nächstes werfen wir einen Blick auf die verschiedenen Arten Gleichungen zu lösen.


[equations_types_welcome]',5);
INSERT INTO "MathSubchapterContent" VALUES (6,2,'[bold]Lineare Gleichungen[/bold]
Eine lineare Gleichung ist eine einfache Gleichung, bei der die Variable (meistens [bold]x[/bold]) nur in der ersten Potenz vorkommt. 
Das bedeutet, es gibt keine Quadrate oder höheren Potenzen von [bold]x[/bold].
Ein Beispiel für eine lineare Gleichung ist:
[equations_linear_1]
Hier sind [bold]a[/bold] und [bold]b[/bold] feste Zahlen, und [bold]x[/bold] ist die Variable, die wir finden wollen.
[continue]
[quiz_1]
[continue]
Um eine lineare Gleichung zu lösen, musst du oft einfache Rechenoperationen wie Addition, Subtraktion, Division und Multiplikation verwenden.
Anhand von Beispielen zeigen wir dir, wie du diese Gleichungen schrittweise lösen kannst.
[continue]
[bold]Addition[/bold]
[equations_linear_2]
Subtrahiere [bold]7[/bold] von beiden Seiten der Gleichung, um [bold]x[/bold] zu isolieren.
[equations_linear_3]
Das Ergebnis ist:
[equations_linear_3_1]
[continue]
[bold]Subtraktion[/bold]
[equations_linear_4]
Addiere [bold]6[/bold] zu beiden Seiten der Gleichung, um [bold]x[/bold] zu isolieren.
[equations_linear_5]
Das Ergebnis ist:
[equations_linear_5_1]
[continue]
[bold]Division[/bold]
[equations_linear_6]
Teile beide Seiten der Gleichung durch [bold]2[/bold], um [bold]x[/bold] zu isolieren.
[equations_linear_7]
Das Ergebnis ist:
[equations_linear_7_1]
[continue]
[bold]Multiplikation[/bold]
[equations_linear_8]
Multipliziere beide Seiten der Gleichung mit [bold]3[/bold], um [bold]x[/bold] zu isolieren.
[equations_linear_9]
Auf der linken Seite der Gleichung kürzt sich die [bold]3[/bold] heraus, auf der rechten Seite multiplizierst du [bold]2[/bold] mit [bold]3[/bold].

Das Ergebnis ist:
[equations_linear_9_1]
[continue]',6);
INSERT INTO "MathSubchapterContent" VALUES (7,2,'[bold]Gleichungen mit mehreren Variablen[/bold]
Wenn eine Gleichung die gleiche Variable auf beiden Seiten hat, müssen wir sie schrittweise umformen, bis wir die Lösung finden.
[continue]
[bold]Beispiel[/bold]
[equations_linear_10]
[bold]1.Variable auf eine Seite bringen:[/bold] 
Subtrahiere [bold]x[/bold] von beiden Seiten der Gleichung, um alle [bold]x-Terme[/bold] auf eine Seite zu bringen.
[equations_linear_11]
Das erste Zwischenergebnis ist:
[equations_linear_11_1]
[continue]
[bold]2.Konstante isolieren:[/bold]
Addiere [bold]1[/bold] zu beiden Seiten der Gleichung, um die Konstante auf die rechte Seite zu bringen.
[equations_linear_12]
Das zweite Zwischenergebnis ist:
[equations_linear_12_1]
[continue]
[bold]3.Variable isolieren:[/bold]
Teile beide Seiten der Gleichung durch [bold]3[/bold], um [bold]x[/bold] zu isolieren.
[equations_linear_13]
Das Endergebnis ist:
[equations_linear_13_1]
[continue]
[bgcolor-block=#e3e3e3]Dieser Lösungsansatz funktioniert auch bei komplexeren Aufgaben. 
Brich sie in kleinere Schritte herunter, um systematisch zur richtigen Lösung zu gelangen.[/bgcolor-block]
[continue]
[bold]Gleichungen mit Klammern[/bold]
Bei Gleichungen mit Klammern musst du zuerst die Klammern auflösen, damit du die Gleichung weiter vereinfachen und lösen kannst.
[equations_linear_14]
1. [bold]Klammern auflösen:[/bold]
Zuerst multiplizierst du jeden Term innerhalb der Klammer mit der Zahl davor, in diesem Fall mit 2.
[equations_linear_15]
2.[bold]Konstanten zusammenfassen:[/bold]
Nun fasst du die Konstanten (also die Zahlen ohne Variablen) auf der linken Seite zusammen.
[equations_linear_17]
3.[bold]Konstante isolieren:[/bold]
Um die Variable [bold]x[/bold] weiter zu isolieren, musst du die Konstante auf die andere Seite der Gleichung bringen. 
[equations_linear_18]
4.Variable isolieren: 
Abschließend teilst du beide Seiten der Gleichung durch [bold]2[/bold], um [bold]x[/bold] komplett zu isolieren.
[equations_linear_19]
[continue]
[bold]Gleichungen mit zwei unterschiedlichen Variablen[/bold]
Im Handwerk arbeitest du oft mit mehreren Variablen, wie bei der Berechnung von Rohrlänge([bold]x[/bold]) und Materialmenge([bold]y[/bold]) für eine Installation.
In den nächsten Schritten werden wir diese Berechnungen Schritt für Schritt durchführen.
',7);
INSERT INTO "MathSubchapterContent" VALUES (9,5,'[underline]Algebra Grundlagen[/underline]
In den kommenden Abschnitten wirst du die wichtigsten Grundlagen der Algebra entdecken.

Hier lernst du alles Wichtige, von Begriffen -wie Terme und Variablen bis hin zu Exponenten und mehr.
[equations_algebra_welcome]',1);
INSERT INTO "MathSubchapterContent" VALUES (10,5,'[bold]Was ist Algebra?[/bold] 
Algebra ist ein Teilgebiet der Mathematik, das sich mit dem Rechnen und Umformen von Ausdrücken beschäftigt. 
In der Algebra nutzt man Symbole und Buchstaben, um allgemeine Regeln und Zusammenhänge zu beschreiben, anstatt nur mit festen Zahlen zu rechnen. 
 [bgcolor-block=#e3e3e3]Algebra wird oft als die Sprache der Mathematik bezeichnet, da sie hilft, komplexe Probleme zu formulieren und zu lösen.[/bgcolor-block]

[continue]
Diese Symbole, auch [bold]Variablen[/bold] genannt, stehen für unbekannte oder veränderliche Werte. 

Algebra ist ein wichtiges Werkzeug, um mathematische Probleme zu lösen, die in vielen Bereichen des täglichen Lebens und in verschiedenen Berufen auftreten.
[continue]
[quiz_1]
[continue]
[bold]Erklärung[/bold]
Das Wort „Algebra“ kommt aus dem Arabischen und bedeutet „das Wiederherstellen“ oder „das Zusammenfügen“.',2);
INSERT INTO "MathSubchapterContent" VALUES (11,6,'[bold]Was sind Terme?[/bold] 

Ein Term ist ein mathematischer Ausdruck, der Zahlen, Variablen (z.B. [bold]x[/bold]) und mathematische Operationen (wie Addition, Subtraktion, Multiplikation, Division) enthält. 
[equations_algebra_3]

Terme werden verwendet, um Gleichungen zu bilden, die dann gelöst werden können.
[continue]

[bold]Was sind Ausdrücke?[/bold] 
Ein mathematischer Ausdruck ist eine Kombination aus Zahlen, Variablen und Operationen, die zusammen eine mathematische Aussage bilden. 
Ausdrücke können sehr einfach oder auch komplex sein. Sie sind der Grundbaustein vieler algebraischer Probleme.
[equations_algebra_4]
Ein algebraischer Ausdruck setzt sich aus mindestens zwei Termen zusammen, die durch Rechenzeichen wie Plus oder Minus verbunden sind. 
[continue]
Ähnliche Terme haben dieselben Variablen und können zusammengefasst werden, um den Ausdruck zu vereinfachen.
Den folgenden Ausdruck
[equations_algebra_5]
kann man zusammenfassen, indem man ähnliche Terme zusammenführt:
[equations_algebra_6]
Der vereinfachte Ausdruck sieht dann so aus:
[equations_algebra_7]
[continue]
[quiz_1]
[continue]',3);
INSERT INTO "MathSubchapterContent" VALUES (12,7,'[bold]Variablen und Konstanten[/bold]
Variablen sind Symbole, die für unbekannte oder veränderliche Werte stehen. 
Sie dienen dazu, in mathematischen Ausdrücken und Gleichungen allgemeine Werte zu repräsentieren. 
In den meisten Fällen wird [bold]x[/bold] als Variable verwendet, aber auch andere Buchstaben wie  [bold]a[/bold],[bold]b[/bold], [bold]y[/bold] oder [bold]z[/bold] können als Variablen dienen.
[bgcolor-block=#e3e3e3]Eine Variable ist ein Buchstabe, der eine Zahl ersetzt. Das Rechnen mit Variablen bedeutet also, dass man mit Buchstaben anstelle von konkreten Zahlen arbeitet.[/bgcolor-block]
[continue]
Konstanten hingegen sind feste Zahlen, deren Wert sich nicht ändert. 
In algebraischen Ausdrücken bleiben Konstanten immer gleich, im Gegensatz zu Variablen, die verschiedene Werte annehmen können.
[continue]
[bold]Beispiel[/bold]
[equations_algebra_8]
Hier ist [bold]x[/bold] die Variable, die für einen unbekannten Wert steht, während [bold]5[/bold] und [bold]11[/bold] Konstanten sind.

 ',4);
INSERT INTO "MathSubchapterContent" VALUES (14,8,'[bold]Klammern in der Mathematik[/bold]
Klammern werden in der Mathematik verwendet, um bestimmte Teile eines Ausdrucks zusammenzuhalten.
Sie zeigen, welche Teile zuerst berechnet werden sollen und setzen dabei Regeln wie Punkt-vor-Strich-Rechnung außer Kraft.
[bold]Beispiel[/bold] 
[equations_algebra_13]
In diesem Rechenweg wird zuerst der Inhalt der Klammer berechnet:
[bold]5[/bold] + [bold]2[/bold] = [bold]7[/bold].
[equations_algebra_13_1]
Anschließend wird das Ergebnis der Klammer mit [bold]2[/bold] multipliziert: 
[bold]2[/bold] x [bold]7[/bold] = [bold]14[/bold].
[continue]
Klammern sind besonders nützlich, wenn wir Ausdrücke zusammenfassen oder sie multiplizieren möchten. 
Sie helfen uns, die richtigen Schritte in der richtigen Reihenfolge durchzuführen.',5);
INSERT INTO "MathSubchapterContent" VALUES (15,8,'[bold]Potenzen[/bold]
Wenn man eine Zahl mehrfach mit sich selbst multipliziert, nennt man das Potenzieren. 
Die kleine Zahl, der Exponent, zeigt an, wie oft die Zahl, die Basis, multipliziert wird. 
[equations_algebra_26]
In dem Beispiel ist die Zahl [bold]3[/bold] die Basis und [bold]²[/bold] der Exponent, also die zweite Potenz von [bold]3[/bold].
[continue]
Im folgenden Beispiel wir die Zahl [bold]2[/bold] mit dem Exponenten [bold]⁴[/bold] potenziert:
[equations_algebra_9]
Das bedeutet, dass die Zahl 2 viermal mit sich selbst multipliziert wird:
[equations_algebra_10]
Jedes Mal, wenn man eine 2 mit der nächsten multipliziert, erhält man ein Zwischenergebnis:
[equations_algebra_10_1]
Das Endergebnis ist:
[equations_algebra_11]
[continue]
[quiz_1]
[continue]
Potenzen begegnen uns oft in der Mathematik, z.B. bei Flächenberechnungen oder wenn wir mit großen Zahlen arbeiten. 
Besonders wichtig sind sie bei quadratischen Ausdrücken, die wir im nächsten Thema kennenlernen werden.
',6);
INSERT INTO "MathSubchapterContent" VALUES (16,8,'[bold]Quadratische Ausdrücke ausmultiplizieren[/bold]
Wenn wir zwei Klammern haben, bedeutet das, dass wir den Inhalt der ersten Klammer mit dem Inhalt der zweiten Klammer multiplizieren müssen.
[equations_algebra_14]
Hier wird jedes Element der ersten Klammer mit jedem Element der zweiten Klammer multipliziert:

[equations_algebra_14_1]

Wenn wir alles zusammenzählen, erhalten wir
[equations_algebra_15]
',8);
INSERT INTO "MathSubchapterContent" VALUES (17,8,'[bold]Quadratische Ausdrücke ausklammern[/bold]
Beim Ausklammern geht es darum, einen gemeinsamen Faktor in allen Teilen eines Ausdrucks zu finden und diesen Faktor vor die Klammer zu setzen. 

Dies macht den Ausdruck einfacher und übersichtlicher.
[continue]
[bold]Schritte zum Ausklammern[/bold]
1. Gemeinsamen Faktor finden
[equations_algebra_16]
Schau dir die Teile des Ausdrucks an und finde einen Faktor, der in allen Teilen enthalten ist.
Hier ist [bold]6[/bold] der gemeinsame Faktor, weil [bold]6[/bold] sowohl in [bold]6x[/bold] als auch in [bold]12[/bold] enthalten ist.
2. Teile durch den gemeinsamen Faktor teilen
Wenn du den gemeinsamen Faktor gefunden hast, teilst du jeden Teil des Ausdrucks durch diesen Faktor. 
Hier teilst du durch den Faktor [bold]6[/bold]:
[equations_algebra_16_1]
3. Faktor vor die Klammer setzen
Setze den gemeinsamen Faktor vor die Klammer und schreibe die geteilten Teile in die Klammer.
Das Ergebnis ist der ausgeklammerte Ausdruck 
[equations_algebra_16_2]
Dies vereinfacht die Bearbeitung des Ausdrucks und macht ihn übersichtlicher.
',9);
INSERT INTO "MathSubchapterContent" VALUES (18,8,'[bold]Quadratische Ausdrücke[/bold]
Ein quadratischer Ausdruck ist ein mathematischer Ausdruck, bei dem die Variable x zum Quadrat vorkommt, also [bold]x²[/bold].
Quadratische Ausdrücke haben die allgemeine Form:
[equations_algebra_12]
Hier stehen [bold]a[/bold], [bold]b[/bold], und [bold]c[/bold] für feste Zahlen (Konstanten). 
[continue]
[quiz_1]
[continue]
Quadratische Ausdrücke begegnen dir nicht nur in der Mathematik, sondern auch in deinem Berufsalltag, zum Beispiel wenn du die Fläche eines Raums oder das Volumen von Behältern berechnen musst.',7);
INSERT INTO "MathSubchapterContent" VALUES (19,9,'[bold]Einführung in Bruchrechnen[/bold]
Bruchrechnen hilft uns, Teile eines Ganzen zu beschreiben. 
Ein beliebtes Beispiel dafür ist eine Pizza:
[equations_algebra_19]
Die Pizza wurde in 4 Stücke geschnitten, und ein Viertel davon ist noch übrig.
So würden wir unsere Pizza als Bruch darstellen:
[equations_algebra_18]
Der Zähler zeigt an, wie viele Teile wir haben, und der Nenner zeigt, in wie viele Teile das Ganze aufgeteilt ist.
[bgcolor-block=#e3e3e3]Brüche können auch als einfacher Text geschrieben werden, zum Beispiel 1/4.[/bgcolor-block]
[continue]
[bold]Wie würdest du das Bild als Bruch darstellen?[/bold]
[equations_algebra_20]
[quiz_1]
[continue]
[bold]Erklärung[/bold]
Der Bruch [bold]4/9[/bold] bedeutet, dass [bold]4[/bold] von insgesamt [bold]9[/bold] Teilen farbig sind.
',1);
INSERT INTO "MathSubchapterContent" VALUES (20,9,'[bold]Brüche multiplizieren und dividieren[/bold]

Beim [bold]Multiplizieren[/bold] von Brüchen multiplizierst du die Zähler miteinander und die Nenner miteinander.
[equations_algebra_21]
[bold]Ergebnis[/bold]
[equations_algebra_22]
[continue]
Beim [bold]Dividieren[/bold] von Brüchen drehst du den zweiten Bruch um (das nennt man den Kehrwert) und multiplizierst dann.
[equations_algebra_23]
[bold]Ergebnis[/bold]
[equations_algebra_24]
[continue]
[bgcolor-block=#e3e3e3]Der Kehrwert eines Bruchs entsteht, indem der Zähler und der Nenner vertauscht werden: 
Aus Division wird Multiplikation.[/bgcolor-block]',2);
INSERT INTO "MathSubchapterContent" VALUES (21,9,'[bold]Brüche addieren und subtrahieren[/bold]
Um Brüche zu [bold]addieren[/bold], müssen sie denselben Nenner haben. 
Wenn sie das nicht haben, bringst du sie auf einen gemeinsamen Nenner.
Ein gemeinsamer Nenner ist eine Zahl, durch die sich beide Nenner der Brüche ohne Rest teilen lassen.
[equations_algebra_27]
Der kleinste gemeinsame Nenner von [bold]4[/bold] und [bold]2[/bold] ist [bold]4[/bold].
Um auf den gemeinsamen Nenner zu kommen, musst du den Bruch mit 2 erweitern, damit der Nenner 4 wird.
[equations_algebra_28]
Nachdem du die Brüche auf einen gemeinsamen Nenner gebracht hast, addierst du nur noch die Zähler.
[equations_algebra_29]
[continue]
Beim [bold]Subtrahieren[/bold] führst du die gleichen Schritte aus, nur dass du die Zähler voneinander abziehst.
[equations_algebra_30]
Finde zuerst den gemeinsamen Nenner. 
Der kleinste gemeinsame Nenner von [bold]3[/bold] und [bold]4[/bold] ist [bold]12[/bold].
[equations_algebra_31]
Nun kannst du die Zähler subtrahieren:
[equations_algebra_32]
[equations_algebra_33]
[continue]
Jetzt hast du die Grundlagen der Algebra aufgefrischt und kannst tiefer in die fachspezifische Mathematik eintauchen.',3);
INSERT INTO "MathSubchapterContent" VALUES (23,10,'[underline]Metrische Einheiten[/underline]

[bold]Was sind metrische Einheiten?[/bold]
Das metrische System ist ein weltweit verbreitetes Maßsystem, das auf dem Meter als Grundeinheit und den Zahlen 10, 100 und 1000 basiert.
[equations_measure_welcome]
[continue]
[bold]Längeneinheiten[/bold]
Länge misst den Abstand zwischen zwei Punkten. Beispiele dafür sind Millimeter, Zentimeter, Meter und Kilometer.
Im metrischen System gibt es verschiedene Längeneinheiten, von denen die folgenden am häufigsten verwendet werden:
[bold]Millimeter (mm)[/bold]
[bold]Zentimeter (cm)[/bold]
[bold]Dezimeter (dm)[/bold]
[bold]Meter (m)[/bold]
[bold]Kilometer (km)[/bold]
Umrechnung Längenmaße
[equations_measure_1]
[continue]
[bold]Flächeneinheiten[/bold]
Flächeneinheiten messen den Raum, den eine Fläche in zwei Dimensionen einnimmt. 
Hier sind die gängigsten Flächeneinheiten im metrischen System:
[bold]Quadratmillimeter (mm²)[/bold]
[bold]Quadratzentimeter (cm²)[/bold]
[bold]Quadratdezimeter (dm²)[/bold]
[bold]Quadratmeter (m²)[/bold]
[bold]Ar (a)[/bold] für kleine Flächen wie ein Gartengrundstück
[bold]Hektar (ha)[/bold] für große Flächen wie Felder
[bold]Quadratkilometer (km²)[/bold]
Umrechnung Flächenmaße
[equations_measure_4]
',1);
INSERT INTO "MathSubchapterContent" VALUES (24,10,'[bold]Volumeneinheiten[/bold]
Volumen misst den Raum, den ein Körper in drei Dimensionen einnimmt. 
Dafür gibt es zwei gängige Einheiten im metrischen System:
[bold]Liter[/bold]
Liter ist die gängige Einheit für Flüssigkeiten und kleinere Volumen im Alltag.
[bold]Milliliter (ml)[/bold]
[bold]Zentiliter (cl)[/bold]
[bold]Deziliter (dl)[/bold]
[bold]Liter (l)[/bold]
Schau dir mal den Messbecher zuhause an – dort findest du Angaben zu Litern und Millilitern, manchmal auch Dezilitern.
[equations_measure_2] 
Die Umrechnung zwischen den Litereinheiten funktioniert ähnlich wie bei Längeneinheiten.
[equations_measure_5]
[continue]
[bold]Kubik[/bold]
Kubikeinheiten werden verwendet, um das Volumen von Körpern in drei Dimensionen zu messen.
[bold]Kubikmillimeter (mm³)[/bold]
[bold]Kubikzentimeter (cm³)[/bold]
[bold]Kubikdezimeter (dm³)[/bold]
[bold]Kubikmeter (m³)[/bold]
Die Umrechnung ist etwas anders als bei Litereinheiten.
Beim Umrechnen von Kubikeinheiten musst du den Umrechnungsfaktor dreimal anwenden, da Volumen in drei Dimensionen gemessen wird.
Der Umrechnungsfaktor is also immer [bold]1000[/bold]
Umrechnung Volumenmaße - Kubik
[equations_measure_3]
[continue]
[bold]Zeiteinheiten[/bold]
Anders als die metrischen Einheiten, die auf dem Dezimalsystem (Basis 10) beruhen, sind Zeiteinheiten historisch gewachsen und folgen meist der Basis 60 und 12. 
Diese Einheiten sind seit langem in der Menschheitsgeschichte verankert und strukturieren unseren Alltag.
[bold]60 Sekunden = 1 Minute[/bold]
[bold]60 Minuten = 1 Stunde[/bold]
[bold]24 Stunden = 1 Tag[/bold]
[bold]7 Tage = 1 Woche[/bold]
[bold]12 Monate = 1 Jahr[/bold]
Diese Einheiten werden weltweit genutzt, um Zeitabschnitte zu messen und unseren Tagesablauf, Wochenrhythmus und Jahresverlauf zu organisieren.
[equations_measure_6]
',2);
INSERT INTO "MathSubchapterContent" VALUES (25,11,'[underline]Imperiale Maßeinheiten[/underline]
Das imperiale Maßsystem wird in einigen Ländern, wie den USA, verwendet. 
Im Gegensatz zum metrischen System basiert es nicht auf der Zahl 10. 
Stattdessen nutzt es unterschiedliche Umrechnungsfaktoren für verschiedene Einheiten. 
Im Handwerk spielt das imperiale System eine wichtige Rolle, insbesondere die Einheit Zoll (Inch), da sie häufig zur Angabe von Gewinden, Rohrdurchmessern und Werkzeuggrößen verwendet wird.
[equations_measure_imperial]
[continue]
[bold]Längeneinheiten[/bold]
Viele der Längeneinheiten im imperialen System basieren auf historischen Körpermaßen, wie dem Fuß, der Elle und der Handbreite, und wurden im Laufe der Zeit standardisiert.
[bold]1 Inch (Zoll)[/bold] = [bold]1/12 Foot[/bold] (Fuß)
[bold]1 Foot (Fuß)[/bold] = [bold]12 Inches[/bold]
[bold]1 Yard[/bold] = [bold]3 Foot[/bold] (Fuß)
[bold]1 Mile (Meile)[/bold] = [bold]1760 Yards[/bold]
[bgcolor-block=#e3e3e3]Der Yard wurde im Mittelalter als Distanz definiert, die dem Abstand der Nasenspitze eines Königs zu seinem ausgestreckten Daumen entspricht, aber auch er wurde später standardisiert.[/bgcolor-block]
[continue]
[bold]Maßeinheiten[/bold]
Die imperialen Masseeinheiten haben ihren Ursprung in historischen Handels- und Marktpraktiken. 
Einheiten wie Ounce, Pound, Stone, Hundredweight und Ton wurden im Laufe der Zeit standardisiert, um die genaue Messung und den Handel von Waren zu ermöglichen.
[bold]1 Ounce (oz)[/bold] = [bold]1/16 Pound[/bold]
[bold]1 Pound (lb)[/bold] = [bold]16 Ounces[/bold]
[bold]1 Stone[/bold] = [bold]14 Pounds[/bold] (Fuß)
[bold]1 Ton[/bold] = [bold]2240 Pounds[/bold]
[continue]
[bold]Volumeneinheiten[/bold]
Auch die folgenden Einheiten wurden durch den Handel geprägt und später standardisiert, um konsistente Messungen zu gewährleisten.
[bold]1 Fluid Ounce (fl oz)[/bold] = [bold]1/8Cup[/bold]
[bold]1 Cup (lb)[/bold] = [bold]8 Fluid Ounces[/bold]
[bold]1 Pint[/bold] = [bold]2 Cups[/bold]
[bold]1 Quart[/bold] = [bold]2 Pints[/bold]
[bold]1 Gallon[/bold] = [bold]4 Quarts[/bold]
[bgcolor-block=#e3e3e3]Die Größen der imperialen Volumeneinheiten können je nach Land unterschiedlich sein; so ist beispielsweise ein britisches Pint größer als ein US-Pint, ebenso wie der britische Gallon etwa 20 % mehr fasst als der US-Gallon. Diese Unterschiede resultieren aus unterschiedlichen regionalen Standardisierungen.[/bgcolor-block] 
',1);
INSERT INTO "MathSubchapterContent" VALUES (26,11,'[bold]Zoll (Inch) als Maßeinheit[/bold]
Der Zoll (Inch) ist eine wichtige Maßeinheit im SHK-Handwerk, da Gewinde, Rohrdurchmesser und viele Werkzeuge traditionell in Zoll angegeben werden. 
Diese Maßeinheit hat sich im Handwerk etabliert, weil sie weltweit standardisiert ist und in vielen internationalen Produkten und Systemen verwendet wird. 
Im Folgenden findest du eine Umrechnungstabelle mit gängigen Zollmaßen:
[equations_measure_big]',2);
INSERT INTO "MathSubchapterContent" VALUES (27,12,'[underline]Einheiten kombinieren und berechnen[/underline]
Manche physikalische Größen bestehen aus mehreren anderen, die miteinander in Beziehung stehen. 
Wenn du zwei dieser Größen kennst, kannst du oft eine dritte berechnen. Zum Beispiel setzt sich die Geschwindigkeit aus der Strecke und der Zeit zusammen, die Dichte aus Masse und Volumen, und der Druck aus Kraft und Fläche. 
Wie genau, zeigen wir dir im folgenden Abschnitt.
[continue]
[bold]Geschwindigkeit berechnen[/bold]
[bgcolor-line=#dfebed]Geschwindigkeit = Strecke / Zeit[/bgcolor-line]
[equations_measure_8]
[bgcolor-block=#e3e3e3]Die Bezeichnungen in Formeln stammen oft aus lateinischen Wörtern oder griechischen Buchstaben, um wissenschaftliche Begriffe international verständlich zu kennzeichnen.[/bgcolor-block]
Die Berechnung der Geschwindigkeit nutzt du zum Beispiel, um den Fluss von Luft oder Wasser in Lüftungs- und Rohrleitungssystemen zu bestimmen.
[bold]Beispiel[/bold]
Ein Wasserstrahl benötigt 5 Sekunden, um ein 10 Meter langes Rohr zu durchfließen. 
Wie groß ist die Geschwindigkeit des Wasserstrahls?
[equations_measure_9]
[continue]
[bold]Dichte berechnen[/bold]
[bgcolor-line=#dfebed]Volumen = Masse / Dichte[/bgcolor-line]
[equations_measure_10]
[bgcolor-block=#e3e3e3]Das ρ (Rho) steht für Dichte und wurde aus dem griechischen Alphabet gewählt, um Verwechslungen mit "D", das oft für Durchmesser genutzt wird, zu vermeiden.[/bgcolor-block]
Der Druck auf die Dichtung beträgt 5000 N/m².
Die Dichte gibt an, wie viel Masse in einem bestimmten Volumen enthalten ist. Sie wird berechnet, indem man die Masse eines Objekts durch sein Volumen teilt. 
[bold]Beispiel[/bold]
Ein Kupferrohr hat eine Masse von 4 kg und ein Volumen von 0,5 Litern. Wie groß ist die Dichte des Kupferrohrs?
[equations_measure_11]
Die Dichte des Kupferrohrs beträgt 8 kg/L.
Das bedeutet, dass 1 Liter flüssiges Kupfer 8 Kilogramm wiegen würde, was im Vergleich zu Wasser mit einer Dichte von 1 kg/L die hohe Dichte des Materials veranschaulicht.
[continue]
[bold]Kraft berechnen berechnen[/bold]
[bgcolor-line=#dfebed]Kraft = Druck × Fläche[/bgcolor-line]
[equations_measure_12]
Die Berechnung der Kraft wird verwendet, um beispielsweise den Druck auf Dichtungen und Verbindungen in Rohrleitungssystemen zu überprüfen und sicherzustellen, dass sie den Belastungen standhalten.
[bold]Beispiel[/bold]
Eine Wasserleitung übt eine Kraft von 50 Newton auf die Fläche einer Dichtung aus, die 0,01 Quadratmeter groß ist. 
Welcher Druck entsteht auf dieser Dichtung?
[equations_measure_13]


',3);
INSERT INTO "MathSubchapterContent" VALUES (32,14,'[underline]Einführung in die Mechanik[/underline]

Die Mechanik erklärt, wie Kräfte und Bewegungen zusammenwirken – eine wichtige Grundlage, um sicherzustellen, dass eure Installationen zuverlässig und sicher funktionieren.
[equations_mechanic_welcome]',1);
INSERT INTO "MathSubchapterContent" VALUES (33,14,'[bold]Was ist Mechanik?[/bold]
Mechanik ist ein Teilgebiet der Physik, das sich mit dem Verhalten von Körpern unter dem Einfluss von Kräften beschäftigt. 
Sie untersucht, wie Kräfte auf Objekte wirken, wie diese Objekte sich bewegen, wie sie sich verformen und wie sie im Gleichgewicht bleiben. 
Mechanik ist dabei in viele Bereiche unterteilt, darunter die Kinematik (Bewegungslehre), die Statik (Lehre vom Gleichgewicht) und die Dynamik (Lehre von den Kräften und Bewegungen).
[continue]
[bold]Kinematik[/bold]
Bezieht sich auf die Beschreibung der Bewegung von Objekten, ohne die Kräfte zu berücksichtigen, die die Bewegung verursachen.
[equations_mechanic_1] 
Hier wird untersucht, wie sich ein Objekt bewegt (z.B. Geschwindigkeit, Beschleunigung), aber nicht warum.
[continue]
[bold]Statik[/bold]
Untersucht Körper im Gleichgewicht, bei denen die Summe der auf den Körper wirkenden Kräfte null ist. 
Das bedeutet, der Körper ist in Ruhe oder bewegt sich konstant mit gleichbleibender Geschwindigkeit. 
In der Statik werden auch Momente (Drehkräfte) analysiert, um sicherzustellen, dass eine Konstruktion stabil bleibt.
[continue]
[bold]Dynamik[/bold]
Bezieht sich auf die Kräfte, die auf Körper wirken und ihre Bewegung verändern. 
Dies umfasst sowohl die Beschleunigung eines Körpers durch eine Kraft als auch die Analyse von Bewegung in komplexeren Systemen, z.B. Schwingungen.
[equations_mechanic_2]',2);
INSERT INTO "MathSubchapterContent" VALUES (34,14,'[bold]Thermische Ausdehnung von Materialien[/bold]
Thermische Ausdehnung bedeutet, dass Materialien größer werden (sich ausdehnen), wenn sie erwärmt werden, und kleiner (sich zusammenziehen), wenn sie abkühlen. 
Dies geschieht, weil die Teilchen im Material bei Wärme mehr Energie bekommen und sich schneller bewegen, wodurch sie mehr Platz benötigen. 
  
  Grafik fehlt
  
Es gibt jedoch eine wichtige Ausnahme: Wasser verhält sich anders, wenn es sich dem Gefrierpunkt nähert.
[continue]
[bold]Anomalie des Wassers[/bold] 
Wasser verhält sich bei der thermischen Ausdehnung besonders. Es hat bei 4°C seine größte Dichte und zieht sich bis zu dieser Temperatur zusammen. 
Wird es weiter abgekühlt, dehnt es sich beim Gefrieren aus, wodurch Eis mehr Platz einnimmt und auf Wasser schwimmt. 
Dieses Verhalten ist wichtig, da es bei der Installation von Rohrleitungen und anderen praktischen Anwendungen berücksichtigt werden muss.

Grafik fehlt

[continue]
[bold]Längenänderung berechnen[/bold]
Um heraus zufinden, um wie viel sich die Länge eines Materials ändert wenn die Temperatur steigt oder fällt, kannst du diese Formel verwenden:
[equations_mechanic_Formel]
Die Formel mag auf den ersten Blick verwirrend wirken, aber wir erklären Schritt für Schritt, was die einzelnen Zeichen bedeuten.
[continue]
[bold]Δ (Delta)[/bold]
Das griechische Symbol Δ steht für eine [bold]Änderung[/bold] oder [bold]Differenz[/bold]. 
In diesem Fall bezieht es sich auf die Längenänderung des Materials. 
Es zeigt an, wie viel länger oder kürzer das Material wird, wenn sich die Temperatur ändert.

[bold]L₀[/bold]
Dies ist die ursprüngliche Länge des Materials, bevor die Temperaturveränderung eintritt. 
Der Index "0" (Null) zeigt an, dass es sich um den Ausgangswert handelt, also die Länge vor der Erwärmung oder Abkühlung.

[bold]α (Alpha)[/bold] 
Der [bold]lineare Ausdehnungskoeffizient[/bold] des Materials. 
Dieser Wert gibt an, wie stark ein Material auf eine Temperaturänderung reagiert, also wie sehr es sich ausdehnt oder zusammenzieht. 
Jeder Stoff hat einen spezifischen α-Wert, der in Einheiten von mm/ (m x K) angegeben wird. Diese Werte findest du in deinem Tabellenbuch.

[bold]ΔT[/bold]
Die Temperaturänderung, die sich aus der Differenz zwischen der Endtemperatur und der Anfangstemperatur ergibt. 
Diese Temperaturen stammen normalerweise aus Messungen, technischen Datenblättern oder werden in einer Aufgabenstellung vorgegeben.',3);
INSERT INTO "MathSubchapterContent" VALUES (35,14,'[bold]Beispielrechnung[/bold]
Ein Kupferrohr hat eine Länge von 15 Metern und wird in einer Umgebung installiert, wo die Temperatur von 15°C auf 75°C steigt. 
Du möchtest berechnen, um wie viel sich das Rohr aufgrund dieser Temperaturänderung ausdehnen wird.
[continue]
[bold]Gegeben[/bold]
Ursprüngliche Länge des Rohrs(L₀): 15 Meter
Anfangstemperatur:: 15°C
Endtemperatur: 75°C
Ausdehnungskoeffizient für Kupfer (α): 0,0165 mm/ (m x K)
(dieser Wert kann im Tabellenbuch nachgeschlagen werden)
[continue]
[bold]Schritte[/bold]
1. Berechnung der Temperaturveränderung

[equations_mechanic_3]

2. Einsetzen der Werte in die Formel
[equations_mechanic_4]
3.Ergebnis
Das Kupferrohr dehnt sich um [bold]14,85 Millimeter aus[/bold].',4);
INSERT INTO "MathSubchapterContent" VALUES (36,15,'[underline] Kräfte und ihre Wirkungen[/underline]

Kräfte bestimmen, wie Dinge sich bewegen, halten oder verformen.
[equations_mechanic_5_welcome]
In diesem Abschnitt lernst du, wie Kräfte  in deinem Berufsalltag wirken und berechnet werden.
',5);
INSERT INTO "MathSubchapterContent" VALUES (37,15,'[bold]Was ist eine Kraft?[/bold]
Eine Kraft ist eine physikalische Größe, die Dinge in Bewegung bringt, sie schneller oder langsamer macht, ihre Richtung ändert oder ihre Form verändert.
Zum Beispiel, wenn du ein Rohr in eine Halterung drückst, setzt du eine Kraft ein, um es sicher zu befestigen. Oder wenn du einen Ball wirfst, bewegst du ihn durch die Luft. 
[equations_mechanic_5]
Kräfte sind überall um uns herum und beeinflussen ständig, wie sich Dinge bewegen, stoppen oder ihre Form ändern.
[continue]
[bold]Arten von Kräften[/bold]

[bold]Zugkraft[/bold] entsteht, wenn eine Kraft auf ein Material wirkt und versucht, es zu dehnen oder auseinanderzuziehen. 
In der Praxis treten Zugkräfte oft in Seilen, Ketten oder Stahlkabeln auf, die unter Spannung stehen, zum Beispiel bei einem Kran, der Lasten hebt.
[equations_mechanic_6]
[continue]
[bold]Druckkraft[/bold] entsteht, wenn eine Kraft auf ein Material drückt und es versucht, zusammenzudrücken oder zu verkürzen. 
Ein einfaches Beispiel ist das Gewicht eines Gebäudes, das auf den tragenden Wänden lastet. 
Die Wände müssen diese Druckkräfte aushalten, um stabil zu bleiben.
[continue]
[bold]Reibungskraft[/bold] tritt auf, wenn zwei Oberflächen aneinander reiben und die Bewegung hemmen. 
[equations_mechanic_7]
Ein Beispiel ist das Schieben einer schweren Kiste über den Boden, wobei die Reibungskraft die Bewegung der Kiste verlangsamt.
[continue]
Die [bold]Schwerkraft[/bold]  ist die Kraft, mit der die Erde alle Objekte zu sich hinzieht. 
Sie ist der Grund, warum ein Hammer, wenn du ihn fallen lässt, nach unten gezogen wird und auf den Boden fällt. 
Die Schwerkraft sorgt auch dafür, dass alle Objekte ein Gewicht haben – je mehr Masse ein Gegenstand hat, desto stärker wirkt die Schwerkraft auf ihn.
[equations_mechanic_8]',6);
INSERT INTO "MathSubchapterContent" VALUES (38,15,'[bold]Berechnung von Kräften[/bold]

[bold]Zugkraft (Fz)[/bold]
Die Zugkraft wird berechnet, um zu verstehen, wie viel Kraft benötigt wird, um Materialien zu dehnen oder zu heben.
[bgcolor-line=#dfebed]Fz = m x a[/bgcolor-line]

[bold]Fz[/bold] = Zugkraft (in Newton, N)
[bold]m[/bold] = Masse (in Kilogramm, kg)
[bold]a[/bold] = Beschleunigung (in Metern pro Sekunde zum Quadrat, m/s²)

[bold]Beispiel:[/bold]
Wenn ein Stahlseil mit einer Masse von 50 kg angehoben wird und eine Beschleunigung von 2 m/s² erzeugt werden soll, beträgt die benötigte Zugkraft:
[bgcolor-line=#dfebed]Fz = 50 kg x 2 m/s² = 100 N[/bgcolor-line]

Das bedeutet, dass eine Zugkraft von [bold]100 Newton[/bold] aufgebracht werden muss.

[continue]
[bold]Druckkraft (Fd)[/bold]
Die Druckkraft ist wichtig, um sicherzustellen, dass Materialien stabil bleiben, insbesondere in tragenden Strukturen.
[bgcolor-line=#dfebed]Fd = p x A[/bgcolor-line]

[bold]Fd[/bold] = Druckkraft (in Newton, N)
[bold]p[/bold] = Druck (in Pascal, Pa)
[bold]A[/bold] = Fläche (in Quadratmetern, m²)

[bold]Beispiel:[/bold]
Ein Mauerwerk hat eine Fläche von 2 m² und der Druck auf die Wände beträgt 500 Pa. Die Druckkraft beträgt:
[bgcolor-line=#dfebed]Fd = 500 Pa x 2 m² = 1000 N[/bgcolor-line]

Das bedeutet, die Wände müssen eine Druckkraft von [bold]1000 Newton[/bold] aushalten.

[continue]
[bold]Reibungskraft (Fr)[/bold]
Die Reibungskraft wird berechnet, um die Kraft zu bestimmen, die benötigt wird, um ein Objekt in Bewegung zu setzen oder zu halten.
[bgcolor-line=#dfebed]Fr = μ x Fn[/bgcolor-line]

[bold]Fr[/bold] = Reibungskraft (in Newton, N)
[bold]μ[/bold] = Reibungskoeffizient (dimensionslos)
[bold]Fn[/bold] = Normalkraft (in Newton, N)

[bold]Beispiel:[/bold]
Eine Kiste wird über einen Boden geschoben, wobei eine Normalkraft von 300 N wirkt und der Reibungskoeffizient 0,4 beträgt. Die Reibungskraft beträgt:
[bgcolor-line=#dfebed]Fr = 0,4 x 300 N = 120 N[/bgcolor-line]

Das bedeutet, es muss eine zusätzliche Kraft von [bold]120 Newton[/bold] aufgebracht werden, um die Kiste zu bewegen.',7);
INSERT INTO "MathSubchapterContent" VALUES (40,16,'[underline]Drehmoment und Hebelgesetz[/underline]

In diesem Abschnitt schauen wir uns an, wie das Drehmoment funktioniert und wie Hebel unsere Kraft verstärken können.



[equations_mechanic_10_welcome]',9);
INSERT INTO "MathSubchapterContent" VALUES (41,16,'[bold]Drehmoment und Momentenberechnung[/bold]
Das Drehmoment gibt an, wie stark eine Kraft einen Körper um einen Drehpunkt dreht. 
Es wird oft als "Drehkraft" bezeichnet und wird beispielsweise beim Festziehen oder Lösen von Schrauben genutzt.
Die Formel für das Drehmoment lautet:
[equations_mechanic_12]

[bold]M[/bold]: Das Drehmoment, gemessen in Newtonmeter (Nm), beschreibt, wie stark eine Kraft etwas um einen Drehpunkt dreht.

[bold]F[/bold]: Die Kraft, gemessen in Newton (N), die auf den Hebelarm ausgeübt wird.

[bold]r[/bold]: Der Hebelarm, gemessen in Metern (m), ist der Abstand zwischen dem Drehpunkt und dem Punkt, an dem die Kraft auf den Hebel ausgeübt wird.

Je länger der Hebelarm ist, desto weniger Kraft wird benötigt, um das gleiche Drehmoment zu erzeugen. 
Dies ist der Grund, warum lange Schraubenschlüssel oft effizienter sind als kurze – sie erzeugen mit weniger Kraft mehr Drehmoment.

[equations_mechanic_11]
[continue]
[bold]Hebelgesetz und Drehmoment[/bold]
Ein Hebel ist ein festes Objekt, das sich um einen festen Punkt, den Drehpunkt, bewegen kann. 
Das Hebelgesetz erklärt, wie Kräfte über einen Hebelarm wirken, um Lasten zu bewegen. 
Es wird verwendet, um zu verstehen, wie kleine Kräfte große Wirkungen erzielen können. 
Die Grundformel lautet:
[equations_mechanic_12_1]

Dabei steht [bold]F₁[/bold] und [bold]F₂[/bold] für die Kräfte, die auf die Hebelarme wirken, und [bold]l₁[/bold] und [bold]l₂[/bold] für die Länge der Hebelarme.
Je länger der Hebelarm, desto weniger Kraft ist nötig, um die gleiche Last zu bewegen. ',10);
INSERT INTO "MathSubchapterContent" VALUES (42,16,'[bold]Einseitiger Hebel[/bold]
Ein einseitiger Hebel hat den [bold]Drehpunkt[/bold] am Ende des Hebels, und die [bold]Kraft[/bold] wird nur auf einer Seite des Drehpunkts angewendet. 
Ein gutes Beispiel ist der Schraubenschlüssel.
[equations_mechanic_13_big]
Beim Festziehen einer Schraube ermöglicht der Hebelarm [bold](Kraftarm)[/bold] des Schraubenschlüssels, dass du mit weniger Kraft eine stärkere Drehbewegung erzeugen kannst.

[continue]
[bold]Beispiel[/bold]
Wenn du auf einen Schraubenschlüssel eine Kraft von [bold]200 N[/bold] (ca. 20,39 kg) anwendest und der Hebelarm [bold]0,3 m[/bold] lang ist, möchten wir das erzeugte Drehmoment berechnen. 
Dazu verwenden wir die Grundformel des Drehmoments:
[equations_mechanic_12]
[continue]
Jetzt setzen wir die gegebenen Werte in die Formel ein und berechnen das Drehmoment.
[equations_mechanic_14]

Mit einer Kraft von 200 N und einem Hebelarm von 0,3 m erzeugst du ein Drehmoment von [bold]60 Nm[/bold], was stark genug ist, um die Schraube festzuziehen.
',11);
INSERT INTO "MathSubchapterContent" VALUES (43,16,'[bold]Zweiseitiger Hebel[/bold]
Bei einem zweiseitigen Hebel liegt der [bold]Drehpunkt[/bold] zwischen zwei Hebelarmen, dem [bold]Kraftarm[/bold] und dem [bold]Lastarm[/bold]. 
Nehmen wir zum Beispiel eine Kneifzange, bei der die Kräfte auf beiden Seiten des Drehpunkts wirken.
[equations_mechanic_15_big]
[continue]
[bold]Beispiel[/bold]
Bei einer Kneifzange wendest du auf der einen Seite eine Kraft von [bold]500 N[/bold] mit einem Kraftarm von [bold]0,5 m[/bold] an. 
Nun möchten wir die Kraft berechnen, die auf der anderen Seite der Zange wirkt, wo der Lastarm [bold]0,1 m[/bold] lang ist.
Dazu verwenden wir die Grundformel des Hebelgesetzes:
[equations_mechanic_12_1]
[continue]
Da wir [bold]F₁[/bold] berechnen möchten, stellen wir die Formel so um, dass [bold]F₁[/bold] isoliert ist:
[equations_mechanic_16]
[continue]
Jetzt setzen wir die gegebenen Werte ein und berechnen die wirkende Kraft.
[equations_mechanic_17]

Mit einer Kraft von 500 N erzeugst du so eine fünffach größere Kraft von [bold]2500 N[/bold] auf der anderen Seite.',12);
INSERT INTO "MathSubchapterContent" VALUES (45,17,'[underline]Gleichgewicht von Kräften[/underline]

Das Gleichgewicht von Kräften sorgt dafür, dass ein Körper stabil bleibt und sich nicht bewegt oder kippt.
[equations_mechanic_18_welcome]
Bei der Montage von Heizkörpern oder Rohrleitungen, muss das Kräftegleichgewicht beachtet werden, um zu gewährleisten, dass alles fest und sicher montiert ist.',14);
INSERT INTO "MathSubchapterContent" VALUES (46,17,'[bold]Was ist Gleichgewicht von Kräften?[/bold]
Damit ein Körper stabil bleibt und sich nicht bewegt, müssen alle auf ihn wirkenden Kräfte im Gleichgewicht sein.
[equations_mechanic_19]
Das bedeutet, dass die Summe aller Kräfte, die auf den Körper wirken, null ist. 
Wir sprechen dabei vom [bold]Kräftegleichgewicht[/bold] und [bold]Momentengleichgewicht[/bold].
[continue]
[bold]Kräftegleichgewicht[/bold]
Das Kräftegleichgewicht liegt vor, wenn die Summe aller auf einen Körper wirkenden Kräfte null ist. 
Das bedeutet, dass der Körper in Ruhe bleibt oder sich mit gleichmäßiger Geschwindigkeit bewegt, ohne zu beschleunigen oder abzubremsen.

Die Formel für das Kräftegleichgewicht lautet:
[equations_mechanic_20]
[bold]Σ[/bold]: Das Symbol Sigma steht für die Summe. 
Es bedeutet, dass alle Kräfte, die auf den Körper wirken, addiert werden.

[bold]F[/bold]⃗:  Der Pfeil über dem F zeigt an, dass Kraft eine Richtung hat (Vektor). 
Jede Kraft hat also eine Stärke und eine Richtung.

[bold]0[/bold]: Das Ergebnis der Summe aller Kräfte muss null sein, damit sich der Körper nicht bewegt. 
Das heißt, alle Kräfte heben sich gegenseitig auf.
[continue]
[bold]Momentengleichgewicht[/bold]
Die Summe aller Drehmomente um einen Punkt muss ebenfalls null sein, damit sich der Körper nicht dreht.

Formel für das Momentengleichgewicht:
[equations_mechanic_21]
[bold]Σ[/bold]: Auch hier steht das Sigma für die Summe aller Momente, die auf den Körper wirken.
[bold]⃗M[/bold]: Dies ist der Momentenvektor. Ein Moment hat eine Richtung (dreht im oder gegen den Uhrzeigersinn) und eine Größe.
[bold]0[/bold]: Die Summe aller Drehmomente muss null sein, damit sich der Körper nicht dreht.
[continue]
[bold]Was ist ein Moment?[/bold]
Im Alltag bedeutet "Moment" oft eine kurze Zeitspanne, wie in "Warte einen Moment". 

In der Physik hingegen hat "Moment" eine andere Bedeutung: Es beschreibt die [bold]Drehwirkung einer Kraft[/bold].

Ein Moment entsteht, wenn eine Kraft einen Körper drehen will, statt ihn nur gerade zu schieben. 
[continue]
Diese Drehwirkung hängt von zwei Faktoren ab:

Größe der [bold]Kraft[/bold] (F): Wie stark ist die Kraft?
Abstand zum [bold]Drehpunkt[/bold] (d): Wie weit entfernt vom Drehpunkt wirkt die Kraft?

Die Formel für das Moment lautet:
[equations_mechanic_22]

[bold]M[/bold]: Das Moment (Drehwirkung).

[bold]F[/bold]: Die Kraft, die auf den Körper wirkt.

[bold]d[/bold]: Der Abstand vom Drehpunkt zur Stelle, an der die Kraft wirkt (Hebelarm).',15);
INSERT INTO "MathSubchapterContent" VALUES (47,17,'[bold]Beispielrechnung[/bold]

Du installierst einen Heizkörper, der an der Wand hängt und ein Gewicht von 300 N hat. 
Der Heizkörper wird an zwei Halterungen befestigt, die symmetrisch angebracht sind. 
Du möchtest sicherstellen, dass beide Halterungen das Gewicht gleichmäßig tragen, sodass keine zusätzliche Belastung auf einer Halterung liegt.
[continue]
[bold]Gegeben[/bold]
Das [bold]Gesamtgewicht[/bold] des Heizkörpers (Kraft nach unten) ist [bold]300 N[/bold].
[bold]Zwei[/bold] gleich große Halterungen tragen den Heizkörper.
Die Halterungen sind [bold]symmetrisch[/bold] unter dem Heizkörper angebracht.
[continue]
[bold]Berechnung[/bold]
Wir berechnen nun, wie viel Kraft jede Halterung tragen muss, um den 300 N schweren Heizkörper im Gleichgewicht zu halten.
Die Grundformel für das Kräftegleichgewicht lautet:
[equations_mechanic_20]
Das bedeutet, dass die auf den Heizkörper wirkenden Kräfte, die von den beiden Halterungen aufgebracht werden, die nach unten gerichtete Gewichtskraft ausgleichen müssen.
[continue]
1.  Aufstellen der Gleichung
[equations_mechanic_23]
Die Kräfte der beiden Halterungen ([bold]𝐹[/bold] Halterung1 und [bold]𝐹[/bold] Halterung2) wirken nach oben und gleichen das Gewicht des Heizkörpers (𝐹Gesamt = 300N) aus, das nach unten wirkt.
[continue]
2. Gleichung vereinfachen
Da die Halterungen [bold]symmetrisch[/bold] unter dem Heizkörper angebracht sind, tragen beide Halterungen die [bold]gleiche Last[/bold]. 
Deshalb können wir die beiden Kräfte in der Gleichung durch eine einzige Kraft( [bold]𝐹[/bold] Halterung) ersetzen:
[equations_mechanic_24]
Die Gleichung wird zu:
[equations_mechanic_25]
[continue]
3. Lösung: 
Umstellen nach 
[bold]𝐹[/bold] Halterung:
[equations_mechanic_26]
[equations_mechanic_27]
[bold]Ergebnis[/bold]
Jede Halterung trägt [bold]150 N[/bold].
[continue]
Das Gleichgewicht der Kräfte stellt sicher, dass alle auf ein Bauteil wirkenden Kräfte ausgeglichen sind.
Dadurch bleiben Installationen stabil, und die Belastungen werden gleichmäßig auf die Befestigungen verteilt.',16);
INSERT INTO "MathSubchapterContent" VALUES (51,19,'[underline]Grundlagen zur Wurzelberechnung[/underline]

In diesem Kurs frischen wir dein Wissen zur Wurzelberechnung auf, damit du sicher und präzise Berechnungen im Berufsalltag durchführen kann.

[equations_algebra_19_1]',1);
INSERT INTO "MathSubchapterContent" VALUES (52,19,'[bold]Was ist eine Quadratwurzel[/bold]

Bestimmt erinnerst du dich noch daran, wie wir das Thema [bold]Quadratische Ausdrücke[/bold] behandelt haben. 
Dabei haben wir das Quadrieren erwähnt, was bedeutet, dass eine Zahl mit sich selbst multipliziert wird. 
Zum Beispiel:
[equations_algebra_34]
Hier wird [bold]4[/bold] mit sich selbst multipliziert, was [bold]16[/bold] ergibt.

Nun kommt das Wurzelzeichen [bold]√[/bold] ins Spiel: 
Die Quadratwurzel ist das Gegenteil vom Quadrieren. 
Sie gibt die Zahl zurück, die quadriert wurde, um die ursprüngliche Zahl zu erhalten. 
[equations_algebra_34]
Das bedeutet, die Quadratwurzel von [bold]16[/bold] ist [bold]4[/bold], weil [bold]4 × 4 = 16[/bold] ist.
[continue]
[bold]Berechnung in der Praxis[/bold]
In der Praxis wird die Quadratwurzel fast immer mit einem Taschenrechner berechnet, besonders bei Zahlen, die keine exakten Quadratzahlen sind. 
Auch für Kubikwurzeln und höhere Wurzeln ist der Taschenrechner das Standardwerkzeug, da diese Berechnungen ohne Hilfsmittel sehr mühsam wären.

So berechnest du eine Quadratwurzel mit dem Taschenrechner:
1.Drücke die [bold]Wurzel-Taste[/bold] auf deinem Taschenrechner und gib dann die [bold]Zahl[/bold] ein, die du berechnen möchtest
Zum Beispiel [bold]21[/bold].
[equations_algebra_36_big]
[continue]
2. Drücke die [bold]=[/bold]-Taste, um das Ergebnis zu erhalten.
[equations_algebra_37_big]
Das Ergebnis aus unserem Beispiel ist [bold]√21 ≈ 4,583[/bold].
[continue]
[bold]Beispielanwendung im Berufsalltag[/bold]',2);
INSERT INTO "MathSubchapterContent" VALUES (53,18,'[underline]Einführung in die Geometrie[/underline]
Geometrie befasst sich mit Formen, Größen, Längen, Flächen und Volumen von Objekten.
[equations_geometrie_welcome] 
Im Handwerk wird Geometrie angewendet, um z.B. Rohrverläufe und Wand- sowie Bodenflächen zu berechnen.',1);
INSERT INTO "MathSubchapterContent" VALUES (54,18,'[underline]Umfang und Flächen berechnen[/underline]
[bold]Was ist der Umfang?[/bold]
Der Umfang einer Figur ist die Gesamtlänge aller Seiten. Man addiert einfach die Längen der Seiten, um den Umfang zu berechnen.
[continue]
[bold]Rechteck[/bold]
[bgcolor-line=#dfebed]Umfang = 2x(Länge + Breite)[/bgcolor-line]
[equations_measure_14]
[continue]
[bold]Quadrat[/bold]
[bgcolor-line=#dfebed]Umfang = 4x Seite[/bgcolor-line]
[equations_measure_15]
[continue]
[bold]Dreieck[/bold]
[bgcolor-line=#dfebed]Umfang = Seite₁ + Seite₂ + Seite₃[/bgcolor-line]
[equations_measure_16]
[continue]
[bold]Vieleck (z.B. Fünfeck)[/bold]
[bgcolor-line=#dfebed]Umfang = Summe aller Seiten[/bgcolor-line]
[equations_measure_17]
[continue]
[bold]Was ist der Flächeninhalt?[/bold]
Der Flächeninhalt gibt an, wie viel Platz eine Figur bedeckt. Die Einheit ist Quadratmeter (m²) oder eine andere quadratische Einheit.
Den Flächeninhalt kann man für verschiedene Formen mithilfe spezifischer Formeln berechnen.
[continue]
[bold]Flächeninhalt von Rechtecken[/bold]
Um die Fläche eines Rechtecks zu berechnen, multipliziere die Länge mit der Breite:
[bgcolor-line=#e7eaf6]Fläche = Länge x Breite[/bgcolor-line]
[equations_measure_18]
[continue]
[bold]Quadrat[/bold]
[bgcolor-line=#e7eaf6]Fläche = Seite x Seite [bold]oder[/bold] Seite²[/bgcolor-line]
[equations_measure_19]
[continue]
[bold]Flächeninhalt von Dreiecken[/bold]
[bgcolor-line=#e7eaf6]Fläche = 1/2 × Grundseite × Höhe[/bgcolor-line]
Die Fläche eines Dreiecks berechnet man, indem man die Länge einer beliebigen Seite als [bold]Grundseite[/bold] wählt, diese mit der dazugehörigen Höhe multipliziert und das Ergebnis durch zwei teilt.
[equations_measure_20]
Die Grundseite ist die Seite, zu der die Höhe im rechten Winkel steht; in Zeichnungen wird oft die „untere“ Seite als Grundseite verwendet.
[continue]
[bold]Flächeninhalt von Parallelogrammen[/bold]
Ein Parallelogramm sieht aus wie ein Rechteck , das zur Seite verzerrt wurde. 
Die Fläche eines Parallelogramms erhält man, indem man die Grundlinie mit der Höhe multipliziert:
[bgcolor-line=#e7eaf6]Fläche = Grundlinie x Höhe[/bgcolor-line]
Die Höhe steht senkrecht zur Grundlinie.
[equations_measure_21]
[continue]
[bold]Flächeninhalt von Trapezen[/bold]
[equations_measure_22]
Die Fläche eines Trapezes berechnet man, indem man die beiden parallelen Seiten addiert, das Ergebnis mit der Höhe multipliziert und durch zwei teilt:
[equations_measure_23]',2);
INSERT INTO "MathSubchapterContent" VALUES (55,20,'[underline]Kreisumfang und Kreisfläche berechnen[/underline]
[bold]Was ist der Umfang eines Kreises?[/bold]
Der Kreisumfang ist die Länge der äußeren Linie eines Kreises, bei dem jeder Punkt auf der Linie den gleichen Abstand zum Mittelpunkt hat.
[equations_measure_24]
[continue]
[bold]Kreisumfang berechnen[/bold]
Um den Umfang zu berechnen, brauchst du den Durchmesser (d) oder den Radius (r) und die Zahl Pi (π), die ungefähr 3,14 ist.
Du berechnest den Kreisumfang mit der Formel
[bgcolor-line=#dfebed]Umfang (U) = 2 x r x π[/bgcolor-line]
oder
[bgcolor-line=#dfebed]Umfang (U) = d x π[/bgcolor-line]
[equations_measure_25]
[continue]
[bold]Wie berechnet man die Fläche eines Kreises?[/bold]
Die Fläche eines Kreises ist der Bereich innerhalb der Kreislinie. Auch hier wendest du π zur Berechnung an:
[bgcolor-line=#dfebed]Kreisfläche = π x Radius²[/bgcolor-line]
[equations_measure_26]
[bgcolor-block=#e3e3e3]
[continue]
Beim Rechnen ist dir bestimmt aufgefallen, dass längere Dezimalzahlen entstehen. 
Das liegt daran, dass π unendlich viele Stellen hat.
Runde dein Ergebnis daher auf zwei Nachkommastellen.[/bgcolor-block] ',3);
INSERT INTO "MathSubchapterContent" VALUES (56,20,'[underline]Kreisbogen und Kreissektor verstehen[/underline]
[bold]Was ist ein Kreisbogen?[/bold]
Ein Kreisbogen ist ein Teil des Umfangs eines Kreises. 
Du kannst die Länge des Kreisbogens berechnen, wenn du den Winkel kennst, der dem Bogen entspricht.
[bgcolor-line=#fdc57b]Länge des Kreisbogens = Winkel/360° x Kreisumfang[/bgcolor-line]
Grafik Formel

Grafik Beispiel

[continue]
[bold]Was ist ein Kreisektor?[/bold]
Ein Kreissektor ist ein „Kuchenstück“ des Kreises, das von zwei Radien und einem Kreisbogen begrenzt wird. 
Um die Fläche eines Kreissektors zu berechnen, brauchst du den Winkel und die Fläche des gesamten Kreises.

[bgcolor-line=#fdc57b]Fläche des Kreisektors = Winkel/360° x Kreisfläche = Winkel/360° x Kreisumfang[/bgcolor-line]
Grafik Formel

Grafik Beispiel',4);
INSERT INTO "MathSubchapterContent" VALUES (57,21,'[bold]Gestreckte Länge berechnen[/bold]

Die gestreckte Länge beschreibt die ursprüngliche Länge eines Werkstücks, bevor es gebogen wird. 
Zum Beispiel, wenn du ein Heizungsrohr biegen musst, um es um eine Ecke zu führen, ist es wichtig zu wissen, wie lang das Rohr vor dem Biegen sein muss, damit es genau passt.
[equations_geometrie_2]
Handwerker und Ingenieure berechnen die gestreckte Länge, um sicherzustellen, dass Werkstücke nach der Biegung immer noch die richtige Länge haben, um ihre Funktion zu erfüllen. 
[equations_geometrie_3]
Dies hilft um unnötige Materialverluste zu vermeiden und die Installation korrekt durchzuführen.',5);
INSERT INTO "MathSubchapters" VALUES (1,2,'Definition von Gleichungen',1);
INSERT INTO "MathSubchapters" VALUES (2,2,'Gleichungen',2);
INSERT INTO "MathSubchapters" VALUES (5,1,'Einführung Algebra',1);
INSERT INTO "MathSubchapters" VALUES (6,1,'Terme und Ausdrücke',2);
INSERT INTO "MathSubchapters" VALUES (7,1,'Variablen und Konstante',3);
INSERT INTO "MathSubchapters" VALUES (8,1,'Quadratische Ausdrücke',4);
INSERT INTO "MathSubchapters" VALUES (9,1,'Bruchrechnung',5);
INSERT INTO "MathSubchapters" VALUES (10,3,'Maßeinheiten - Metrische Maße',1);
INSERT INTO "MathSubchapters" VALUES (11,3,'Maßeinheiten - Imperiale Maße',2);
INSERT INTO "MathSubchapters" VALUES (12,3,'Einheiten kombinieren und brechnen',3);
INSERT INTO "MathSubchapters" VALUES (14,5,'Einführung in die Mechanik',1);
INSERT INTO "MathSubchapters" VALUES (15,5,'Kräfte und ihre Wirkungen',2);
INSERT INTO "MathSubchapters" VALUES (16,5,'Drehmoment und Hebelgesetz ',3);
INSERT INTO "MathSubchapters" VALUES (17,5,'Gleichgewicht von Kräften',4);
INSERT INTO "MathSubchapters" VALUES (18,4,'Flächenberechnung',1);
INSERT INTO "MathSubchapters" VALUES (19,1,'Wurzelberechnung',6);
INSERT INTO "MathSubchapters" VALUES (20,4,'Kreisumfang und Kreisfläche berechnen',2);
INSERT INTO "MathSubchapters" VALUES (21,4,'Volumen berechnen	',3);
INSERT INTO "MultipleChoiceOptions" VALUES (6,10,'Sie helfen den Mitarbeitern, die Arbeitsabläufe schneller zu verstehen.','Sie geben klare Hinweise auf Gefahren und Schutzmaßnahmen.','Sie zeigen den besten Platz für Pausen an.',NULL);
INSERT INTO "MultipleChoiceOptions" VALUES (7,11,'Warnzeichen','Gebotszeichen','Verbotszeichen',NULL);
INSERT INTO "Quiz" VALUES (10,323,'Warum sind Sicherheitszeichen auf Baustellen besonders wichtig?','multiple_choice','Sie geben klare Hinweise auf Gefahren und Schutzmaßnahmen.');
INSERT INTO "Quiz" VALUES (11,323,'Welche Art von Sicherheitszeichen zeigt an, was in bestimmten Bereichen nicht erlaubt ist?','multiple_choice','Verbotszeichen');
INSERT INTO "SubchapterContent" VALUES (1,1,'[heading]Einführung in Technische Zeichnungen[/heading]

[LF_1_techn_Zeichnung_welcome]
Technische Pläne werden von Handwerkern und Ingenieuren für die Planung von Bauteilen und Anlagen genutzt.

In der SHK-Branche helfen diese Pläne dabei, die genaue Bauweise oder Installation zu verstehen. ',1,NULL);
INSERT INTO "SubchapterContent" VALUES (2,1,'[subheading]Das Zeichenblatt[/subheading]

Ein Zeichenblatt ist das Papier, auf dem technische Zeichnungen erstellt werden. 
Diese Blätter gibt es in verschiedenen Größen, zum Beispiel DIN A0, DIN A3 oder DIN A4.

Meistens wird in der Berufsschule DIN A3 oder DIN A4 verwendet. 

[LF_1_DIN_A_welcome]


',2,NULL);
INSERT INTO "SubchapterContent" VALUES (3,1,'[subheading]Linienarten und Linienbreiten[/subheading]

In technischen Zeichnungen gibt es verschiedene Linienarten, die unterschiedliche Bedeutungen haben. 

Zum Beispiel:

[bold]Vollinie[/bold] 
Diese Linie zeigt die sichtbaren Kanten eines Bauteils.
[LF_1_Volllinie_small]
[bold]Strichlinie[/bold] 
Diese Linie zeigt verdeckte Kanten, die man im fertigen Produkt nicht sieht.
[LF_1_Strichlinie_small]
[bold]Strich-Punkt-Linie[/bold] 
Diese Linie wird verwendet, um die Symmetrie zu kennzeichnen oder Mittelachsen zu zeigen.
[LF_1_Strichpunktlinie_small]

[frame]Symmetrie bedeutet, dass sich etwas gleichmäßig wiederholt oder spiegelt, sodass beide Seiten gleich aussehen.[/frame]
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (4,1,'[subheading]Bemaßung in technischen Zeichnungen[/subheading]

Bemaßung bedeutet, dass in der Zeichnung die genauen Maße (Längen, Breiten, Durchmesser usw.) eingetragen werden.

[LF_1_Bemaßung_Schraube_zoom]

Dabei werden die Maßlinien parallel zur bemessenden Kante gezeichnet, und die Zahlen stehen über den Linien.

Dadurch sieht man genau, wie groß das Bauteil ist und wie es sich zusammensetzt.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (5,1,'[subheading]Ansichten in technischen Zeichnungen[/subheading]

In technischen Zeichnungen werden Bauteile oft in verschiedenen Ansichten dargestellt.

Die drei wichtigsten Ansichten sind:

[bold]Vorderansicht[/bold]
Zeigt das Bauteil von vorne.

[bold]Draufsicht[/bold] 
Zeigt das Bauteil von oben.

[bold]Seitenansicht[/bold] 
Zeigt das Bauteil von der Seite.

Außerdem gibt es noch die Untersicht und die isometrische Ansicht.
[LF_1_Ansichten_zoom]

Durch diese verschiedenen Ansichten kann man das Bauteil aus allen wichtigen Perspektiven betrachten und verstehen, wie es aussieht und funktioniert.
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (6,1,'[subheading]Schnitte in technischen Zeichnungen[/subheading]

Um das Innere eines Bauteils zu zeigen, verwendet man in technischen Zeichnungen sogenannte Schnitte. 
Dabei wird das Bauteil in Gedanken „durchgeschnitten“, um die innenliegenden Teile sichtbar zu machen. 
Es gibt verschiedene Arten von Schnitten, wie:

[bold]Vollschnitte[/bold]
Das ganze Bauteil wird durchgeschnitten.
[LF_1_Vollschnitt_zoom]
[bold]Halbschnitte[/bold]
Nur eine Hälfte des Bauteils wird durchgeschnitten.
[LF_1_Halbschnitt_zoom]
[bold]Teilschnitte[/bold]
Nur ein kleiner Teil des Bauteils wird gezeigt.
[LF_1_Teilschnitt_zoom]',6,NULL);
INSERT INTO "SubchapterContent" VALUES (7,1,'[subheading]Maßstäbe in technischen Zeichnungen[/subheading]

Maßstäbe werden verwendet, um große oder kleine Objekte auf dem Papier darzustellen.

Ein Maßstab gibt an, wie das gezeichnete Objekt im Vergleich zur Realität verkleinert oder vergrößert wurde.

[LF_1_Maßstab_zoom]

Zum Beispiel bedeutet ein Maßstab von 1:10, dass das Objekt auf der Zeichnung zehnmal kleiner ist als in Wirklichkeit.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (8,1,'[subheading] Normschrift in technischen Zeichnungen[/subheading]

In technischen Zeichnungen wird eine spezielle Schriftart verwendet, die sogenannte Normschrift. 

Diese Schriftart ist genormt, damit alle Zeichnungen gut lesbar sind. 

Es gibt genaue Vorgaben, wie groß die Buchstaben sein müssen und wie die Zahlen geschrieben werden.


[LF_1_Normschrift_zoom]
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (9,2,'[heading]Einführung in Bauzeichnungen[/heading]

[LF_1_Bauzeichnung_welcome]

Bauzeichnungen bieten die notwendigen Informationen für den Bau eines Gebäudes. 

Verschiedene Arten wie Grundrisse, Schnitte und Ansichten geben dabei einen umfassenden Überblick.
',1,NULL);
INSERT INTO "SubchapterContent" VALUES (10,2,'[subheading]Arten von Bauzeichnungen[/subheading]

Dieses Bild veranschaulicht einen realen Grundriss.

[LF_1_Grundriss_ScenicLets_welcome_zoom]

Im Folgenden betrachten wir verschiedene Arten von Bauzeichnungen, die zur besseren Verständlichkeit vereinfacht dargestellt werden.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (11,2,'[subheading]Der Grundriss[/subheading]

Ein Grundriss ist eine Bauzeichnung, die das Gebäude von oben zeigt. 

Er enthält alle wichtigen Informationen über die Anordnung der Räume, die Position von Fenstern und Türen sowie die Wandstärken.
 
Grundrisse sind besonders wichtig, um den Aufbau des Gebäudes zu verstehen.

[LF_1_Grundriss_welcome_zoom]
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (12,2,'[subheading]Der Schnitt[/subheading]

Ein Schnitt zeigt das Gebäude in vertikaler Richtung, als ob es in der Mitte durchtrennt wäre. 

Dadurch lassen sich die Raumhöhen, die Dicke der Decken und Böden sowie andere vertikale Details erkennen und die Bauweise besser nachvollziehen.

[LF_1_Schnitt_welcome_zoom]

',4,NULL);
INSERT INTO "SubchapterContent" VALUES (13,2,'[subheading]Die Ansicht[/subheading]

Eine Ansicht zeigt das Gebäude von außen und veranschaulicht, wie es von verschiedenen Seiten aussieht, z. B. von Norden, Süden, Osten oder Westen. 

So erhält man einen Eindruck vom äußeren Erscheinungsbild des Gebäudes.

[LF_1_Ansicht_welcome_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (14,2,'[subheading]Maßangaben in Bauzeichnungen[/subheading]

In Bauzeichnungen werden alle Maße präzise in Millimetern angegeben, um den korrekten Bau des Gebäudes zu ermöglichen.

Dabei werden Breite und Länge der Räume, die Höhe der Decken sowie die Dicke der Wände angegeben. 

[LF_1_Maße_welcome_zoom]
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (15,2,'[subheading]Kennzeichnung von Baustoffen[/subheading]

In Bauzeichnungen werden unterschiedliche Baustoffe durch spezielle Schraffuren gekennzeichnet. 

Zum Beispiel wird unbewehrter Beton mit einer einfachen Schraffur dargestellt, während Mauerwerk eine andere Schraffur hat.

Diese Kennzeichnungen helfen dabei, die verwendeten Materialien auf einen Blick zu erkennen.

[section]Beispiele[/section]

Wärmedämmende Ziegel und Leichtbetonsteine
[LF_1_2_Baustoffe_Ziegel_small]


Mauerwerk (nicht wärmedämmend)
[LF_1_2_Baustoffe_Mauerwerk_small]


Unbewehrter Beton ohne Wärmedämmung
[LF_1_2_Baustoffe_unbewehrt_small]


Kunststoff allgemein
[LF_1_2_Kunststoff_small]',7,'');
INSERT INTO "SubchapterContent" VALUES (23,3,'[heading]Symbole und Sinnbilder[/heading] 

[LF_1_Symbole_welcome]

Symbole und Sinnbilder werden verwendet, um technische Zeichnungen einfacher und verständlicher zu machen. 

Diese Symbole stehen für verschiedene Bauteile und machen es einfacher, komplexe Anlagen schnell zu verstehen.',1,'');
INSERT INTO "SubchapterContent" VALUES (24,3,'[subheading]Rohrarmaturen – Wichtige Symbole[/subheading] 

Rohrarmaturen regeln den Fluss von Wasser und Gas in einer SHK-Anlage. 

Es gibt verschiedene Symbole für Armaturen, zum Beispiel:

[LF_1_Sinnbilder_Armaturen_zoom]

Hinter den Bildern steckt eine Logik:

[bold]Dreiecke[/bold] symbolisieren den Flussweg, oft in beide Richtungen.

Zusatzformen wie [bold]Kreise[/bold] oder [bold]Linien[/bold] zeigen die Art des Ventils (z. B. Kugelhahn, Rückschlagklappe).

[bold]Pfeile[/bold] geben die Flussrichtung an.

Eine ausführliche Übersicht der Sinnbilder findest du in deinem Tabellebuch.',2,'');
INSERT INTO "SubchapterContent" VALUES (25,3,'[subheading]Farbliche Kennzeichnung von Rohren[/subheading] 

In technischen Zeichnungen werden Rohre oft farblich gekennzeichnet, damit man auf einen Blick erkennt, wofür sie sind:

[bullet]Rote Rohre - Heizungsvorlauf und Warmwasserleitung[/bullet]
[bullet]Blaue Rohre - Heizungsrücklauf[/bullet]
[bullet]Grüne Rohre - Kaltwasser[/bullet]

[LF_1_Farbkennzeichnung_Rohre_welcome_zoom]',3,'');
INSERT INTO "SubchapterContent" VALUES (26,3,'[subheading]Sinnbilder für Mess-, Steuerungs- und Regeleinrichtungen[/subheading] 

Mess-, Steuerungs- und Regeleinrichtungen erfassen physikalische Größen, steuern Abläufe und regeln Prozesse in technischen Systemen.

Auch hier gibt es verschiedene Sinnbilder. Zum Beispiel:

[LF_1_Sinnbilder_zoom]',4,'');
INSERT INTO "SubchapterContent" VALUES (27,3,'[subheading]Isometrische Darstellung von Rohrleitungen[/subheading] 

Die isometrische Darstellung zeigt Rohre und Anlagen so, dass sie dreidimensional wirken. 

Das macht es einfacher, sich vorzustellen, wie die Rohre verlaufen und wo sie installiert werden müssen.

[bold]Isometrische Zeichnung [/bold]
Dreidimensionale Darstellung des Objekts.

[LF_1_isometrische_Zeichnung_zoom]

[bold]Installation nach isometrischer Zeichnung[/bold] 
Umsetzung basierend auf der isometrischen Darstellung.

[LF_1_isometrische_Installation_zoom]',5,'');
INSERT INTO "SubchapterContent" VALUES (28,4,'[heading]Werkstoffe und Baustoffe[/heading] 

[LF_1_Werkstoffe_welcome]

Werkstoffe und Baustoffe, ob künstlich oder natürlich, sind Materialien, die wir für Bau und Installation nutzen. 

In dieser Lektion lernst du die verschiedenen Werkstoffe sowie Baustoffe kennen und erfährst, wie sie in deinem Beruf verwendet werden.',1,'');
INSERT INTO "SubchapterContent" VALUES (29,4,'[subheading]Eisenmetalle[/subheading] 

Eisenmetalle bestehen überwiegend aus Eisen. 

Sie werden aufgrund ihrer Festigkeit und Verfügbarkeit in vielen Bereichen der Bau- und Installationstechnik genutzt.

Eisenmetalle sind nicht nur häufig, sondern auch kostengünstig und vielseitig einsetzbar. 
[LF_1_Transformator]
Aufgrund ihrer magnetischen Eigenschaften werden sie nicht nur im Bauwesen, sondern auch in der Elektrotechnik, beispielsweise für Motoren und Transformatoren, genutzt.
',5,'');
INSERT INTO "SubchapterContent" VALUES (30,4,'[section]Legierter Stahl[/section] 

Stahl entsteht durch das Legieren von Eisen mit Kohlenstoff und weiteren Metallen. 

Der Kohlenstoffgehalt beeinflusst die Eigenschaften des Stahls, wie Festigkeit, Härte und Schweißbarkeit.

Zu den zusätzlichen Legierungselementen, die bis zu 5 % des Stahls ausmachen können, gehören u.a.:

[bold]Chrom[/bold] (Cr)
[bold]Nickel[/bold] (Ni)
[bold]Molybdän[/bold] (Mo)
[bold]Mangan[/bold] (Mn)

[frame]Der prozentuale Masseanteil der Legierungselemente in legierten Stählen darf 5 % nicht überschreiten.[/frame]
Legierte Stähle leiten Wärme nur schlecht und haben eine hohe Zugfestigkeit, wodurch sie sich besonders für Anwendungen eignen, die hohe Belastbarkeit erfordern.

[bold]Verwendung[/bold] 
Legierter Stahl wird in Bereichen eingesetzt, die hohe Festigkeit und Korrosionsbeständigkeit erfordern, wie in der Automobilindustrie, dem Maschinenbau und der Luft- und Raumfahrt.

[bold]Dichte[/bold] 
7.874 kg/m³

[bold]Schmelzpunkt[/bold] 
1.538 °C',6,'');
INSERT INTO "SubchapterContent" VALUES (31,4,'[section]Baustahl[/section] 

Baustähle sind unlegierte oder niedriglegierte Massenstähle, die vor allem im Maschinenbau und Stahlbau verwendet werden. 

Sie machen etwa 80 % des gesamten Stahlverbrauchs aus, da sie vielseitig einsetzbar und kostengünstig sind. 
[LF_1_Baustahl]
Baustahl wird anhand seiner Mindeststreckgrenze klassifiziert, die angibt, wie stark der Stahl belastet werden kann, bevor er sich dauerhaft verformt. 

[frame]Die Mindeststreckgrenze beschreibt die Spannung, ab der ein Material dauerhaft verformt wird. [/frame]

Beim [bold]Baustahl S235 JRG2[/bold] liegt diese Grenze bei [bold]235 N/mm²[/bold], das heißt, der Stahl beginnt sich dauerhaft zu verformen, wenn diese Spannung überschritten wird.

Die Erklärung zu den Kurznamen der verschiedenen Metalle findest du in deinem Tabellenbuch.

[bold]Verwendung[/bold] 
Baustahl wird für Baukonstruktionen wie Träger, Stützen und andere tragende Elemente eingesetzt.

[bold]Dichte[/bold] 
7.850 kg/m³

[bold]Schmelzpunkt[/bold] 
1.425–1.520 °C',7,'');
INSERT INTO "SubchapterContent" VALUES (32,4,'[section]Gusseisen[/section] 

Gusseisen ist eine Eisen-Kohlenstoff-Legierung mit einem hohen Kohlenstoffgehalt von über 2 %, die durch Gießen in Formen hergestellt wird. 

Es zeichnet sich durch seine hohe Härte und Verschleißfestigkeit aus, ist jedoch spröde. 

Aufgrund dieser Eigenschaften wird es häufig für Bauteile verwendet, die hohen Druckbelastungen standhalten müssen.

[frame]Trotz seiner Sprödigkeit ist Gusseisen dank seines hohen Kohlenstoffgehalts so langlebig und verschleißfest, dass noch heute antike Gusseisen-Kanonen und -Brunnen aus dem 18. Jahrhundert im Einsatz sind.[/frame]

[bold]Verwendung[/bold]
Gusseisen wird in Bereichen wie dem Maschinenbau und Bauwesen eingesetzt, beispielsweise für Kanaldeckel, Motorblöcke, Heizkessel sowie für Armaturen und Rohre, die robust, aber nicht flexibel sein müssen.

[bold]Dichte[/bold] 
7.000 kg/m³

[bold]Schmelzpunkt[/bold]
1.150 °C
',9,'');
INSERT INTO "SubchapterContent" VALUES (33,4,'[section]Eigenschaften von Kunststoffen[/section] 

[bold]Geringe Dichte und glatte Oberflächen[/bold]
Kunststoffe sind leicht und haben eine glatte, oft glänzende Oberfläche, was sie in vielen Anwendungen praktisch und ästhetisch ansprechend macht.

[bold]Elektrisch nicht leitfähig[/bold]
Kunststoffe isolieren gut gegen elektrische Ströme, was sie ideal für die Herstellung von Kabelummantelungen und anderen elektrischen Komponenten macht.
[LF_1_T_Stück]
[bold]Wärme- und korrosionsbeständig[/bold]
Sie können hohen Temperaturen und korrosiven Umgebungen widerstehen, was sie langlebig und stabil in verschiedenen Anwendungen macht.

[bold]Flexibel in der Formbarkeit[/bold]
Durch unterschiedliche Fertigungstechniken lassen sich Kunststoffe in nahezu jede gewünschte Form bringen, von flexiblen Schläuchen bis hin zu starren Bauteilen.
[LF_1_Schlauch]
[bold]Kostengünstig und leicht zu verarbeiten[/bold]
Im Vergleich zu Metallen und anderen Materialien sind Kunststoffe oft günstiger in der Herstellung und Bearbeitung, was sie für eine Vielzahl von Industrien attraktiv macht.
',16,'');
INSERT INTO "SubchapterContent" VALUES (36,4,'[section]Arten von Kunststoffen[/section] 

Kunststoffe lassen sich in drei Hauptgruppen unterteilen:

[bold]Thermoplaste[/bold]
Thermoplaste lassen sich bei höheren Temperaturen verformen und schmelzen.
Sie sind im kalten Zustand fest und bei Erwärmung plastisch verformbar.

[bold]Duroplaste[/bold]
Duroplaste sind Kunststoffe, die nach ihrer Aushärtung nicht mehr verformt werden können. 
Sie bleiben fest und hitzebeständig. 

[bold]Elastomere[/bold]
Elastomere sind Kunststoffe, die elastisch und flexibel sind. 
Sie ähneln in ihrer Struktur dem Gummi und werden oft als Dichtungen oder Schläuche verwendet. 
',17,'');
INSERT INTO "SubchapterContent" VALUES (37,4,'[section]Anwendungsbereiche von Kunststoffen[/section] 

Kunststoffe werden in der Bau-, Heizungs- und Sanitärtechnik vielseitig eingesetzt:

[bold]Thermoplaste[/bold]

[bullet]Polyethylen (PE) - Wird für Rohre, Heizungs- und Trinkwasserleitungen verwendet. Es gibt PE-HD (hochdicht) und PE-LD (niedrigdicht).[/bullet]

[bullet]Polypropylen (PP) - Verwendet für Abwasserrohre und Fußbodenheizungen. Es ist robust und hitzebeständig.[/bullet]

[bullet]Polyvinylchlorid (PVC) - PVC gibt es in zwei Hauptformen: Hart-PVC (für Abflussrohre und Fensterrahmen) und Weich-PVC (für Dichtungen).[/bullet]

[bold]Duroplaste[/bold]

[bullet]Epoxidharz - Verwendet in Beschichtungen und als Klebstoff für Flugzeugteile.[/bullet]

[bullet]Polyesterharz - Einsatz in GFK (glasfaserverstärktem Kunststoff) für Boote und Karosserieteile.[/bullet]

[bold]Elastomere[/bold]

[bullet]EPDM (Ethylen-Propylen-Dien-Kautschuk) - Geeignet für Dichtungen und Dachabdichtungen.[/bullet]

[bullet]Naturkautschuk (NR) - Häufig in Autoreifen und Schläuchen.[/bullet]
[LF_1_Reifen]',18,'');
INSERT INTO "SubchapterContent" VALUES (38,4,'[section]Vorteile von Kunststoffen[/section] 

[bold]Korrosionsbeständig[/bold]
Kunststoffe sind resistent gegen Rost und viele Chemikalien, was sie langlebig macht.

[bold]Geringes Gewicht[/bold]
Sie sind deutlich leichter als Metalle, was den Transport und die Verarbeitung erleichtert.

[bold]Flexibel und einfach zu verarbeiten[/bold]
Kunststoffe können leicht in verschiedene Formen gebracht werden.

[bold]Kostengünstig[/bold]
Die Herstellung und Verarbeitung ist meist günstiger als bei anderen Materialien.
',19,'');
INSERT INTO "SubchapterContent" VALUES (39,4,'[section]Nachteile von Kunststoffen[/section] 

[bold]Brennbar[/bold]
Kunststoffe können leicht entflammen und dabei giftige Gase freisetzen.

[bold]Geringe Temperaturbeständigkeit[/bold]
Sie verformen sich bei hohen Temperaturen und sind weniger hitzebeständig als Metalle.

[bold]Weniger fest[/bold]
Im Vergleich zu Metallen bieten Kunststoffe weniger Stabilität und Belastbarkeit.',20,'');
INSERT INTO "SubchapterContent" VALUES (40,5,'[subheading]Prüfen[/subheading] 

Beim Prüfen geht es darum festzustellen, ob Bauteile den geforderten Anforderungen entsprechen.
 
Das kann durch [bold]Messen[/bold] oder durch [bold]Lehren[/bold] geschehen. 

[section]Arten von Prüfungen[/section] 

Bei [bold]subjektiven Prüfungen[/bold] verlässt man sich auf die Sinne, zum Beispiel durch Fühlen oder Sehen, ob ein Teil richtig verarbeitet ist. 
Diese Methode kann schnelle Einschätzungen liefern, ist aber weniger präzise.

[bold]Objektive Prüfungen[/bold] verwenden Messinstrumente, um genaue Ergebnisse zu erhalten.
Hierbei kommen oft Werkzeuge wie Messschieber oder Lehren zum Einsatz, die präzise Maße liefern und die Ergebnisse wiederholbar machen.

',2,'');
INSERT INTO "SubchapterContent" VALUES (41,5,'[subheading]Prüfen von Ebenheit und Geradheit[/subheading] 

Um sicherzustellen, dass Flächen eben und Zylinder gerade sind, werden gezielte Prüfungen durchgeführt. 

Eine Fläche gilt als eben, wenn sie keine Erhebungen oder Vertiefungen aufweist. 

Ein Zylinder ist dann gerade, wenn er weder verbogen noch verzogen ist. 

Zur Überprüfung von Ebenheit und Geradheit kommen Messwerkzeuge wie das Haarlineal oder die Messuhr zum Einsatz. 
[LF_1_Haarlineal_zoom]
Diese können selbst kleinste Abweichungen zuverlässig feststellen.',4,'');
INSERT INTO "SubchapterContent" VALUES (42,5,'[subheading]Neigungsprüfung[/subheading] 

[section]Wasserwaage[/section]
Mit einer Wasserwaage (oder Richtwaage) prüft man, ob eine Fläche oder ein Rohr waagerecht oder senkrecht ausgerichtet ist. 

Die kleine Blase in der Wasserwaage zeigt an, ob alles gerade ist. 
[LF_1_Wasserwaage_zoom]
Schon ein kleiner Höhenunterschied kann mit einer guten Wasserwaage entdeckt werden.

[section]Schlauchwaage[/section]
Zusätzlich zur Wasserwaage gibt es auch die Schlauchwaage.
Diese wird verwendet, um Höhenunterschiede zwischen zwei Punkten über größere Entfernungen zu messen.
Sie besteht aus einem mit Wasser gefüllten Schlauch und funktioniert nach dem Prinzip der kommunizierenden Röhren. 
Wenn beide Enden des Schlauchs auf gleicher Höhe sind, steht das Wasser in beiden Röhren auf derselben Höhe.
',5,'');
INSERT INTO "SubchapterContent" VALUES (44,5,'[subheading]Toleranzen beim Messen[/subheading] 

Beim Messen von Winkeln oder anderen Maßen ist es hilfreich, die Toleranzen zu kennen. 

Sie zeigen, wie weit das tatsächliche Maß vom gewünschten abweichen darf, damit das Bauteil noch akzeptabel ist. 

Verschiedene Toleranzklassen legen fest, wie genau gemessen werden muss.

[section]Toleranzklassen[/section]
Diese reichen von „fein“ bis „sehr grob“. Je feiner die Klasse, desto kleiner sind die zulässigen Abweichungen. 
In der Klasse „f fein“ sind minimale Abweichungen erlaubt, während in der Klasse „c grob“ größere Unterschiede toleriert werden.

[LF_1_Toleranzklasse_zoom]
[section]Anwendungsbereiche[/section]
Je nach Anwendungsbereich werden verschiedene Toleranzklassen genutzt. 
Für SHK-Anlagen (Sanitär, Heizung, Klima) sind die Toleranzen im Millimeterbereich angesiedelt, um eine zuverlässige Funktion zu gewährleisten.
Im Baugewerbe hingegen sind größere Abweichungen meist kein Problem, weshalb hier oft grobe Toleranzen verwendet werden.
 
',6,'');
INSERT INTO "SubchapterContent" VALUES (45,5,'[subheading]Fehler beim Prüfen und Messen[/subheading] 

Beim Prüfen und Messen können verschiedene Fehler auftreten. 

[section]Zufällige Fehler[/section]
Diese Fehler passieren unvorhersehbar, zum Beispiel durch Ablesefehler, Parallaxen (Fehlablesung durch schräges Draufschauen) oder Schmutz auf dem Werkstück. 
Solche Fehler machen das Messergebnis unsicher und können durch sorgfältiges Arbeiten verringert werden.
[LF_1_Fehler]
[section]Systematische Fehler[/section]
Diese Fehler treten konstant auf, zum Beispiel durch falsch eingestellte Messgeräte, ungleiche Skalen oder Temperaturschwankungen. 
Systematische Fehler beeinflussen das Messergebnis immer in dieselbe Richtung und sollten durch regelmäßige Kalibrierung der Messgeräte minimiert werden.
',7,'');
INSERT INTO "SubchapterContent" VALUES (46,6,'[heading]Kundenauftrag[/heading] 

[LF_1_Kundenauftrag_welcome]

Ein Kundenauftrag ist eine Anfrage von einem Kunden, der möchte, dass eine bestimmte Arbeit für ihn erledigt wird. 

In der SHK-Branche (Sanitär, Heizung, Klima) kann es beispielsweise um die Installation einer neuen Heizung oder die Verlegung von Wasser- oder Gasleitungen gehen.',1,'');
INSERT INTO "SubchapterContent" VALUES (47,6,'[subheading]Von der Anfrage bis zur Ausführung[/subheading] 

Ein Kundenauftrag läuft in mehreren Schritten ab:

[section]Anfrage[/section]
Es wird nach einer Dienstleistung gefragt, zum Beispiel der Verlegung einer Gasleitung. 
Dabei werden Anliegen und erste Wünsche beschrieben.
Der Betrieb stellt zudem Rückfragen, um sich ein erstes Bild von den Anforderungen zu machen.
[LF_1_Anfrage_small]
[section]Planung[/section]
In der Planung werden wichtige Details geklärt, wie die Größe des Raums, der Verlauf der Leitungen und mögliche Herausforderungen, z.B. alte Rohre oder schwierige Zugänge. 
Auch Materialien und Werkzeuge für den Auftrag werden ausgewählt.

[section]Angebot[/section]
Ein Angebot wird erstellt, das beschreibt, welche Arbeiten durchgeführt werden und welche Kosten anfallen.
Falls Unsicherheiten bestehen, können alternative Lösungen angeboten werden.
[LF_1_Angebot]
Häufig ist eine Besichtigung vor Ort erforderlich, um die Planung präziser zu gestalten. 

Ein gutes Angebot berücksichtigt nicht nur den Preis, sondern auch die Qualität der Materialien und die Effizienz der Arbeit.',2,'');
INSERT INTO "SubchapterContent" VALUES (48,6,'[subheading]Angebot - Kalkulation erstellen[/subheading] 

Das Angebot sollte detailliert angeben, wie viel die Arbeit kosten wird. 
Um es zu erstellen, werden die Kosten für Material und Arbeitszeit berechnet.
Diese Berechnungen nennt man Kalkulation.

[section]Materialkosten[/section]
Die Materialkosten umfassen alles, was für den Auftrag benötigt wird, wie Rohre, Schrauben, oder Heizungen. 
Man berechnet den Preis des Materials und fügt eventuelle Zuschläge wie zum Beispiel für Teuerungen oder Rabatte hinzu.

[section]Lohnkosten[/section]
Die Lohnkosten beinhalten das Geld, das für die Arbeitszeit der Handwerker gezahlt werden muss. 
Hierzu zählen auch Zuschläge für Überstunden oder besondere Arbeiten.

[frame]Vergiss nicht, die Kosten für Anfahrt und Transport mit einzurechnen. Diese können je nach Entfernung und Aufwand variieren und sollten separat ausgewiesen werden, um die Gesamtkosten transparent zu halten.[/frame]
[section]Verkaufspreis[/section] 
Zum Netto-Einkaufspreis kommen noch Zuschläge für Wagnis und Gewinn hinzu. 
Dadurch ergibt sich der Preis, den der Kunde zahlen muss.

[section]Mehrwertsteuer[/section] 
Zum Schluss wird noch die Mehrwertsteuer auf den Verkaufspreis gerechnet, sodass der endgültige Brutto-Preis entsteht.

',3,'');
INSERT INTO "SubchapterContent" VALUES (49,6,'[subheading]Vorbereitung und Ausführung der Arbeit[/subheading] 

Nachdem das Angebot akzeptiert wurde, beginnt die Vorbereitung:

[section]Materialbeschaffung[/section]
Alle notwendigen Werkzeuge und Materialien für den Auftrag werden besorgt.
Manchmal müssen spezielle Teile bestellt oder vorgefertigt werden.
[LF_1_Großhandel]
[section]Zeitplanung[/section]
Ein Termin wird festgelegt, an dem die Arbeiten beginnen.
Die einzelnen Schritte werden so geplant, dass die Arbeiten zügig und sicher ausgeführt werden.

[section]Installation[/section]
Leitungen werden verlegt, Geräte installiert und Sicherheitsprüfungen durchgeführt.
Die Arbeit muss genau nach Plan erfolgen, damit alles korrekt und sicher funktioniert.
Während der Ausführung sollte man flexibel bleiben, falls unerwartete Probleme auftreten, wie zum Beispiel Hindernisse in den Wänden.
Sicherheitsvorschriften müssen jederzeit beachtet werden, um Unfälle und Schäden zu vermeiden.',4,'');
INSERT INTO "SubchapterContent" VALUES (50,6,'[subheading]Die Arbeit abschließen und dem Kunden übergeben[/subheading] 

Nach der Ausführung wird die Arbeit abgeschlossen und der Kundschaft übergeben. 

Das bedeutet:

[section]Sicherheitsprüfungen[/section]
Die Anlage wird getestet, um sicherzustellen, dass alles einwandfrei funktioniert.
Dies kann die Überprüfung von Gasleitungen, Wasseranschlüssen oder Heizungssystemen umfassen.

[section]Anleitung zur Nutzung[/section]
Es wird erklärt, wie die installierten Geräte sicher und effizient genutzt werden können.
Dabei gibt es oft auch Hinweise zur Wartung, damit die Anlage lange funktioniert.

Zusätzlich wird ein Abnahmeprotokoll erstellt, in dem festgehalten wird, dass die Arbeit ordnungsgemäß abgeschlossen wurde.
[LF_1_Visitenkarte]
Die Auftraggeber erhalten auch Kontaktinformationen für eventuelle Nachfragen oder zukünftige Wartungsarbeiten.
',5,'');
INSERT INTO "SubchapterContent" VALUES (51,7,'[heading]Einführung in die Metallbearbeitung[/heading] 

[LF_1_Metalle_welcome]

Bei der Bearbeitung von Metallen mit Handwerkzeugen wird in zwei Kategorien unterteilt:

Das Metall wird entweder durch Materialabtragung (spanabhebend) oder durch Verformung (spanlos) in die gewünschte Form gebracht.',1,'');
INSERT INTO "SubchapterContent" VALUES (52,7,'[subheading]Spanlose Bearbeitungsverfahren[/subheading] 

Spanlose Bearbeitungsverfahren sind Techniken, bei denen Material getrennt oder geformt wird, ohne dass dabei Späne entstehen. 

Das Material wird durch Druck, Schneiden oder andere mechanische Einflüsse verarbeitet.

[section]Scherschneiden von Blechen[/section]
Beim Scherschneiden wird ein Blech durch zwei Klingen, sogenannte Schneidkeile, getrennt.

Diese Klingen üben Druck auf das Blech aus und schneiden es sauber durch.

Handblechscheren sind ideal für dünnere Bleche, während für dickere Bleche Handhebelscheren oder Tafelscheren verwendet werden.

Es gibt verschiedene Arten von Blechscheren:

[bullet]Durchlaufscheren für lange, gerade Schnitte.[/bullet]
[bullet]Loch- und Kantenscheren für spezielle Formen.[/bullet]

[frame]Es gibt Scheren in linker und rechter Ausführung, je nachdem, welche Hand verwendet wird.[/frame]
',2,'');
INSERT INTO "SubchapterContent" VALUES (53,7,'[section]Keilschneiden – Präzision beim Schneiden von Rohren[/section] 

Keilschneiden ist eine Technik, bei der ein keilförmiges Werkzeug verwendet wird, um Material zu trennen.
 
Ein Beispiel dafür ist der Rohrschneider, der Rohre präzise und sauber durchtrennt.

Das Schneidrädchen übt Druck auf das Rohr aus und schneidet es durch, indem es sich in das Material eingräbt.
[LF_1_Rohrschneider_zoom]
[section]Biegen von Metall[/section] 

Beim Biegen wird Metall durch Druck in eine bestimmte Form gebracht.

Die äußere Seite des Materials wird dabei gedehnt, während die innere Seite zusammengedrückt wird.
 
Eine wichtige Rolle spielt die neutrale Faser – eine Linie im Material, die weder gedehnt noch gestaucht wird.

Für runde Rohre verwenden wir Rundbiegemaschinen, für rechteckige Kanäle Abkantbänke.

[section]Kalt- und Warmbiegen von Rohren[/section] 

Rohre können entweder kalt oder warm gebogen werden. 

Beim [bold]Kaltbiegen[/bold] wird das Rohr ohne Erwärmung in die gewünschte Form gebracht. 

Dazu gibt es spezielle Biegegeräte, die den Durchmesser des Rohrs berücksichtigen.

Beim [bold]Warmbiegen[/bold] wird das Rohr erhitzt, bis es weich wird, und dann gebogen. 
Um die Form zu erhalten, wird das Rohr oft mit Sand gefüllt oder von außen stabilisiert.',3,'');
INSERT INTO "SubchapterContent" VALUES (54,7,'[subheading]Spanabhebende Bearbeitungsverfahren[/subheading] 

Spanabhebende Bearbeitungsverfahren sind Techniken, bei denen Material durch das Abtragen von Spänen entfernt wird. 

Hierbei kommen scharfe Werkzeuge zum Einsatz, die schichtweise Material abheben, um die gewünschte Form zu erzeugen.

[section]Sägen von Metall[/section]

Das Sägen von Metall erfordert spezielle Sägeblätter, die aus gehärtetem Werkzeugstahl bestehen. 

Diese Blätter haben hintereinander liegende Zähne, die in das Metall eindringen und Späne abheben.

[section]Freischnitt[/section]
Der Freischnitt verhindert, dass das Sägeblatt im Werkstück klemmt. 
Er entsteht durch das leichte Abbiegen oder Absetzen der Sägezähne, oder durch den Wellenschnitt, bei dem die Zähne wellenförmig angeordnet sind. 
So wird die Schnittfuge breiter als das Sägeblatt und ermöglicht eine flüssige Bewegung und einen sauberen Schnitt.
[LF_1_Freischnitt_zoom]

[frame]Je nach Werkstoff werden unterschiedliche Zahnteilungen (Anzahl der Zähne pro Zoll) verwendet. Härtere Werkstoffe benötigen feinere Zahnteilungen, während weichere Werkstoffe größere Zahnteilungen erfordern.[/frame]',4,'');
INSERT INTO "SubchapterContent" VALUES (56,8,'[heading]Arbeitssicherheit[/heading] 

[LF_1_Arbeitsschutz_welcome]

Arbeitssicherheit hilft, Unfälle zu vermeiden. 

Auf Baustellen gibt es Risiken, die durch geeignete Maßnahmen verringert werden können, die wir uns jetzt genauer ansehen.
',1,'');
INSERT INTO "SubchapterContent" VALUES (57,8,'[subheading]Sicherheitszeichen[/subheading] 

Sicherheitszeichen sind unverzichtbar, um Gefahren zu erkennen und Unfälle zu vermeiden. 

Sie geben klare Hinweise auf mögliche Risiken und nötige Schutzmaßnahmen. 

Diese Zeichen begegnen uns überall auf Baustellen und in Arbeitsbereichen.

[LF_2_Sicherheitszeichen]',2,'');
INSERT INTO "SubchapterContent" VALUES (58,8,'[subheading]Sicherheitsmaßnahmen am Arbeitsplatz[/subheading] 

Sicherheitsmaßnahmen sind wichtig, um Unfälle zu verhindern.

Dazu gehört, dass Arbeitsräume gut beleuchtet und belüftet sind.
[LF_1_Sicherheit_3]
Auf Baustellen müssen Sicherheitsvorkehrungen getroffen werden, wie das Absperren gefährlicher Bereiche. 
[LF_1_Sicherheit_2]
Auch das Bereitstellen von Atemschutzmasken bei schädlichen Gasen gehört dazu.',8,'');
INSERT INTO "SubchapterContent" VALUES (59,8,'[subheading]Persönliche Schutzausrüstung (PSA)[/subheading] 

Die persönliche Schutzausrüstung (PSA) schützt die Mitarbeiter vor Gefahren am Arbeitsplatz. Dazu gehören:

[bold]Schutzhelm[/bold]
Schützt den Kopf vor herabfallenden Gegenständen.
[LF_1_PSA_Helm_small]

[bold]Gehörschutz[/bold]
Schützt die Ohren vor lauten Geräuschen, z.B. bei Arbeiten mit einem Presslufthammer.


[bold]Schutzbrille[/bold]
Schützt die Augen vor Staub, Funken oder chemischen Stoffen.
[LF_1_PSA_Brille_small]
[bold]Schutzhandschuhe[/bold]
Schützen die Hände vor Schnitten, Chemikalien und Hitze.

PSA muss immer getragen werden, wenn es vom Arbeitgeber vorgeschrieben ist. 

',9,'');
INSERT INTO "SubchapterContent" VALUES (60,8,'[subheading]Gefährliche Stoffe und deren Handhabung[/subheading] 

Auf Baustellen gibt es viele gefährliche Stoffe, wie Säuren, Laugen und entzündliche Flüssigkeiten.
[LF_2_Gefahren_1_zoom]
Diese Stoffe müssen sicher gelagert und verwendet werden, um Unfälle zu vermeiden. 

Gefährliche Stoffe müssen immer in den Originalbehältern aufbewahrt werden, und die Behälter müssen deutlich gekennzeichnet sein. 

Beim Umgang mit gefährlichen Stoffen sollten immer Schutzhandschuhe und Schutzbrillen getragen werden.
[LF_2_Gefahren_2_zoom]
Sicherheitsanweisungen müssen befolgt werden, um Verätzungen und Vergiftungen zu vermeiden.
',10,'');
INSERT INTO "SubchapterContent" VALUES (61,5,'[subheading]Werkzeuge zum Messen von Winkeln[/subheading] 

Beim Arbeiten mit Rohren und anderen Materialien ist es oft notwendig, genaue Winkel zu messen und einzuhalten. 

Hierfür werden verschiedene Werkzeuge eingesetzt:

[bold]Winkelmesser[/bold]
Mit einem Winkelmesser kann man den genauen Winkel zwischen zwei Kanten messen und übertragen.
[LF_1_Winkelmesser_zoom]

[bold]Anschlagwinkel[/bold] Dieses Werkzeug wird verwendet, um rechte Winkel von 90° präzise zu markieren und zu prüfen.
[LF_1_Anschlagwinkel_zoom]',8,'');
INSERT INTO "SubchapterContent" VALUES (63,5,'[subheading]Nivelliergeräte[/subheading] 

Nivellieren bedeutet, Höhen zu übertragen, um sicherzustellen, dass zwei oder mehr Punkte auf gleicher Höhe liegen.

Neben der Schlauchwaage werden inzwischen jedoch oft Laser-Nivelliergeräte, z.B. Linienlaser, verwendet, da sie präziser sind und die Arbeit schneller erledigen können. 

[LF_1_Linienlaser_zoom]
Diese Geräte haben die Schlauchwaagen in vielen Bereichen abgelöst.
',9,'');
INSERT INTO "SubchapterContent" VALUES (64,5,'[subheading]Messwerkzeuge für die Baustelle[/subheading] 

Auf Baustellen müssen Maße regelmäßig kontrolliert und nachgemessen werden. 

Dafür gibt es verschiedene Messwerkzeuge:

[bold]Maßband[/bold] 
Ein flexibles Band, das aufgerollt und wieder ausgerollt werden kann. 
Es ist nützlich, um größere Längen zu messen.

[bold]Gliedermaßstab[/bold]
Auch bekannt als „Zollstock“, besteht dieser aus mehreren Gliedern, die man auseinanderklappen kann. 
Er ist besonders robust und wird oft für genaue Messungen verwendet.
[LF_1_Zollstock_zoom]',10,'');
INSERT INTO "SubchapterContent" VALUES (65,5,'[subheading]Präzise Messwerkzeuge[/subheading] 

Für besonders präzise Messungen, wie das Messen von kleinen Durchmessern oder Innenabständen, werden spezielle Messwerkzeuge eingesetzt:

[section]Messschieber[/section] 
Ein Messgerät, das sehr genaue Messungen bis auf einen halben Millimeter ermöglicht. 
Es kann sowohl Innen- als auch Außendurchmesser messen.

[LF_1_Messschieber_zoom]

[bold]Anwendung[/bold]
Zum Messen eines Außendurchmessers legt man das Objekt zwischen die [bold]Außenmessschenkel[/bold] und schließt sie vorsichtig. 
Für einen Innendurchmesser führt man die [bold]Innenmessschenkel[/bold] in die Öffnung ein und schiebt sie auseinander. 
[LF_1_Messschieber_Ablesen_zoom]
Die [bold]Hauptskala[/bold] gibt den groben Messwert in Millimetern an, während die [bold]Noniusskala[/bold] genaue Zehntel-Millimeter-Messungen ermöglicht.
Die Linie, die auf der Noniusskala mit einer Linie auf der Hauptskala übereinstimmt, zeigt den Zehntel-Millimetermaß an. 
In unserem Beispiel ist das Gesamtmaß 22,7 mm.
Die [bold]Feststellschraube[/bold] fixiert die Messschenkel, um das Messergebnis zu sichern.

[section]Laser-Entfernungsmesser[/section] 
Ein digitales Messgerät, das Entfernungen mit Hilfe eines Laserstrahls misst. 
Es ist besonders nützlich für größere Distanzen.
',11,'');
INSERT INTO "SubchapterContent" VALUES (67,5,'[subheading]Wiederholung und Anwendung[/subheading] 

Technisches Messen und das genaue Einhalten von Maßen unterstützen den Ablauf eines Bauprojekts. 

Die passenden Werkzeuge und Techniken helfen dabei, präzise zu arbeiten und sicherzustellen, dass alle Bauteile genau passen.

Auf der Baustelle werden Maße regelmäßig überprüft und die Toleranzen kontrolliert, damit das Bauwerk am Ende den Anforderungen entspricht. 
[LF_1_Widerholen]
Mit Messwerkzeugen und der Berücksichtigung der Toleranzen bleiben die Qualität und Passgenauigkeit der Bauteile erhalten.',12,'');
INSERT INTO "SubchapterContent" VALUES (68,9,'[heading]Einführung in das Bohren[/heading] 

[LF_2_Bohrer_welcome]
Das Bohren ist ein Verfahren im SHK-Handwerk, das zum Erstellen von Löchern in Materialien wie Holz, Metall oder Beton dient. 

Ein Bohrer entfernt durch Drehung und Druck Material, um ein präzises Loch herzustellen.
',1,'');
INSERT INTO "SubchapterContent" VALUES (69,9,'[subheading]Aufbau eines Metallbohrers[/subheading] 

Ein Metallbohrer besteht aus verschiedenen Teilen, die zusammenarbeiten, um das Material zu durchdringen:

[bold]Spitze[/bold]
Der vordere Teil, der den Bohrprozess startet und das Material durchdringt.

[bold]Schneiden[/bold]
Die scharfen Kanten an der Spitze, die das Material abtragen und den Bohrlochdurchmesser bestimmen.

[bold]Freifläche[/bold]
Schräger Bereich hinter der Schneide, reduziert Reibung und Verschleiß.

[bold]Spannuten[/bold]
Die gedrehten Rillen entlang des Schafts, die die Späne abtransportieren und gleichzeitig das Bohrloch kühlen.

[bold]Fase[/bold]
Die leicht abgeschrägte Kante, die die Schneide schützt und die Reibung beim Bohren reduziert.

[bold]Schaft[/bold]
Der hintere Teil des Bohrers, der in das Spannfutter eingespannt wird.

[LF_2_Aufbau_zoom]

Für unterschiedliche Materialien sind verschiedene Schneidwinkel erforderlich:

[bullet]Metall - Schneidwinkel von 40° bis 65°, je nach Härte des Metalls.[/bullet]
[bullet]Beton - Größerer Schneidwinkel von etwa 150°, um das harte Material zu durchdringen.[/bullet]


',3,'');
INSERT INTO "SubchapterContent" VALUES (70,9,'[subheading]Bohren in verschiedene Materialien[/subheading] 

Beim Bohren in unterschiedliche Materialien muss der richtige Bohrertyp und die passende Technik gewählt werden:

[bold]Metallbohrer[/bold] haben einen Schneidwinkel von 40° bis 65° für weiche und harte Metalle.

[bold]Betonbohrer[/bold] verfügen über einen größeren Schneidwinkel von etwa 150°, um das harte Material zu durchdringen.

[bold]Holzbohrer[/bold] sind mit einer Zentrierspitze ausgestattet, die das Holz durchdringt und für saubere, gerade Löcher sorgt.

[frame]Beim Bohren von harten Materialien wie Beton ist es notwendig, den Bohrer regelmäßig abkühlen zu lassen, um Überhitzung zu vermeiden.[/frame]
',4,'');
INSERT INTO "SubchapterContent" VALUES (71,9,'[subheading]Berechnung der Schnittgeschwindigkeit beim Bohren[/subheading] 

Die Schnittgeschwindigkeit beeinflusst den Bohrprozess und hilft, Überhitzung des Bohrers zu vermeiden.

Sie hängt von der Drehzahl und dem Durchmesser des Bohrers ab und wird mit der folgenden Formel berechnet:

[LF_2_Schnittgeschwindigkeit_small]

[section]Erklärung[/section]
[bold]v[/bold] velocity (= Geschwindigkeit)
[bold]c[/bold] cutting (= Schneiden)
[bold]d[/bold] Durchmesser des Bohrers in mm
[bold]π[/bold] Wert 3,14 (Pi)
[bold]n[/bold] Drehzahl (number) des Bohrers in 1/min
[bold]1000[/bold] Umrechnungszahl


[section]Rechenbeispiel[/section]
Wenn du einen Bohrer mit einem Durchmesser von [bold]2 cm (20 mm)[/bold] bei einer Drehzahl von [bold]750[/bold] Umdrehungen pro Minute (1/min) verwendest, beträgt die Schnittgeschwindigkeit:

[LF_2_Berechnung_Schnittgeschwindigkeit_small]
[LF_2_Schnittgeschwindigkeit _Lösung_small]

Die Schnittgeschwindigkeit beträgt also 47,1 m/min.',5,'');
INSERT INTO "SubchapterContent" VALUES (72,9,'[subheading]Sicherheitsregeln beim Bohren[/subheading] 

Beim Bohren sollten folgende Sicherheitsregeln beachtet werden, um Unfälle zu vermeiden:

[bold]Bohrmaschine mit beiden Händen halten[/bold]
Dadurch behältst du die Kontrolle.

[bold]Nicht auf Anlegeleitern stehend bohren[/bold]
Dies kann zu Unfällen führen.
[LF_2_Leiter_zoom]
[bold]Maschine im Stillstand wechseln[/bold]
Wechsle den Bohrer nur, wenn die Maschine ausgeschaltet ist.

[bold]Keine Handschuhe tragen[/bold]
Beim Maschinenbohren dürfen keine Handschuhe getragen werden, da sie sich in den rotierenden Teilen verfangen und schwere Verletzungen verursachen können.

Außerdem solltest du immer [bold]Schutzbrille[/bold] und [bold]Gehörschutz[/bold] tragen, um deine Augen und Ohren vor Funken und Lärm zu schützen.
',6,'');
INSERT INTO "SubchapterContent" VALUES (73,10,'[heading]Trennschleifen[/heading] 

[LF_2_Trennschleifen_welcome]

Trennschleifer werden vielseitig eingesetzt, um Materialien zu schneiden, Oberflächen zu glätten oder Material zu entfernen.',1,'');
INSERT INTO "SubchapterContent" VALUES (74,10,'[subheading]Anwendungsgebiete [/subheading] 

Der Trennschleifer wird zum Schleifen und Trennen von Materialien wie Metall und Fliesen verwendet. 

Er kann mit einem Akku oder einem Kabel betrieben werden und nutzt eine rotierende Schleif- oder Trennscheibe.
 
Typische Anwendungen sind das Entfernen von Rost, das Abschleifen von alten Farben und das Trennen von Metallteilen. 

Für jede Aufgabe sind spezielle Aufsätze wie Trennscheiben, Schleifscheiben und Schleifpads verfügbar, die das Gerät vielseitig einsetzbar machen. 

[frame]Achte darauf, die richtige Scheibe und passende Drehzahl für das jeweilige Material zu verwenden.[/frame]',2,'');
INSERT INTO "SubchapterContent" VALUES (75,10,'[subheading]Arten von Trennschleifern[/subheading] 

[bold]Winkelschleifer[/bold]
Mit Winkelgetriebe und Scheiben von 75 bis 230 mm für flächiges Arbeiten.
[LF_2_Winkelschleifer_zoom]

[bold]Benzinbetriebene Trennschneider[/bold]
Für große Baustellen, geeignet zum Schneiden von Beton, Asphalt und Schienen. 
Diese Modelle erreichen hohe Umfangsgeschwindigkeiten und sind besonders robust.
',3,'');
INSERT INTO "SubchapterContent" VALUES (76,10,'[subheading]Geschwindigkeit und Drehzahl beim Schleifen[/subheading] 

Die Schleifgeschwindigkeit hängt von der Drehzahl und dem Durchmesser der Schleifscheibe ab. 
Eine passende Geschwindigkeit sorgt dafür, dass das Material gleichmäßig bearbeitet wird und die Scheibe nicht überhitzt. 

Du kannst die Geschwindigkeit berechnen mit:

[LF_2_Geschwindigkeit_small]

[bold]v[/bold] Umfangsgeschwindigkeit in m/s
[bold]d[/bold] Durchmesser der Schleifscheibe in m
[bold]π[/bold] Pi, etwa 3,14
[bold]n[/bold] Drehzahl in U/min.
[bold]60[/bold] Umrechnungsfaktor (= 60 Sekunden, um m/s zu erhalten)

[frame]Es darf nur die für die Maschine vorgesehene Scheibengröße eingesetzt werden. Auch wenn eine bereits abgenutzte Scheibe in die Maschine passt, ist sie nicht für die höhere Drehzahl geeignet und kann durch die entstehenden Fliehkräfte zerreißen.[/frame]',4,'');
INSERT INTO "SubchapterContent" VALUES (77,10,'[subheading]Sicherheitsregeln beim Trennschleifen[/subheading] 

[bold]Geeignete Scheiben verwenden[/bold]
Nur für die Maschine zugelassene Schleifscheiben nutzen.

[bold]Werkstück sichern[/bold]
Achte darauf, dass das Werkstück fest eingespannt ist, z.B in einem Schraubstock, um Verrutschen zu vermeiden.
[LF_2_Schraubzwinge_zoom]

[bold]Maschine sicher führen[/bold]
Halte die Maschine immer mit beiden Händen.

[bold]Persönliche Sicherheit[/bold]
Kein Schmuck, keine lockere Kleidung und keine herumhängenden Bänder tragen. 
Lange Haare müssen zusammengebunden oder bedeckt sein.',5,'');
INSERT INTO "SubchapterContent" VALUES (78,12,'[heading]Gewinde[/heading] 

[LF_2_Gewinde_welcome]

Ein Gewinde ist eine spiralförmige Rille, die entweder außen an einer Schraube oder innen an einer Mutter oder einem Bauteil angebracht ist. 

Sie ermöglichen das feste Verbinden von Bauteilen. 

Es gibt verschiedene Gewindetypen, die nach ihrer Form, Verwendung und weiteren Kriterien unterschieden werden.
',1,'');
INSERT INTO "SubchapterContent" VALUES (79,12,'[subheading]Gewindetypen und Bezeichnungen[/subheading] 

Gewinde werden nach ihrer Lage, Verwendung, Gangrichtung und Steigung eingeteilt. 

Ein [bold]Außengewinde[/bold] befindet sich an einer Schraube, ein [bold]Innengewinde[/bold] in einer Mutter. 

Ein [bold]Regelgewinde[/bold] hat eine normale Steigung, während ein [bold]Feingewinde[/bold] eine kleinere Steigung hat. 

Außerdem gibt es verschiedene Profile, wie Trapezgewinde, Sägengewinde und Spitzgewinde.

[frame]Die Steigung eines Gewindes ist der Abstand zwischen zwei Gewindegängen in Längsrichtung. Sie bestimmt, wie weit sich eine Schraube bei einer Umdrehung vorwärts bewegt. Regelgewinde haben eine größere Steigung, Feingewinde eine kleinere, was präziser ist.[/frame]',2,'');
INSERT INTO "SubchapterContent" VALUES (80,12,'[subheading]Was ist ein Gewindebohrer und wie ist er aufgebaut?[/subheading] 

Ein Gewindebohrer wird zum Schneiden von Innengewinden in vorgebohrten Löchern verwendet, um Schrauben sicher in Bauteilen zu befestigen. 

Er besteht aus mehreren Teilen:
[bold]Spitze mit Anschnitt[/bold]
Hier wird der Großteil des Materials abgetragen.
[LF_2_Gewindebohrer_zoom]
[bold]Zylindrischer Schneidteil[/bold]
Dieser Abschnitt schneidet das eigentliche Gewindeprofil und sorgt dafür, dass der Bohrer gerade im Loch bleibt.

[bold]Schaft[/bold]
Der hintere Teil, der ins Werkzeug eingespannt wird und durch Drehen den Schneidvorgang ermöglicht. 
Handgewindebohrer besitzen am Ende des Schafts einen Vierkant, um sie mit einem Windeisen zu befestigen.

[bold]Spannut[/bold]
Über diese Rillen werden die beim Schneiden entstehenden Späne abgeleitet.
Gewindebohrer sind in verschiedenen Ausführungen erhältlich, abhängig vom Material des Werkstücks und der Art des zu schneidenden Gewindes.',3,'');
INSERT INTO "SubchapterContent" VALUES (82,12,'[subheading]Schritte beim Gewindebohren[/subheading] 

Beim Gewindebohren wird zuerst vorgebohrt und gesenkt. 
Danach kommen die Gewindebohrer zum Einsatz.

[bold]Kernlochbohren[/bold]
Zuerst bohrst du ein Kernloch mit einem Spiralbohrer. 
Die Größe des Kernlochs richtet sich nach dem Durchmesser des Gewindes. 

[bold]Ansenken[/bold]
Anschließend senkst du das Loch mit einem Kegelsenker an. 
Das erleichtert das Ansetzen des Gewindebohrers und schützt die Gewindekanten.
[LF_2_Kegelsenker_zoom]
[bold]Gewindebohrer ansetzen[/bold]
Der Gewindebohrer wird gerade in das vorgebohrte Loch angesetzt und vorsichtig gedreht. 
Beim Innengewinde schneiden von Hand werden meist drei Gewindebohrer verwendet: 

[bullet]der Vorschneider schneidet zuerst einen Teil des Gewindes vor[/bullet]
[bullet]der Mittelschneider vertieft das Gewinde[/bullet]
[bullet]der Fertigschneider sorgt für das endgültige Gewindeprofil[/bullet]

[bold]Ölen und Span entfernen[/bold]
Beim Drehen wird der Gewindebohrer regelmäßig zurückgedreht, um die Späne zu brechen und zu entfernen. 
Dies verhindert ein Verklemmen und sorgt für ein sauberes Gewinde.',5,'');
INSERT INTO "SubchapterContent" VALUES (83,12,'[subheading]Wichtig beim Gewindebohren[/subheading] 

[bold]Richtigen Bohrer für die Gewindegröße auswählen[/bold]
Den passenden Bohrer für die gewünschte Gewindegröße wählt man anhand eines Tabellenbuchs aus. 
Alternativ findet man auf der Rückseite mancher Messschieber eine Tabelle mit den Bohrergrößen für verschiedene Gewindemaße.

[bold]Reihenfolge einhalten[/bold]
Die richtige Reihenfolge der Gewindebohrer ist wichtig, um das Material gleichmäßig zu bearbeiten.

[bold]Rückdrehen[/bold]
Um Späne zu brechen, sollte der Bohrer regelmäßig zurückgedreht werden.

[bold]Schneidöl verwenden[/bold]
Schneidöl verringert die Reibung und sorgt für ein sauberes Ergebnis.

[bold]Auf Material achten[/bold]
Verschiedene Materialien benötigen unterschiedliche Bohrer und Techniken.

',7,'');
INSERT INTO "SubchapterContent" VALUES (84,12,'[subheading]Sicherheitsmaßnahmen beim Gewindebohren und -schneiden[/subheading] 

[bold]Schutzbrille tragen[/bold]
Um die Augen vor Spänen zu schützen.

[bold]Gewindebohrer regelmäßig überprüfen[/bold] 
Ein beschädigter Bohrer kann das Werkstück ruinieren.

[bold]Kein Tragen von Handschuhen[/bold]
Immer wieder kommt es an Maschinen mit rotierenden Werkstücken oder Werkzeugen zu Unfällen, weil Handschuhe von den Bedienern getragen werden.
Daher ist besondere Vorsicht geboten.
[LF_2_Gehörschutz_small]

[bold]Arbeitsschutz[/bold]
Gehörschutz ist wichtig, vor allem beim maschinellen Gewindebohren.

',8,'');
INSERT INTO "SubchapterContent" VALUES (85,11,'[heading]Einführung in Befestigungstechniken[/heading] 

[LF_2_Befestigung_welcome]

Damit Bauteile sicher befestigt werden können, gibt es verschiedene Techniken und Werkzeuge. 

Im Folgenden schauen wir uns die verschiedenen Befestigungstechniken und -mittel an, die in der Praxis häufig verwendet werden.
',1,'');
INSERT INTO "SubchapterContent" VALUES (86,11,'[subheading]Schrauben[/subheading] 

Schrauben sind Befestigungsmittel, die durch Drehen in Materialien wie Metall, Holz oder Kunststoff eingedreht werden. 

Je nach Verwendungszweck gibt verschiedene Arten von Schrauben, z.B.:

[bold]Blechschrauben[/bold]
Sie haben ein spitz zulaufendes Gewinde und werden oft verwendet, um Bleche miteinander zu verbinden.

[bold]Holzschrauben[/bold]
Besitzen ein grobes Gewinde und eine Spitze, ideal zum Verbinden von Holz.

[bold]Gewindeschrauben[/bold]
Haben ein durchgehendes, präzises Gewinde und werden oft in Metall oder Kunststoff verwendet, meist mit einer Mutter.

[LF_2_Schraubenarten_zoom]',2,'');
INSERT INTO "SubchapterContent" VALUES (87,11,'[subheading]Gewindetypen[/subheading] 

Gewinde sind die spiralförmigen Rillen an Schrauben, die das Eindrehen in Materialien ermöglichen. 

Zu den gängigen Gewindetypen gehören:

[bold]Regelgewinde[/bold]
Eignet sich für allgemeine Anwendungen und bietet eine stabile Verbindung.

[bold]Feingewinde[/bold]
Ideal, wenn radial wenig Platz zur Verfügung steht, wie bei dünnwandigen hohlen Bauteilen. 
Ein Feingewinde hat einen größeren tragenden Querschnitt und bietet bessere Selbsthemmung, wodurch oft auf eine Schraubensicherung verzichtet werden kann.

[bold]Grobgewinde[/bold]
Grobgewinde zeichnen sich durch eine deutlich größere Steigung im Vergleich zu Regelgewinden aus. 
Auch Schrauben für Holz oder Gipsplatten fallen unter die Kategorie der Grobgewindeschrauben.
',3,'');
INSERT INTO "SubchapterContent" VALUES (88,11,'[subheading]Anziehdrehmoment – Richtig festziehen[/subheading] 

Das Anziehdrehmoment ist die Kraft, die benötigt wird, um eine Schraube festzuziehen.

Wird zu viel Kraft angewendet, können die Schraube oder das Material beschädigt werden.

Ist die Schraube zu locker, besteht die Gefahr, dass sie sich löst.

Das Prinzip des Drehmoments beim Festziehen von Schrauben:
[LF_2_Anziehdrehmoment_zoom]
Eine genauere Erklärung des Drehmoments findest du im Mathemodul, wo die Berechnung und Anwendung ausführlicher beschrieben werden.

Das richtige Anziehdrehmoment erzeugt eine Vorspannkraft, die die Bauteile zusammenhält und ein Lösen durch äußere Kräfte verhindert. 

Daher darf die Schraube weder zu fest noch zu locker sitzen.',6,'');
INSERT INTO "SubchapterContent" VALUES (89,11,'[subheading]Schraubensicherungen[/subheading] 

Damit sich Schrauben bei Vibrationen oder Erschütterungen nicht lösen, gibt es verschiedene Sicherungselemente. 

Diese können zum Beispiel sein:

[bold]Federringe[/bold]
Diese Ringe sorgen für zusätzlichen Halt durch ihre Federkraft.
[LF_2_Federringe_zoom]
[bold]Zahnscheiben[/bold]
Diese Schrauben haben Zähne am Kopf, die sich beim Anziehen in das Material krallen. 

Es gibt verschiedene Arten:

[bullet]Form A - Außengezahnt mit Zähnen, die nach außen zeigen; für flache Oberflächen geeignet.[/bullet]
[bullet]Form J - Innengezahnt mit Zähnen, die nach innen zeigen; ideal für unebene Flächen.[/bullet]
[bullet]Form V: Ähnlich wie A aber mit gewölbter Form, geeignet für versenkte Anwendungen mit einem 90°-Winkel.[/bullet]
[LF_2_Zahnscheiben_zoom]
[bold]Schraubenkleber[/bold]
Ein flüssiger Klebstoff, der auf das Gewinde aufgetragen wird und nach dem Aushärten eine feste Verbindung schafft, die das selbstständige Lösen der Schraube verhindert.
',7,'');
INSERT INTO "SubchapterContent" VALUES (90,11,'[subheading]Nietverbindungen[/subheading] 

Nieten sind unlösbare Verbindungen, die dauerhaft halten und nicht einfach wieder getrennt werden können, ohne die Bauteile zu beschädigen. 

Sie werden verwendet, wenn Schweißen schwierig ist oder die durch Hitze entstehenden Materialveränderungen unerwünscht sind. 

Ein Niet besteht aus einem Setzkopf und einem zylindrischen Schaft. 
Der Schließkopf wird durch das Verformen (Schlagen) des überstehenden Schaftendes geformt.
[LF_2_Blindnieten_zoom]
Damit der Schließkopf hält, sollte der überstehende Schaft etwa 1,5-mal den Durchmesser des Schafts betragen.',8,'');
INSERT INTO "SubchapterContent" VALUES (91,11,'[subheading]Rohrschellen[/subheading] 

Rohrschellen sind Halterungen, die Rohre an Wänden oder Decken fixieren. 
Sie sorgen dafür, dass die Rohre sicher befestigt sind und nicht verrutschen können.

Rohrschellen gibt es in verschiedenen Größen, passend für unterschiedliche Rohrdurchmesser. 
[LF_2_Fallrohrschelle_zoom]
Die Art und Weise, wie Rohre befestigt werden, hängt von verschiedenen Faktoren ab, wie dem Material und Durchmesser des Rohrs, der Temperatur des Mediums im Rohr und der Beschaffenheit von Decken und Wänden.

Für die Montage von Trinkwasserleitungen gibt es bestimmte Richtwerte:

[bullet]Gleitschellen werden genutzt, um Längenänderungen im Rohr aufzunehmen, zum Beispiel bei Temperaturschwankungen.[/bullet]
[bullet]Festpunktschellen fixieren das Rohr fest und sorgen dafür, dass auftretende Kräfte, etwa durch Bewegungen, sicher aufgenommen werden.[/bullet]

Für die Befestigung von Rohrschellen kommen auch Zubehörteile wie Dübel, Stockschrauben, Trägerklammern und Montageschienen zum Einsatz, abhängig von den Anforderungen und dem Einsatzbereich.
',9,'');
INSERT INTO "SubchapterContent" VALUES (93,1,'[subheading]Blattfaltung[/subheading]

Wenn die Zeichnung in einem Ordner abgeheftet werden soll, wird das Zeichenblatt gefaltet. 

Dabei bleibt ein Rand von etwa 20 mm frei, der dafür sorgt, dass das Blatt ordentlich im Ordner abgeheftet werden kann, ohne dass die Zeichnung verdeckt wird.

[LF_1_Blattfaltung_800_zoom]

',2.2,'');
INSERT INTO "SubchapterContent" VALUES (94,13,'[heading]Einführung in Rohrmaterialien[/heading]

[LF_3_Rohre_welcome]

Es gibt verschiedene Rohrmaterialien, die je nach Anwendung unterschiedliche Eigenschaften bieten.

Die Wahl des richtigen Materials hängt von Faktoren wie Druck, Temperatur und Einsatzbereich ab.',1,'');
INSERT INTO "SubchapterContent" VALUES (95,13,'[subheading]Gewinderohre[/subheading]

[bold]Verwendung[/bold]
Gewinderohre haben aufgerollte oder geschnittene Gewinde und werden in der Elektroinstallation sowie in der Gas- und Wasserinstallation verwendet. 

[bold]Lieferform[/bold]
Diese Rohre werden meist in 6-Meter-Stangen geliefert, oft mit Schutzkappen an den Enden, um das Gewinde zu schützen.

[bold]Verbindungsmethode[/bold]
Die Rohre werden durch Verschrauben mit passenden Fittings verbunden, die ebenfalls mit Gewinden versehen sind.',2,'');
INSERT INTO "SubchapterContent" VALUES (96,13,'[subheading]Schweißbare Stahlrohre[/subheading]

[bold]Verwendung[/bold]
Geschweißte Stahlrohre eignen sich für den Transport von Flüssigkeiten, Gasen und Feststoffen und werden auch als Bauelemente eingesetzt. 
Sie sind als geschweißte oder nahtlose Varianten erhältlich. 
Geschweißte Rohre besitzen eine Schweißnaht, die beim Biegen und Verschweißen von flachem Stahl in eine runde Form entsteht. 
Es gibt Rohre, die für das Gewindeschneiden geeignet sind, und solche, die es nicht sind.

[frame]Stahlrohre, besonders bei Gasleitungen, benötigen Korrosionsschutz, zum Beispiel durch Beschichtungen oder Lackierungen.[/frame]
[bold]Lieferform[/bold]
Sie werden in 6- bis 12-Meter-Stangen geliefert und können roh oder verzinkt sein.

[bold]Verbindungsmethode[/bold]
Je nach Rohrtyp werden die Rohre durch Gewindeverbindungen oder direktes Verschweißen verbunden. 
Um eine lösbare Verbindung herzustellen, können Flansche angeschweißt und anschließend verschraubt werden.',3,'');
INSERT INTO "SubchapterContent" VALUES (97,13,'[subheading]Präzisionsstahlrohre[/subheading]

[bold]Verwendung[/bold]
Präzisionsstahlrohre werden aus Edelstahl oder Stahl hergestellt und kommen in der Trinkwasser-, Gas- und Heizungsinstallation zum Einsatz. Sie heißen so, weil sie speziell für Presssysteme mit hoher Maßgenauigkeit gefertigt werden.
Diese Rohre sind besonders glatt und weisen geringe Rauigkeiten auf, was sie strömungsgünstig macht und Druckverluste minimiert.

[bold]Lieferform[/bold]
Die Rohre sind in Standardlängen von 6 oder 12 Metern verfügbar, können aber auch in kundenspezifischen Längen bestellt werden. 
Sie werden sowohl in nahtloser als auch in geschweißter Ausführung angeboten und sind in verschiedenen Stahlqualitäten erhältlich, beschichtet oder unbeschichtet.

[bold]Verbindungsmethode[/bold]
Präzisionsstahlrohre können durch Schweißen oder mit speziellen Fittings verbunden werden. 
[LF_3_Präzisionsstahlrohr_zoom]',4,'');
INSERT INTO "SubchapterContent" VALUES (98,13,'[subheading]Kupferrohre[/subheading]

[bold]Verwendung[/bold]
Kupferrohre sind seit vielen Jahren ein bewährtes Material in der Haustechnik. 
Sie werden für Trinkwasserinstallationen, Heizungsanlagen, Solaranlagen sowie für Gas- und Öl-Installationen eingesetzt. 
Kupfer ist korrosionsbeständig, hat eine gute Wärmeleitfähigkeit und ist hygienisch unbedenklich.

[bold]Lieferform[/bold]
Kupferrohre sind in Längen von 3 bis 5 Metern oder in Ringen von 25 oder 50 Metern erhältlich. 
Sie werden kaltumgeformt und in verschiedenen Festigkeitsstufen (weich, halbhart, hart) angeboten, abhängig von der jeweiligen Anwendung.
[LF_3_Kupferrohre_zoom]
[bold]Verbindungsmethode[/bold]
Kupferrohre können weich- und hartgelötet oder geschweißt werden. 
Für eine dauerhafte Verbindung kommen verschiedene Methoden je nach Einsatzzweck zum Einsatz, wobei insbesondere auf die Anforderungen der jeweiligen Installationen Rücksicht genommen wird.',5,'');
INSERT INTO "SubchapterContent" VALUES (99,13,'[subheading]Kunststoffrohre[/subheading]

[bold]Verwendung[/bold]
Kunststoffrohre sind aufgrund ihrer Korrosionsbeständigkeit und Flexibilität ideal für Trinkwasser-, Heizungs- und Erdgasinstallationen. 
Sie sind leichter als Metallrohre und daher einfach zu verlegen. 
Besonders vorteilhaft ist ihre Beständigkeit gegen Kalkablagerungen, was sie für Warmwasserleitungen beliebt macht. 
[LF_3_PVC_zoom]
Ein Nachteil von Kunststoffrohren ist jedoch, dass sie in einigen Anwendungen weniger formstabil sind. 
Um dies zu kompensieren, werden oft Mehrschicht-Verbundrohre eingesetzt, die Kunststoff mit Aluminium kombinieren und somit mehr Stabilität bieten.

[bold]Lieferform[/bold]
Kunststoffrohre sind in verschiedenen Längen und Formaten erhältlich, von 5 bis zu 300 Metern, je nach Material und Verwendungszweck. 
Sie werden in starren Stangen oder flexiblen Ringen geliefert. 
Die Materialien variieren zwischen PVC-U, PE-HD, PE-X und anderen Kunststoffen, die jeweils für bestimmte Anwendungen ausgelegt sind.

[bold]Verbindungsmethode[/bold]
Je nach Anforderung und Rohrmaterial werden verschiedene Verbindungstechniken eingesetzt. 
Pressverbindungen und Verschraubungen ermöglichen eine schnelle und einfache Montage. 
Für dauerhafte Verbindungen kommen Schweißverfahren wie Heizwendelschweißen und Muffenschweißen sowie Klebetechniken zum Einsatz, um eine stabile und dichte Verbindung zu schaffen.',6,'');
INSERT INTO "SubchapterContent" VALUES (100,13,'[heading]Längenausdehnung bei Rohren[/heading]

[LF_3_Ausdehnung_welcome]
Temperaturunterschiede führen dazu, dass sich Rohrmaterialien ausdehnen oder zusammenziehen.

Dies muss bei der Planung berücksichtigt werden, um Schäden am System zu vermeiden.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (101,13,'[subheading]Längenausdehnung bei Temperaturänderungen[/subheading]

Rohrmaterialien dehnen sich bei steigenden Temperaturen unterschiedlich stark aus. 

Die Ausdehnung hängt vom Material, der Länge des Rohrs und der Temperaturänderung ab.

Um die Längenausdehnung zu berechnen, wird folgende Formel verwendet:
[LF_3_Formel_small]

[section]Erklärung[/section]

[bold]Δ[/bold]
(Delta) Symbolisiert eine Änderung oder Differenz. In dieser Formel steht es für die Änderung, z. B. bei der Länge ([bold]ΔL[/bold]) oder der Temperatur ([bold]ΔT[/bold]).

[bold]L[/bold] 
Steht für die Länge des Rohrs.

[bold]₀[/bold] 
Die 0 bei [bold]L₀[/bold] zeigt an, dass es sich um die ursprüngliche Länge handelt, also die Länge des Rohrs vor der Temperaturänderung.

[bold]α[/bold]
Bezeichnet den Längenausdehnungskoeffizienten, eine Materialkonstante, die angibt, wie stark sich das Material bei Temperaturänderungen dehnt oder zusammenzieht.

[bold]T[/bold]
Steht für die Temperatur, wobei [bold]ΔT[/bold] die Temperaturänderung bezeichnet, also die Differenz zwischen der Anfangs- und der Endtemperatur.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (102,13,'[subheading]Längenausdehnungskoeffizienten[/subheading]

Die Längenausdehnung eines Rohrs ist abhängig vom Material. 

Der Längenausdehnungskoeffizient gibt an, wie stark sich das Material pro Meter Länge ausdehnt, wenn die Temperatur um 1 Kelvin (K) oder 1 Grad Celsius steigt. 

Zum Beispiel dehnt sich Kupfer stärker aus als Edelstahl. 

Ein Vergleich:
[LF_3_Tabelle_Ausdehnung_zoom]

Weitere Materialien und deren Längenausdehnungskoeffizient findest du in deinem Tabellenbuch.
',9,NULL);
INSERT INTO "SubchapterContent" VALUES (103,13,'[subheading]Möglichkeiten der Kompensation der Längenausdehnung[/subheading]

Um Schäden durch die Längenausdehnung zu vermeiden, werden spezielle Bauteile wie Kompensatoren, Biegeschenkel oder U-Bögen verwendet. 

Diese Bauteile nehmen die Bewegung des Rohres bei Temperaturänderungen auf, ohne dass es zu Spannungen oder Brüchen kommt:

[bold]Kompensatoren[/bold] wirken wie flexible Absorber und fangen die Längenänderungen des Rohrs auf.
[LF_3_Längenausdehnung_Kompensator_zoom]
Im Gegensatz zu einem Kompensator ist der [bold]Biegeschenkel[/bold] kein eigenes Bauteil, sondern entsteht durch die gezielte Anordnung von Festpunkt- und Gleitschellen. 
Die Festpunktschelle wird in einem festgelegten Abstand zur Rohrbiegung angebracht und hält das Rohr an dieser Stelle stabil. Die Gleitschellen erlauben dem Rohr, sich bei einer Längenänderung flexibel zu bewegen. 
Dadurch kann sich das Rohr bei Temperaturveränderungen gezielt biegen und dehnen, ohne dass Spannungen entstehen, die das Material belasten.
[LF_3_Längenausdehnung_Biegeschenkel_zoom]
Ein [bold]U-Rohrbogen[/bold] ermöglicht durch seine Form Flexibilität im Rohrsystem. 
Er gibt dem Rohr ausreichend Bewegungsfreiraum, um Längenausdehnungen bei Temperaturschwankungen aufzunehmen, ohne das Rohr zu belasten. 
Die Gleitschellen lassen das Rohr entlang seiner Achse gleiten, wodurch der U-Rohrbogen Dehnungen im Material ausgleicht.
[LF_3_Längenausdehnung_UBogen_zoom]',10,'');
INSERT INTO "SubchapterContent" VALUES (104,14,'[heading]Einführung lösbare Rohrverbindungen[/heading]

[LF_3_Lösbare_Verbindungen_welcome]

Lösbare Rohrverbindungen sind Verbindungen, die bei Bedarf getrennt und wieder montiert werden können. 

Sie werden häufig in Systemen verwendet, bei denen regelmäßige Anpassungen oder Wartungen erforderlich sind.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (105,14,'[subheading]Verschraubungen[/subheading]

[bold]Verwendung[/bold]
Verschraubungen sind eine der am häufigsten verwendeten lösbaren Rohrverbindungen und finden oft Anwendung in Gas-, Wasser- und Heizungsinstallationen. 
Sie bestehen in der Regel aus einem Einschraubteil, das mit einem Einlegeteil über eine Überwurfmutter verbunden wird. Vor der Befestigung am Rohr wird die Überwurfmutter über das Einlegeteil geschoben. 
Zwischen Einschraubteil und Einlegeteil befindet sich entweder eine Dichtung oder eine konische Verbindungsfläche, die eine "metallisch dichte" Verschraubung ermöglicht. 
Dank ihrer einfachen Montage und Demontage sind Verschraubungen sehr praktisch für verschiedenste Installationen.
[LF_3_Verschraubung_flachdichtend_zoom]
[LF_3_Verschraubung_2_zoom]
Zwischen Einlegeteil und Einschraubteil befindet sich entweder eine [bold]Dichtung[/bold] oder die [bold]Verbindungsfläche[/bold] ist konisch, wodurch die Verschraubung „metallisch dichtend“ ist. 
Verschraubungen werden häufig verwendet, da sie sich einfach montieren und demontieren lassen.
[LF_3_Verschraubung_konisch_zoom]
[LF_3_Verschraubung_konisch_2_zoom]
[bold]Lieferform[/bold]
Verschraubungen werden entweder als Set oder als Einzelteile geliefert. 
Sie sind in verschiedenen Ausführungen erhältlich, wie etwa zum Anlöten, Anschweißen, Verpressen oder mit Gewindeanschluss, wahlweise mit Innen- oder Außengewinde.

[bold]Verbindungsmethode[/bold]
Die Verbindung erfolgt durch festes Verschrauben der Rohre mithilfe von Gewinden und Muttern. 
Dichtungen oder konische Dichtflächen sorgen dabei dafür, dass die Verbindung sicher und dicht bleibt.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (106,14,'[subheading]Flanschverbindungen[/subheading]

[bold]Verwendung[/bold]
Flanschverbindungen sind besonders für größere Rohrdurchmesser geeignet. 
Sie werden häufig in industriellen Rohrsystemen verwendet, wo hohe Drücke und Temperaturen herrschen.
[LF_3_Flanschverbindung_zoom]
[bold]Lieferform[/bold]
Flansche werden als Scheiben mit Bohrungen für Schrauben geliefert, die an den Enden der Rohre angebracht werden.

[bold]Verbindungsmethode[/bold]
Flansche werden durch Schrauben miteinander verbunden, wobei eine Dichtung zwischen den Flanschen liegt, um die Verbindung abzudichten.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (107,14,'[subheading]Steckverbindungen[/subheading]

[bold]Verwendung[/bold]
Steckverbindungen bieten eine schnelle und einfache Montage und sind ideal für Anlagen, bei denen Flexibilität und wiederholte Demontage erforderlich sind. 
Diese Verbindungen sind unlösbar oder wieder lösbar, je nach Ausführung, und eignen sich gut für temporäre Installationen.
[LF_3_Steckmuffe_zoom]
[LF_3_Schnitt_Steckmuffe_zoom]
[bold]Lieferform[/bold]
Steckverbindungen werden als Fittings aus Messing, Rotguss oder Kunststoff geliefert und sind mit integrierten Dichtungen ausgestattet. 
Diese Dichtungen ermöglichen eine dichte Verbindung, sobald das Rohr vollständig in das Fitting gesteckt wird. 
Die Fittings sind in gängigen Nennweiten erhältlich und können direkt ohne Werkzeug montiert werden.

[bold]Verbindungsmethode[/bold]
Die Rohre werden bis zum Anschlag in das Fitting geschoben. Ein oder zwei Dicht- und Klemmsysteme, wie Krall- oder Dichtungsringe, sorgen dafür, dass die Verbindung sicher und dicht bleibt. 
Dadurch wird ein fester Halt gewährleistet, ohne dass das Rohr gedreht werden muss. 
Die Steckverbindungen sind zudem gegen Längskraft und Torsionsspannungen gesichert, was sie besonders robust macht.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (108,14,'[subheading]Klemmverbindungen[/subheading]

[bold]Verwendung[/bold]
Klemmverbindungen werden häufig in Trinkwasser- und Heizungsanlagen verwendet. 
Sie bieten eine sichere, aber dennoch lösbare Verbindung, ohne dass spezielle Werkzeuge benötigt werden.

[bold]Lieferform[/bold]
Klemmverbindungen bestehen meistens aus Fittings, Überwurfmuttern, Dichtring und Klemmringen, die die Rohre fest umschließen.

[bold]Verbindungsmethode[/bold]
Das Rohr wird in das Fitting eingeführt und die Überwurfmutter wird festgezogen. 
Dadurch wird das Rohr sicher fixiert und eine dichte Verbindung hergestellt.
[LF_3_Klemmverschraubung_zoom]
[LF_3_Klemmverschraubung_Bezeichnung_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (109,14,'


[frame]Abschließend möchten wir erwähnen, dass Rohrgewinde, anders als man vielleicht anfangs denkt, keine lösbaren Verbindungen sind. Einmal verschraubt, lassen sie sich nur schwer wieder lösen, ohne dass die Verbindung oder das Rohr beschädigt wird. Die Abdichtung erfolgt häufig mit Dichtmitteln oder Hanf.[/frame]',6,NULL);
INSERT INTO "SubchapterContent" VALUES (110,15,'[heading]Unlösbare Rohrverbindungen[/heading]

[LF_3_Unlösbar_welcome]

Unlösbare Rohrverbindungen können nach dem Einbau nicht mehr zerstörungsfrei getrennt werden. 

Sie sind besonders stabil und werden bei hohen Belastungen eingesetzt, weshalb sie, wenn immer möglich, verwendet werden sollten.',1,'');
INSERT INTO "SubchapterContent" VALUES (111,15,'[subheading]Klebeverbindungen für Kunststoffrohre[/subheading]

[bold]Verfahren[/bold]
Kunststoffrohre werden durch das Auftragen von Klebstoff an den Verbindungsstellen dauerhaft zusammengefügt. 
Der Kleber härtet aus und schafft so eine feste Verbindung.

[bold]Anwendung[/bold]
Diese Technik wird vor allem bei PVC-Rohren eingesetzt, die in Trinkwasser- und Abwasserleitungen verwendet werden.

[bold]Arbeitsschritte[/bold]

[bullet]Das Rohr wird im rechten Winkel abgeschnitten, entgratet und außen abgeschrägt, damit es gut passt.[/bullet]

[bullet]Eine Markierung zeigt, wie tief das Rohr in die Muffe geschoben werden muss.[/bullet]

[bullet]Vor dem Kleben werden Rohr und Muffe gründlich mit PVC-Reiniger und Krepppapier gesäubert.[/bullet]

[bullet]Die Innenseite der Muffe und die Außenseite des Rohrs werden gleichmäßig mit Kleber bestrichen.[/bullet]

[bullet]Rohr und Muffe werden zusammengedrückt und ausgerichtet, bis der Kleber fest wird.[/bullet]

[frame]Die verwendeten Reinigungsmittel und Kleber sind entflammbar und gesundheitsschädlich. Bitte auf die Gefahrenhinweise achten![/frame]
',2,'');
INSERT INTO "SubchapterContent" VALUES (112,15,'[subheading]Weich- und Hartlöten[/subheading]

Beim Löten werden zwei Metallteile mit Hilfe eines geschmolzenen Lotes verbunden. 

[bold]Weichlöten[/bold] findet bei Temperaturen unter 450°C statt, während [bold]Hartlöten[/bold] sich besonders für Verbindungen, die höheren thermischen Belastungen ausgesetzt sind, geeignet ist. 
Allerdings verliert Kupfer dabei mechanisch an Festigkeit.
[LF_3_Weichlöten_zoom]',3,'');
INSERT INTO "SubchapterContent" VALUES (113,15,'[section]Werkstoffbeeinflussung beim Hartlöten[/section]

Beim Hartlöten können hohe Temperaturen das Material verändern. 

Kupfer wird dabei oft ohne Flussmittel und nur mit einem Lötfüllmetall verbunden. 

Um das Material jedoch vor Schäden zu schützen, kann ein Flussmittel verwendet werden. 
Es verhindert, dass das Kupfer oxidiert, also dass es durch die Verbindung mit Sauerstoff eine oberflächliche Schicht bildet. 

Dadurch wird die Verbindung verbessert und das Material bleibt während des Lötens intakt.',5,'');
INSERT INTO "SubchapterContent" VALUES (114,15,'[section]Minimaler Rohrdurchmesser beim Hartlöten von Trinkwasserleitungen[/section]

Für Trinkwasserleitungen gelten Mindestanforderungen an den Rohrdurchmesser beim Hartlöten. 

Diese Anforderungen sorgen dafür, dass die Lötstelle stabil ist und keine Undichtigkeiten entstehen. 

Bei einem Rohrdurchmesser unter 28 mm wird empfohlen, Weichlöten zu verwenden.

[LF_3_min_Durchmesser]',6,'');
INSERT INTO "SubchapterContent" VALUES (115,15,'[subheading]Überblick der Schweißverfahren[/subheading]

Schweißen ist eine Methode zur dauerhaften Verbindung von Materialien, insbesondere Metallen, bei der hohe Temperaturen verwendet werden. 

Es gibt verschiedene Verfahren, die je nach Material und Anforderung für unlösbare Rohrverbindungen eingesetzt werden:

[bold]Elektrodenschweißen[/bold]
[bold]MAG-Schweißen[/bold]
[bold]WIG-Schweißen[/bold]
[bold]Autogenschweißen[/bold]

[frame]Beim Schweißen verschmelzen die Grundwerkstoffe, während beim Löten ein zusätzliches Material zur Verbindung verwendet wird, ohne die Werkstoffe selbst zu schmelzen.[/frame]
',11,NULL);
INSERT INTO "SubchapterContent" VALUES (116,15,'[section]Elektrodenschweißen[/section]

Beim Elektrodenschweißen entsteht ein elektrischer Lichtbogen zwischen Werkstück und Elektrode. 
Deshalb wird dieses Verfahren auch als Lichtbogenschweißen bezeichnet
Die Elektrode kann abschmelzend sein und Zusatzmaterial liefern oder nicht abschmelzen. 

[bold]Verfahren[/bold]
Zu den wichtigsten Verfahren gehören das Lichtbogenhandschweißen, das Schutzgasschweißen und das Unterpulverschweißen. 
Der Elektronenfluss sorgt dafür, dass die Anode (Pluspol) heißer wird. 
Meistens fungiert die Elektrode als Anode und das Werkstück als Kathode (Minuspol). 

Bei umhüllten Stabelektroden bestimmt die Umhüllung den Pol: 
Basische Elektroden schweißt man am Pluspol, andere oft am Minuspol zur Reduzierung der Strombelastung
[LF_3_Elektrodenschweißen_zoom]

[bold]Anwendung[/bold]
Die Verfahren sind vielseitig und eignen sich je nach Variante für dickere Materialien oder präzise Verbindungen, wie etwa beim Schutzgasschweißen und Unterpulverschweißen.',12,'');
INSERT INTO "SubchapterContent" VALUES (117,15,'[section]MAG-Schweißen[/section]

[bold]Verfahren[/bold]
Beim MAG-Schweißen (Metall-Aktivgasschweißen) wird eine abschmelzende Drahtelektrode verwendet, die durch ein Aktivgas wie Kohlendioxid oder ein Gasgemisch geschützt wird. 
Das Aktivgas schützt die Schweißnaht und beeinflusst den Schweißprozess durch seine Reaktivität.all zu schützen und die Verbindung zu schaffen.

[bold]Anwendung[/bold]
MAG-Schweißen ist weit verbreitet für das Schweißen von unlegierten und niedrig legierten Stählen. 
Es wird häufig in der industriellen Fertigung verwendet, da es schnell und wirtschaftlich ist und sich gut für dickere Materialien eignet, beispielsweise im Maschinenbau und in der Automobilindustrie.
',13,NULL);
INSERT INTO "SubchapterContent" VALUES (118,15,'[section]WIG-Schweißen[/section]

[bold]Verfahren[/bold]
Das WIG-Schweißen (Wolfram-Inertgasschweißen) nutzt eine nicht abschmelzende Wolframelektrode und ein Inertgas, meist Argon, um die Schweißstelle vor Oxidation zu schützen. 
Das Verfahren ermöglicht präzises Arbeiten, da der Schweißzusatz unabhängig vom Strom zugeführt werden kann.
[LF_3_WIG_zoom]

[bold]Anwendung[/bold]
Dieses Verfahren eignet sich besonders für dünne Bleche und empfindliche Materialien wie Aluminium und Edelstahl, da es saubere, hochwertige Nähte erzeugt. 
WIG-Schweißen wird häufig im Rohrleitungsbau, in der chemischen Industrie und im Apparatebau eingesetzt, wo die Optik und Qualität der Schweißnaht wichtig sind.',14,'');
INSERT INTO "SubchapterContent" VALUES (119,15,'[subheading]Pressverbindungen[/subheading]

Pressverbindungen sind eine Technik, bei der Rohre durch das Verpressen von Fittings dauerhaft verbunden werden.

Pressfittings werden mit Presszangen oder Pressmaschinen auf Kupfer-, Stahl- oder Mehrschichtverbundrohre gepresst.

Es gibt [bold]radiale[/bold] und [bold]axiale[/bold] Pressverfahren, die für Metall- und Kunststoffrohre genutzt werden, insbesondere in Wasser-, Gas- und Heizungsanlagen. 
[frame]Radial bedeutet allgemein "von innen nach außen" oder "in Richtung des Radius," also quer zur Achse. Axial bezieht sich auf Bewegungen oder Kräfte entlang der Achse eines Objekts, also in Längsrichtung.[/frame]

[bold]O-Ringe[/bold] dichten die Verbindungen ab und sind je nach Einsatzbereich farblich markiert, etwa Gelb für Gas oder Rot für Solaranlagen.
Unverpresste Verbindungen sind undicht, da die O-Ringe das Medium austreten lassen, solange die Verpressung fehlt. 
Dadurch werden Leckagen sofort sichtbar und können vor der Inbetriebnahme behoben werden.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (120,15,'[subheading]Steckverbindungen[/subheading]

[bold]Verfahren[/bold]
Wie erwähnt, gibt es Steckverbindungen in wieder lösbaren und unlösbaren Varianten. 
Bei diesen Verbindungen sorgen Dichtungen für den Halt, sodass die Rohrenden ohne Verformung und ohne Werkzeuge zusammengefügt werden können. 
Die Rohre werden einfach ineinander gesteckt und durch die Dichtungen abgedichtet.
[LF_3_Steckmuffe_zoom]
[bold]Anwendung[/bold]
Dieses Verfahren wird vor allem dann eingesetzt, wenn schnelle und flexible Verbindungen benötigt werden. 

Steckverbindungen eignen sich besonders gut für kleinere Installationsprojekte.
[LF_3_Schnitt_Steckmuffe_zoom]',10,'');
INSERT INTO "SubchapterContent" VALUES (121,16,'[heading]Bauteile erstellen[/heading]

[LF_4_Baugruppen_welcome]

Eine Baugruppe besteht aus mehreren Einzelteilen, die zu einer funktionalen Einheit zusammengefügt werden.

Techniken wie das Z-Maß und das Rohrbiegen unterstützen dabei, die Arbeit zu erleichtern und präzise Verbindungen zwischen den Komponenten herzustellen.',1,'');
INSERT INTO "SubchapterContent" VALUES (122,16,'[subheading]Z-Maß-Methode[/subheading]

Um Rohre zwischen Fittings oder Armaturen korrekt einzubauen, ist es hilfreich, die genaue Rohrlänge im Voraus zu kennen, damit die Teile passgenau verbunden werden können. 

Das Z-Maß hilft dabei, die benötigte Rohrlänge zu berechnen, sodass die Rohre direkt auf die richtige Länge zugeschnitten werden können, ohne nachträgliche Anpassungen.

[bold]Z-Maß[/bold]
Ist die Länge ab Gewindeende bis zur Mitte des Fittings.
[LF_3_ZMaß_zoom]

[bold]Formel zur Berechnung der Rohrlänge[/bold]
[LF_3_Formel_Zuschnittlänge_small]

[bold]Erklärung[/bold]

[bold]L[/bold] - benötigte Rohrlänge
[bold]M[/bold] - vorgegebenes Maß
[bold]z₁ und z₂[/bold] - Z-Maß der Fittings

[bold]Beispiel[/bold]
[LF_3_Rohrlänge_zoom]
Eine Wasserleitung soll mit zwei Bögen verlegt werden. 
Das vorgegebene Maß zwischen den Bögen beträgt 200 mm. Das Z-Maß der Fittings an beiden Enden beträgt jeweils 15 mm.

L = 200 mm - (15 mm + 15 mm)

L = 200 mm - 30 mm

L = 170 mm

Die benötigte Rohrlänge beträgt [bold]170 mm[/bold].

[frame]Die Z-Maß-Methode kann auch bei Löt- als auch bei Pressfittings angewendet werden.[/frame]',2,'');
INSERT INTO "SubchapterContent" VALUES (123,16,'[subheading]Rohrbiegen[/subheading]

Rohre werden gebogen, um sie an bauliche Gegebenheiten und Leitungsverläufe anzupassen, ohne zusätzliche Fittings oder Verbindungsstücke einsetzen zu müssen. 
Dadurch spart man Material, reduziert Verbindungen und minimiert mögliche Schwachstellen in der Leitung.
[LF_3_gebogenes_Rohr_zoom]
Beim Rohrbiegen gibt es zwei gängige Methoden: 

[bold]Kaltbiegen[/bold]
Das Rohr wird bei Raumtemperatur gebogen, ohne dass es vorher erhitzt wird. 
Werkzeuge wie Rohrbiegezangen oder Rohrbiegegeräte kommen hier zum Einsatz.

[bold]Warmbiegen[/bold]
Hier wird das Rohr an der Biegestelle erwärmt, um es einfacher zu biegen. 
Dazu werden Werkzeuge wie Gasbrenner und Biegeschablonen verwendet.

[section]Neutralen Faser[/section]

Beim Biegen wird die Außenseite des Rohres gedehnt, während die Innenseite gestaucht wird.
Die neutrale Faser verläuft in der Mitte des Rohrs und bleibt von diesen Spannungen verschont, das bedeutet, dass hier keine Verformung stattfindet.
[LF_3_neutrale_Faser_zoom]
Dies ist der Punkt, an dem die Länge des Rohrs konstant bleibt, unabhängig von der Biegeverformung an den äußeren und inneren Bereichen.',3,'');
INSERT INTO "SubchapterContent" VALUES (124,16,'[section]Kaltbiegen[/section]

Beim Kaltbiegen wird das Rohr ohne Wärmezufuhr gebogen. 
Dieses Verfahren ist besonders für dünnwandige Rohre geeignet, da es präzise und ohne großen Kraftaufwand durchgeführt werden kann.

[bold]Werkzeuge und deren Verwendung[/bold]

[bullet]Rohrbiegezange - Handwerkzeug für kleinere Rohre; durch Druck an der Biegestelle wird das Rohr gebogen.[/bullet]
[bullet]Rohrbiegegerät - Mechanisches Gerät für größere Rohre; Hebel- oder Hydrauliksystem für gleichmäßige Biegungen.[/bullet]
[LF_3_Biegegerät_zoom]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (125,16,'[section]Anwärmlänge und ihre Verteilung beim Rohrbiegen[/section]

[bold]Anwärmlänge[/bold]
Der Bereich des Rohres, der beim Warmbiegen erhitzt wird, um das Material biegsam zu machen. 
Die Länge dieses Bereichs wird berechnet und auf den Biegeschenkel verteilt, um eine saubere Biegung zu ermöglichen.
[LF_3_Anwärmlänge_zoom]
[bold]Verteilung der Anwärmlänge[/bold]
Die Erwärmung erfolgt im Verhältnis 1/3 auf den Biegeschenkel und 2/3 auf den Maßschenkel. 

[bold]Biegeschenkel[/bold]
Der Teil des Rohres, der tatsächlich gebogen wird. Die Anwärmlänge wird auf diesen Bereich aufgebracht, um ihn flexibel zu machen und eine präzise Biegung zu ermöglichen.

[bold]Maßschenkel[/bold]
Der gerade, ungebogene Abschnitt des Rohres, der exakt gemessen wird, um die richtige Länge des Rohrs nach der Biegung sicherzustellen.

Durch die korrekte Erwärmung und Verteilung der Anwärmlänge auf den Biegeschenkel wird eine präzise und saubere Rohrbiegung gewährleistet.
',5,'');
INSERT INTO "SubchapterContent" VALUES (127,16,'[section]Formel zur Berechnung der Anwärmlänge[/section]

Beim Warmbiegen von Rohren gibt es zwei Formeln zur Berechnung der Anwärmlänge, die je nach Biegewinkel und Präzisionsanforderung eingesetzt werden. 

[bold]Formel für die Anwärmlänge[/bold]
[LF_3_Formel_Anwärmlänge_small]
[bold]L[/bold] - Länge, hier: Anwärmlänge
[bold]r[/bold] - Biegeradius, also der Abstand vom Mittelpunkt des Bogens zur Biegestelle
[bold]π[/bold] - Kreiszahl Pi (ca. 3,14159), die den Zusammenhang zwischen Durchmesser und Umfang eines Kreises beschreibt
[bold]α[/bold] - Biegewinkel in Grad
[bold]360[/bold] - Anzahl der Grad in einem vollständigen Kreis (360 Grad)

Diese Formel wird verwendet, wenn der Biegewinkel nicht 90° beträgt oder eine hohe Präzision erforderlich ist. 
Sie liefert exakte Ergebnisse und eignet sich für alle Winkelgrößen.

[bold]Näherungsformel[/bold]
[LF_3_Näherungsformel_small]
[bold]L[/bold] - Länge, hier: Anwärmlänge
[bold]1,5[/bold] - Faktor, der den Biegeradius multipliziert
[bold]r[/bold] - Biegeradius, also der Abstand vom Mittelpunkt des Bogens zur Biegestelle

Die Näherungsformel wird verwendet, wenn der Biegewinkel genau 90° beträgt und keine hohe Genauigkeit notwendig ist. 
Sie ist schneller und einfacher in der Anwendung, liefert jedoch weniger präzise Ergebnisse.
',7,'');
INSERT INTO "SubchapterContent" VALUES (129,17,'[heading]Instandhalten technischer Systeme[/heading]

[LF_4_Instandhalten_welcome]
In dieser Einheit lernst du, wie technische Systeme gewartet und instandgehalten werden. 

Durch regelmäßige Wartung kannst du Störungen vermeiden und die Lebensdauer der Anlagen verlängern.',1,'');
INSERT INTO "SubchapterContent" VALUES (130,17,'[bold]Aufgaben und Bedeutung der Instandhaltung von SHK-Anlagen[/bold]

Instandhaltung sorgt dafür, dass SHK-Anlagen dauerhaft sicher und funktionstüchtig bleiben. 
Regelmäßige Kontrollen und Wartungen helfen, Defekte frühzeitig zu erkennen und rechtzeitig zu beheben, bevor größere Schäden entstehen.

[bold]Ziele der Instandhaltung[/bold]

[bullet]Verlängerung der Lebensdauer der Anlage[/bullet]
[bullet]Vermeidung von Ausfällen[/bullet]
[bullet]Erhaltung der Sicherheit für den Benutzer[/bullet]
',2,'');
INSERT INTO "SubchapterContent" VALUES (131,17,'[bold]Die drei Grundpfeiler der Instandhaltung[/bold]

Die Instandhaltung umfasst drei Hauptbereiche:

[bold]Inspektion[/bold]
Regelmäßige Überprüfung, um den Zustand der Anlage zu bewerten und Fehler frühzeitig zu erkennen.
[LF_4_Inspektion]
[bold]Wartung[/bold]
Hierbei werden Maßnahmen durchgeführt, um die Anlage funktionsfähig zu halten, wie z.B. die Reinigung von Filtern oder der Austausch von Verschleißteilen.

[bold]Instandsetzung[/bold]
Reparaturen, wenn Teile der Anlage bereits beschädigt sind, um den ursprünglichen Zustand wiederherzustellen.
[LF_4_Instandsetzung]',3,'');
INSERT INTO "SubchapterContent" VALUES (132,17,'[subheading]Regelmäßige Wartung von Heizungsanlagen[/subheading]

Heizungsanlagen sollten einmal jährlich auf ihre Funktion geprüft werden, um die Leistung zu erhalten. 
Dabei werden unter anderem der Druck im System kontrolliert und die Heizung auf Undichtigkeiten untersucht. Zusätzlich erfolgt eine Reinigung der feuerberührten Teile und anschließend eine Abgasmessung.

[section]Abgasmessungen bei Wärmeerzeugern[/section]

Abgasmessungen sind erforderlich, um zu prüfen, ob der Heizkessel effizient arbeitet und keine Schadstoffe freisetzt, die über den gesetzlichen Grenzwerten liegen. 
Dabei werden der Kohlenmonoxid-Wert und die Abgastemperatur überwacht.

[frame]Die Abgasmessung gibt Aufschluss darüber, wie gut der Heizkessel funktioniert. Überhöhte Werte können auf Defekte hinweisen.[/frame]
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (135,17,'[section]Wartung von Wasserfiltern[/section]

Wasserfilter verhindern, dass Schmutz und Fremdpartikel in die Wasserleitungen gelangen. 
Diese Filter müssen regelmäßig gewartet werden, um eine gute Wasserqualität zu gewährleisten. Dies geschieht durch Reinigung oder Austausch des Filterelements

[bold]Rückspülbare Filter[/bold]
Rückspülbare Filter reinigen sich, indem Wasser durch den Filter gespült wird, um angesammelte Partikel zu entfernen. 
Dieser Vorgang stellt sicher, dass der Filter verwendet werden kann, ohne ersetzt zu werden.
[LF_5_Wasserfilter_zoom]
[bold]Kerzenfilter[/bold]
Im Gegensatz zu rückspülbaren Filtern, die durch Spülen gereinigt werden, müssen Kerzenfilter regelmäßig ausgetauscht werden, da sie mit der Zeit verstopfen.

Wartungsschritte:
[bullet]Filtertasse reinigen und auf Risse prüfen[/bullet]
[bullet]Verunreinigungen entfernen und den Filter austauschen[/bullet]',7,'');
INSERT INTO "SubchapterContent" VALUES (137,17,'[section]Druckminderer[/section]

Ein Druckminderer schützt die Wasserleitungen und Geräte vor zu hohem Druck.

Die Wartung von Druckmindern erfolgt durch regelmäßige Inspektionen und Reinigung. 
Dabei wird überprüft, ob der eingestellte Druck gehalten wird und ob Verschleißteile, wie Dichtungen, in gutem Zustand sind. 
[LF_4_Druckminderer_zoom]
In einigen Fällen muss das Ventil gereinigt oder ausgetauscht werden, um eine einwandfreie Funktion zu gewährleisten. 
Es wird auch sichergestellt, dass keine Leckagen vorhanden sind und der Druckminderer frei von Ablagerungen oder Verstopfungen ist.
',9,'');
INSERT INTO "SubchapterContent" VALUES (138,17,'[subheading]Wartung von elektrischen Betriebsmitteln[/subheading]

Elektrowerkzeuge müssen regelmäßig gewartet werden, um sicher und funktionsfähig zu bleiben. 
Neben Sichtprüfungen sind auch Reinigung und Pflege wichtig, um Defekte und Unfälle zu vermeiden.

[bold]Wartungsmaßnahmen:[/bold]

[bullet]Prüfung von Kabeln auf Risse oder Beschädigungen[/bullet]
[bullet]Reinigung und Schmierung von beweglichen Teilen[/bullet]
[bullet]Überprüfung von Steckern und Anschlüssen auf festen Sitz[/bullet]
[bullet]Kontrolle der Schutzvorrichtungen und Sicherungen[/bullet]
',10,'');
INSERT INTO "SubchapterContent" VALUES (142,18,'[heading]Einführung in die Elektrotechnik[/heading]

[LF_4_Elektrotechnik_welcome]

Elektrotechnik befasst sich mit der Erzeugung, Nutzung und dem Verhalten von elektrischem Strom. 

In diesem Kapitel lernst du die Grundlagen kennen: 
von der Stromart über die Spannung bis hin zur Berechnung des Widerstands und der elektromagnetischen Induktion.',1,'');
INSERT INTO "SubchapterContent" VALUES (143,18,'[subheading]Was ist Strom?[/subheading]

Elektrischer Strom ist der Fluss von Elektronen durch einen Leiter, wie zum Beispiel ein Kabel. 

Diese Elektronen bewegen sich kontinuierlich vom Minuspol, wo ein Überschuss an Elektronen besteht, zum Pluspol, wo ein Mangel an Elektronen herrscht. 

Dieser Fluss der Elektronen trägt elektrische Energie von einem Punkt zum anderen.

[section]Es gibt zwei Hauptarten von Strom:[/section]

[bold]Gleichstrom (DC)[/bold]
Gleichstrom fließt konstant in eine Richtung und wird in Geräten wie Batterien, Solarzellen und Elektronik verwendet. 
Er ist ideal für mobile Geräte (z.B. Smartphones), da Batterien Gleichspannung speichern und liefern können.

[LF_4_DC]

[bold]Wechselstrom (AC)[/bold]
Wechselstrom ändert ständig die Richtung und wird für die Stromversorgung von Gebäuden genutzt, da er sich besser über weite Strecken transportieren lässt. 
Durch Transformatoren kann die Spannung leicht angepasst werden, was ihn effizient und sicher für große Stromnetze macht.

[LF_4_AC]',2,'');
INSERT INTO "SubchapterContent" VALUES (144,18,'[subheading]Was ist Spannung?[/subheading]

Spannung ist die treibende Kraft, die den Elektronenfluss durch einen Leiter ermöglicht und wird in [bold]Volt (V)[/bold] gemessen. 

Sie funktioniert ähnlich wie der Druck in einem Wasserrohr-System: 
Je höher der Druck, desto mehr Wasser kann in der gleichen Zeit durch die Rohre fließen. 

Genauso verhält es sich bei der Spannung – je größer der Unterschied zwischen dem [bold]Minuspol[/bold] (Elektronenüberschuss) und dem [bold]Pluspol[/bold] (Elektronenmangel), desto stärker die Spannung und desto mehr Elektronen können in Bewegung gesetzt werden.

In Europa beträgt die Spannung in einer normalen Steckdose meist 230 Volt. Im Ortsnetz sind es 400 Volt und im Hochspannungsnetz liegt die Spannung bei 220 bis 300 Kilovolt.

[bold]Spannungsmessung[/bold]
Zur Messung von Spannung wird ein Voltmeter parallel zum Bauteil angeschlossen, um den Spannungsabfall zwischen zwei Punkten zu erfassen. 
Auch hier kann ein Multimeter verwendet werden, da es sowohl die Spannung als auch Strom und Widerstand misst und somit vielseitig einsetzbar ist.
[LF_4_Spannung_zoom]',5,'');
INSERT INTO "SubchapterContent" VALUES (145,18,'[subheading]Widerstand[/subheading]

Ein Widerstand hat zwei wichtige Bedeutungen: 
Einerseits ist er ein Bauteil in einem Stromkreis, andererseits beschreibt er die Eigenschaft eines Materials, den Stromfluss zu hemmen.

[bold]Widerstand als Bauteil[/bold]
In einem Stromkreis reguliert ein Widerstand den Stromfluss, um andere Bauteile vor Überlastung zu schützen. Der Widerstand wird in Ohm (Ω) gemessen. Je höher der Widerstand, desto weniger Strom kann durchfließen, und umgekehrt. Widerstände werden in vielen Geräten eingesetzt, zum Beispiel zur Steuerung der Helligkeit von Lampen oder zur Begrenzung des Stroms, der durch ein Bauteil fließt.

[bold]Widerstand als physikalische Eigenschaft[/bold]
Der Widerstand eines Materials zeigt, wie stark es den Stromfluss hemmt. 
Ein höherer Widerstand bedeutet, dass der Strom schwerer durch das Material fließt. 

[section]Farbcodierungen bei Widerständen[/section]
Widerstände als Bauteil haben Farbringe, um ihren Wert anzugeben. 
Diese Farbringe stehen für Zahlen und einen Multiplikator, der den Wert in Ohm angibt. 
[LF_4_Widerstand_zoom]
Zum Beispiel steht Rot-Rot-Rot-Gold für 2.200 Ohm (2,2 kΩ) mit einer Toleranz von ±5 %.

[section]Verwendung von Widerständen[/section]
Widerstände wandeln einen Teil des elektrischen Stroms in Wärme um, was bei der Planung von Stromkreisen berücksichtigt werden muss. 
Sie sind in vielen Geräten zu finden und helfen, den Stromfluss zu kontrollieren und Geräte vor Überlastung zu schützen.
',6,'');
INSERT INTO "SubchapterContent" VALUES (146,18,'[subheading]Induktion[/subheading]

[section]Was ist Induktion?[/section] 
Induktion ist ein physikalischer Prozess, bei dem eine elektrische Spannung erzeugt wird, wenn sich ein Magnetfeld in der Nähe eines Leiters (wie einer Spule) verändert. 

Dieser Effekt wurde von Michael Faraday entdeckt und bildet die Grundlage vieler elektrischer Geräte und Technologien.

[section]Erzeugung von Strom durch Induktion[/section]

[bold]Dynamo am Fahrrad[/bold]
In einem Dynamo wird Strom erzeugt, indem ein Magnet an einer Spule vorbeibewegt wird. 
Das sich verändernde Magnetfeld induziert eine Spannung in der Spule, die dann eine Lampe zum Leuchten bringt.

[bold]Windkraftanlagen[/bold]
In Windkraftanlagen drehen die Rotorblätter einen Generator. 
Dabei bewegen sich Magneten um Spulen oder umgekehrt, wodurch ein sich veränderndes Magnetfeld entsteht und so Strom induziert wird.

[section]Übertragung von Strom durch Induktion[/section]

[bold]Transformatoren[/bold]
Transformatoren verwenden zwei Spulen (Primär- und Sekundärspule), die um einen gemeinsamen Kern gewickelt sind. 
Der Strom in der Primärspule erzeugt ein wechselndes Magnetfeld, das im Kern geleitet wird. 
Dieses Magnetfeld induziert dann eine Spannung in der Sekundärspule und überträgt so die Energie. 
Transformatoren sind entscheidend für die Spannungsanpassung bei der Stromübertragung.
[LF_4_Transformator_zoom]
[bold]Induktionskochfeld[/bold]
Bei Induktionskochfeldern wird Strom in einer Spule unter der Kochfläche durch Wechselstrom erzeugt, was ein wechselndes Magnetfeld verursacht. 
Dieses Magnetfeld erzeugt dann Wärme im Boden eines geeigneten Kochgeschirrs durch Induktion.

[bold]Kabelloses Laden[/bold]
In kabellosen Ladegeräten für Handys befindet sich eine Spule im Ladegerät und eine weitere im Gerät. 
Durch ein sich änderndes Magnetfeld in der Ladegerätespule wird eine Spannung in der Empfängerspule des Handys induziert, was die Batterie auflädt.',9,'');
INSERT INTO "SubchapterContent" VALUES (147,18,'[subheading]Elektrischer Stromkreis[/subheading]

Ein elektrischer Stromkreis ist eine Verbindung, durch die der Strom von einer Stromquelle, wie einer Batterie, fließen kann. Damit der Strom fließen kann, müssen drei Dinge vorhanden sein:

[section]Stromquelle[/section]
Dies ist die Quelle der elektrischen Energie, wie z.B. eine Batterie oder ein Generator.

[section]Leiter[/section]
Dies ist das Material, durch das der Strom fließt, wie z.B. ein Kupferdraht. Elektronen bewegen sich durch den Leiter.

[section]Verbraucher[/section]
Dies ist ein Gerät, das den Strom nutzt, z.B. eine Lampe oder ein Motor. 
Der Strom bringt das Gerät dazu, seine Arbeit zu tun, wie Licht zu erzeugen oder sich zu drehen.

[section]Geschlossener Stromkreis[/section]
Ein Stromkreis muss geschlossen sein, damit der Strom fließen kann. 
Das bedeutet, dass der Strom einen ununterbrochenen Weg von der Stromquelle, durch den Leiter und den Verbraucher, und zurück zur Stromquelle hat. 
[LF_4_geschlossen]
Wenn der Stromkreis geschlossen ist, fließt der Strom kontinuierlich und betreibt das Gerät.

[section]Offener Stromkreis[/section]
Wenn der Stromkreis an irgendeiner Stelle unterbrochen wird – zum Beispiel, wenn ein Schalter ausgeschaltet ist oder ein Kabel getrennt wird – kann der Strom nicht mehr fließen. 
Das Gerät funktioniert dann nicht mehr, weil der Stromkreis offen ist.
[LF_4_offen]',3,'');
INSERT INTO "SubchapterContent" VALUES (148,19,'[heading]Schutzeinrichtungen in der Elektrotechnik[/heading]

[LF_4_Schutzeinrichtungen_welcome]

Elektrischer Strom kann gefährlich sein, wenn er den menschlichen Körper durchfließt.

Daher ist es wichtig, sich mit den möglichen Gefahren und Schutzmaßnahmen auszukennen.
',1,'');
INSERT INTO "SubchapterContent" VALUES (149,19,'[subheading]Gefahren des elektrischen Stroms[/subheading]

Elektrischer Strom kann bei unsachgemäßem Umgang sehr gefährlich sein. 
Schon geringe Stromstärken können schwere Verletzungen verursachen, insbesondere wenn der Körper direkten Kontakt mit einer Stromquelle hat.

[section]Kleine Stromstärken (bis 10 mA)[/section]
In diesem Bereich kann der Strom bereits spürbar sein, verursacht jedoch meist nur ein leichtes Muskelzucken oder Kribbeln und bleibt in der Regel harmlos.
Die Stromstärke in einer typischen LED-Lampe liegt im Bereich von 5-20 mA.

[LF_4_Kopfhörer_small]

In vielen Kopfhörern fließen kleine Ströme, meist im Bereich von 1-10 mA.

[section]Mittlere Stromstärken (10-50 mA)[/section]
Strom in diesem Bereich kann bereits gefährlich werden, da er Muskelkrämpfe und Atemprobleme verursachen kann. 
In Ladegeräten für Smartphones und andere kleine Geräte liegt die Stromstärke oft zwischen 10 und 30 mA. 
Wenn eine Person eine Spannung von etwa 50 V berührt, kann ein Strom von 10 bis 30 mA durch den Körper fließen und deutlich spürbar sein.

[section]Hohe Stromstärken (> 50 mA)[/section]
Ab einer Stromstärke von über 50 mA besteht akute Lebensgefahr, da schwere Verletzungen wie Muskelkrämpfe, Atemstillstand oder sogar Herzstillstand auftreten können. 
Berührt man beispielsweise eine defekte Kaffeemaschine, die noch an eine 230-V-Steckdose angeschlossen ist, kann dieser Strom durch den Körper fließen und lebensbedrohliche Folgen haben.

[frame]Nasse Haut senkt den Körperwiderstand, wodurch der Strom leichter durch den Körper fließt und die Gefahr erhöht.[/frame]

Um sich vor den Gefahren des elektrischen Stroms zu schützen, kommen Sicherungen und andere Schutzvorrichtungen zum Einsatz, die den Stromkreis bei Überlastung unterbrechen.',2,'');
INSERT INTO "SubchapterContent" VALUES (151,19,'[subheading]Schmelzsicherungen[/subheading]

Schmelzsicherungen unterbrechen den Stromkreis, wenn die Stromstärke einen bestimmten Wert überschreitet.
 
Der Schmelzdraht im Inneren der Sicherung schmilzt bei Überlast und trennt so den Stromkreis.

[section]Arten von Schmelzsicherungen[/section]

[bold]Schraubsicherungen[/bold]
Schraubsicherungen sind oft in älteren Haushalten zu finden. 
Sie haben einen austauschbaren Einsatz, der mit einer Schraubkappe gesichert ist. 
[LF_4_Schraubsicherungen_zoom]
Wenn der Schmelzdraht bei Überlast oder Kurzschluss schmilzt, kann man den Einsatz einfach wechseln, ohne die gesamte Sicherung austauschen zu müssen. 
Diazed- (D-) und Neozed- (NDZ-) Sicherungen sind typische Varianten und für verschiedene Stromstärken ausgelegt.

[bold]Feinsicherungen[/bold]
Feinsicherungen sind kleine Sicherungen aus Glas oder Keramik, die in elektronischen Geräten wie Computern, Radios und Messgeräten verwendet werden. 
Sie schützen empfindliche Geräte vor Überlast und Kurzschluss und haben eine geringe Nennstromstärke. 
[LF_4_G_Sicherung_zoom]
Geräteschutzsicherungen sind speziell für den Geräteschutz konzipiert und bieten verschiedene Schaltcharakteristiken (träge, mittel, schnell). 
Diese Sicherungen sind einfach austauschbar und kommen oft in Größen wie 5x20 mm oder 6,3x32 mm.

[bold]NH-Sicherungen (Niederspannungs-Hochleistungssicherungen)[/bold]
NH-Sicherungen eignen sich für hohe Stromstärken und werden in industriellen Anwendungen eingesetzt. 
Sie haben einen robusten Keramikkörper und werden in Halterungen befestigt. 
Da sie für große Lasten ausgelegt sind, lassen sie sich nicht leicht austauschen und erfordern dafür spezielle Werkzeuge.
[LF_4_NH_Sicherungen_zoom]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (154,19,'[subheading]Leitungsschutzschalter (LS-Schalter)[/subheading]

Leitungsschutzschalter, oder LS-Schalter, schützen elektrische Leitungen vor Überlastung und Kurzschluss und entsprechen den VDE-Normen 0641 und 0660. 

Sie sind strombegrenzende Selbstschalter, die nach dem Auslösen wieder eingeschaltet werden können und bieten mehr Sicherheit als herkömmliche Schmelzsicherungen, da ein Austausch des Sicherungselements nicht nötig ist.

[frame]Die VDE (Verband der Elektrotechnik, Elektronik und Informationstechnik) ist eine deutsche Organisation, die Sicherheitsstandards und Normen für elektrische Systeme festlegt. Sie sorgt für einheitliche Richtlinien zur Sicherheit und Qualität elektrischer Geräte und prägt technische Standards in Deutschland und Europa.[/frame]',4,'');
INSERT INTO "SubchapterContent" VALUES (155,19,'[section]Funktionsweise des LS-Schalters[/section]

Ein Leitungsschutzschalter (LS-Schalter) nutzt die physikalischen Effekte von Wärme und Magnetismus, um Leitungen bei Überlastung und Kurzschluss zu schützen.

[bold]Thermischer Auslöser[/bold]
Im Überlastfall erwärmt sich ein Bimetall, das sich mit zunehmender Temperatur verbiegt. 
Der thermische Auslöser besteht aus einem Bimetallstreifen, der sich bei Überlastung erhitzt und verbiegt. 
Sobald eine bestimmte Temperatur erreicht ist, unterbricht er den Stromkreis und schützt so die Leitung vor Überhitzung. 
Dieser Vorgang ist langsamer als der magnetische Auslöser.
[LF_4_Schutzschalter_zoom]
[bold]Magnetischer Auslöser[/bold]
Im Kurzschlussfall reagiert der elektromagnetische Auslöser. 
Die Wärme reicht hier nicht aus, daher wird durch das entstehende starke Magnetfeld ein Anker angezogen, der den Stromfluss sofort stoppt. 
Der magnetische Auslöser reagiert unmittelbar auf plötzliche und starke Kurzschlussströme. Bei einem Kurzschluss wird ein starkes Magnetfeld erzeugt, das eine Spule aktiviert. Diese Spule zieht einen Metallanker an, der den Stromkreis innerhalb von Millisekunden unterbricht. 
Dadurch wird die Leitung schnell vor hohen Strömen geschützt, die bei einem Kurzschluss auftreten können.
[LF_4_Leitungsschutzschalter_zoom]
[frame]Ein Bimetall besteht aus zwei Metallschichten mit unterschiedlichen Ausdehnungskoeffizienten. Wenn es erhitzt wird, dehnen sich die Metalle unterschiedlich stark aus, wodurch sich das Bimetall verbiegt. Dieser Effekt wird in Leitungsschutzschaltern genutzt, um bei Überlastung den Stromkreis zu unterbrechen.[/frame]',5,'');
INSERT INTO "SubchapterContent" VALUES (156,19,'[section]Typen und Anwendungen von LS-Schaltern[/section]

LS-Schalter sind in ein- oder mehrpoligen Varianten für Ströme bis 63 A erhältlich und können auch einen Neutralleiterschalter enthalten. 

[bold]Typ B[/bold] ist für Haushaltsgeräte geeignet und schaltet bei Überlast oder Kurzschluss ab. 

[bold]Typ C[/bold] hingegen ist für Geräte mit hohem Einschaltstrom, wie Elektromotoren, gedacht. 

[frame]Die Auslösecharakteristik, z.B. Typ b oder Typ C, stellt sicher, dass je nach Typ unterschiedliche Stromspitzen sicher unterbrochen werden können.[/frame]
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (158,20,'[heading]Elektrische Schaltpläne[/heading]

[LF_4_Pläne_welcome]

Elektrische Schaltpläne helfen dabei, den Aufbau von elektrischen Anlagen verständlich darzustellen und erleichtern die Installation und Wartung. ',1,'');
INSERT INTO "SubchapterContent" VALUES (159,20,'[subheading]Schaltzeichen in der Elektrotechnik[/subheading]

In der Elektrotechnik werden Schaltzeichen genutzt, um Bauteile und Verbindungen in Schaltplänen darzustellen. 

Sie vereinfachen die Lesbarkeit und helfen, die Funktionsweise der Schaltung schnell zu verstehen. 

Jedes Bauteil, wie ein Schalter, ein Widerstand oder eine Leitung, hat ein eigenes Schaltzeichen, das oft auf dem Aussehen und der Funktion des Bauteils basiert. 

Schaltzeichen sind genormt, sodass sie international verstanden werden.

[bold]Beispiele[/bold]

[LF_1_Schaltzeichen_Erde_small]
[LF_1_Schaltzeichen_Masse_small]
[LF_1_Potentialausgleich_small]
[LF_1_Schutzpotentialausgleich_small]
[LF_4_Ausschalter_small]',2,'');
INSERT INTO "SubchapterContent" VALUES (161,20,'[subheading]Schaltplan[/subheading]

Ein Schaltplan in der Elektrotechnik zeigt die genaue Position und Anordnung von elektrischen Bauteilen, Leitungen und Anschlüssen in einem Gebäude. 

Er dient als detaillierte Arbeitsgrundlage für Elektriker und Planer, um die Verlegung der Kabel und die Installation von Steckdosen, Schaltern und Verteilern zu koordinieren. 

Typischerweise enthält ein Schaltplan auch Symbole für die verschiedenen Komponenten sowie Angaben zur Stromversorgung und Sicherheitsanforderungen.

Auf der folgenden Skizze siehst du einen [bold]Schaltplan[/bold] für ein Badezimmer:
[LF_4_Schaltplan_zoom]

Hier ist der [bold]Schaltplan in einer räumlichen Darstellung[/bold] eines Badezimmers zu sehen:
[LF_4_Schaltplan_2_zoom]

Und hier siehst du die fertige [bold]elektrische Installation[/bold] in der räumlichen Darstellung:
[LF_4_Schaltplan_3_zoom]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (162,21,'[heading]Elektrische Installation[/heading]

[LF_4_Elektrische_Installation_welcome]

Elektrische Installationen sind in jedem Gebäude notwendig, um Geräte, Leuchten und Maschinen mit Strom zu versorgen.

In diesem Kapitel werden wir uns die verschiedenen Installationsarten, Leitungsbezeichnungen und Verlegearten genauer ansehen.

',1,'');
INSERT INTO "SubchapterContent" VALUES (163,21,'[subheading]Leitungsbezeichnungen und Farben[/subheading]

Bei der elektrischen Installation werden Kabel mit verschiedenen Aderfarben verwendet. 
Diese Farben zeigen die Funktion der Leiter an:

[section]Schutzleiter (PE)[/section]

Der [bold]grün-gelbe[/bold] Draht ist der Schutzleiter, auch PE genannt. 
Er sorgt dafür, dass bei einem Fehler, wie einem Kurzschluss, der Strom sicher in die Erde abgeleitet wird. 
Damit schützt er Menschen vor einem Stromschlag, indem er das Gehäuse von Geräten, die unter Spannung stehen könnten, erdet.

[LF_4_Schutzleiter_small]

[section]Neutralleiter (N)[/section]

Der [bold]blaue[/bold] Draht ist der Neutralleiter. 
Er leitet den Strom vom Verbraucher (zum Beispiel einer Lampe oder einem Gerät) zurück zum Stromnetz. 
Er ist notwendig, um den Stromkreis zu schließen und damit den Stromfluss zu ermöglichen.

[LF_4_Neutralleiter_small]

[section]Außenleiter (L1, L2, L3)[/section]

[bold]Braun, Schwarz und Grau[/bold] sind die Farben der Außenleiter. Diese Leiter führen den Strom vom Stromnetz zu den Verbrauchern. 
In einem normalen Haushalt gibt es in der Regel einen Außenleiter (L1), während in Dreiphasen-Stromsystemen, wie sie für große Geräte oder Maschinen verwendet werden, alle drei Außenleiter (L1, L2 und L3) zum Einsatz kommen.

[LF_4_Außenleiter_small]

Diese Farben helfen, bei Installationsarbeiten die richtige Leitung zu identifizieren.',2,'');
INSERT INTO "SubchapterContent" VALUES (164,21,'[subheading]Verlegearten von Kabeln[/subheading]

Es gibt verschiedene Möglichkeiten, Kabel in einem Gebäude zu verlegen:

[bold]Aufputz[/bold]
Die Kabel werden sichtbar an der Wand verlegt.

[bold]Unterputz[/bold]
Die Kabel verlaufen unsichtbar unter dem Putz.

[bold]In Kabelkanälen[/bold]
Die Kabel werden in speziellen Kanälen verlegt, die auch geöffnet werden können.

[LF_4_Kabelkanal]
',3,'');
INSERT INTO "SubchapterContent" VALUES (165,21,'[subheading]Leitungsberechnung – Kabelquerschnitt[/subheading]

Der Kabelquerschnitt beschreibt die Fläche des Leiters im Inneren eines Kabels und wird in Quadratmillimetern (mm²) gemessen. 

Er gibt an, wie viel Strom sicher durch das Kabel fließen kann. 

[LF_4_Kabelquerschnitt]

Ein größerer Querschnitt bedeutet, dass mehr Strom transportiert werden kann, ohne dass das Kabel überhitzt.

Der Querschnitt muss immer passend zur Stromstärke gewählt werden. 
Je mehr Strom ein Gerät benötigt, desto dicker muss das Kabel sein, damit es nicht überlastet wird.

In Haushalten werden häufig Kabel mit einem Querschnitt von 1,5 mm² bis 2,5 mm² verwendet, z. B. für Steckdosen und Lampen. 

Für größere Verbraucher wie Elektroherde oder Durchlauferhitzer werden Kabel mit einem Querschnitt von 4 mm² oder mehr verwendet, da diese Geräte mehr Strom benötigen.

[frame]Wenn der Kabelquerschnitt zu klein gewählt wird, kann es zu Überhitzung kommen, was zu Kabelbränden führen kann.[/frame]',4,'');
INSERT INTO "SubchapterContent" VALUES (166,21,'[subheading]Elektrische Schutzbereiche im Sanitärräumen[/subheading]

In Badezimmern und Duschen gibt es besondere Vorschriften für die Installation elektrischer Geräte.

Da Feuchtigkeit die Gefahr von elektrischen Schlägen erhöht, sind spezielle Schutzbereiche definiert.

[LF_4_welcome]

Diese Bereiche legen fest, welche Geräte dort installiert werden dürfen.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (167,21,'[section]Schutzbereich 0[/section]

Bereich 0 befindet sich im Inneren der Badewanne oder Dusche. 

Hier dürfen grundsätzlich keine elektrischen Geräte installiert werden, außer Geräte, die speziell für den Einsatz im Wasser entwickelt wurden. 

Diese Geräte müssen wasserdicht und extrem sicher sein, wie etwa spezielle Unterwasserleuchten. 

Sie müssen die Schutzart IPX7 aufweisen.

[LF_4_Zone_0_welcome]',7,'');
INSERT INTO "SubchapterContent" VALUES (168,21,'[section]Bereich 1[/section]

Bereich 1 umfasst den Bereich direkt über der Badewanne oder Dusche und reicht bis zu einer Höhe von 2,25 Metern.
 
Hier dürfen nur fest installierte Geräte verwendet werden, die gegen Spritzwasser geschützt sind.
 
Dazu zählen zum Beispiel Lampen oder Lüfter. 
Diese Geräte müssen die Schutzart IPX4 aufweisen, was bedeutet, dass sie vor Spritzwasser aus allen Richtungen geschützt sind.

[LF_4_Zone_1_welcome]
',8,'');
INSERT INTO "SubchapterContent" VALUES (170,21,'[section]Bereich 2[/section]

Bereich 2 ist der Bereich 60 cm um die Wanne oder Dusche herum und erstreckt sich bis zu einer Höhe von 2,25 Metern. 
In diesem Bereich dürfen Geräte mit der Schutzart IPX3 installiert werden, was bedeutet, dass sie gegen Sprühwasser aus einem Winkel von bis zu 60° geschützt sind. 

In Bereich 2 dürfen auch fest installierte Leuchten oder Schalter eingebaut werden, solange sie den erforderlichen Schutz aufweisen. 

Steckdosen sind in dieser Zone nur erlaubt, wenn sie durch einen Fehlerstromschutzschalter (RCD) abgesichert sind.

[LF_4_Zone_2_welcome]',9,'');
INSERT INTO "SubchapterContent" VALUES (171,21,'[section]Schutzpotenzialausgleich[/section]

Der Schutzpotentialausgleich sorgt dafür, dass elektrische Spannungsunterschiede zwischen verschiedenen leitfähigen Teilen eines Gebäudes, wie z.B. Rohrleitungen oder metallischen Komponenten, ausgeglichen werden. 
Dadurch wird verhindert, dass bei einem Fehler in der elektrischen Anlage gefährliche Spannungen auftreten. 

Man unterscheidet dabei zwischen einem örtlichen Schutzpotentialausgleich (z.B. in Badezimmern) und einem Hauptpotentialausgleich (der alle metallischen Leitungen im Haus miteinander verbindet).

Der [bold]Hauptpotentialausgleich[/bold] wird über eine Hauptleitung durchgeführt und umfasst Rohre wie Frischwasser-, Abwasser-, Gas- und Heizungsleitungen.

Der [bold]örtliche Potentialausgleich[/bold] verbindet z.B. in Badezimmern metallische Teile wie Wasserleitungen und Armaturen mit dem Schutzleiter.

[frame]Durch den Schutzpotentialausgleich wird ein sicherer Betrieb elektrischer Anlagen gewährleistet, indem das Risiko von Stromschlägen deutlich reduziert wird.[/frame]
',11,NULL);
INSERT INTO "SubchapterContent" VALUES (172,22,'[heading]Mess- und Prüftechnik[/heading]

[LF_4_Mess_Prüftechnik_welcome]

Um elektrische Anlagen sicher und funktionstüchtig zu halten, müssen regelmäßig Messungen und Prüfungen durchgeführt werden. 

Diese stellen sicher, dass alle Bauteile und Verbindungen korrekt funktionieren und es keine Defekte gibt, die zu Unfällen führen könnten.',1,'');
INSERT INTO "SubchapterContent" VALUES (173,22,'[subheading]Spannungsmessung[/subheading]

Die Spannungsmessung erfasst die elektrische Spannung in Volt (V) zwischen zwei Punkten eines Stromkreises. 
Sie hilft dabei, die Höhe der Spannung zu überprüfen und festzustellen, ob ein Stromkreis unter Spannung steht. 

[LF_4_Spannungsmessung]

In der Praxis wird diese Messung oft an Steckdosen, Sicherungen oder Kabelverbindungen durchgeführt, um zu kontrollieren, ob eine ausreichende Stromversorgung vorhanden ist und ob die Spannung den erwarteten Werten entspricht.

[frame]Bei der Spannungsmessung muss darauf geachtet werden, das Messgerät auf die richtige Stromart einzustellen, da in Haushalten meist Wechselstrom (AC) verwendet wird, während Gleichstrom (DC) in anderen Anwendungen vorkommt.[/frame]',2,'');
INSERT INTO "SubchapterContent" VALUES (175,22,'[subheading]Strommessung[/subheading]

Die Strommessung erfasst den Stromfluss in [bold]Ampere (A)[/bold] und verhindert Überhitzung oder Schäden durch zu hohen Strom. 

Ein Multimeter wird dafür verwendet und muss korrekt angeschlossen und eingestellt werden. 
Bei der Messung wird das Gerät in Reihe zum Stromkreis geschaltet.
[LF_4_Spannung_zoom]
[bold]Multimeter gibt es in zwei Typen:[/bold]

[bullet]Analoge Multimeter zeigen den Wert auf einer Skala an, sind jedoch anfälliger für Ablesefehler.[/bullet]
[bullet]Digitale Multimeter zeigen den Wert auf einem Display und sind präziser und einfacher zu bedienen.[/bullet]

Auch hier ist es wichtig, das Multimeter auf die richtige Stromart (Gleich- oder Wechselstrom) einzustellen.
',3,'');
INSERT INTO "SubchapterContent" VALUES (177,22,'[subheading]Widerstandsmessung[/subheading]

Die Widerstandsmessung ermittelt den elektrischen Widerstand eines Bauteils in [bold]Ohm (Ω)[/bold]. 
Sie zeigt, wie stark ein Material den Stromfluss hemmt und hilft bei der Fehlersuche.

[section]Durchführung der Widerstandsmessung[/section]

Um den Widerstand mit einem Multimeter zu messen, muss das Bauteil von der Stromquelle getrennt sein. 
Das Multimeter wird auf den Widerstandsmessmodus eingestellt, und die Messleitungen werden an die Enden des Bauteils angeschlossen. 
Der Widerstandswert erscheint auf dem Display.

[bold]Beispiel:[/bold] 
Wird der Widerstand einer Glühbirne gemessen und der Wert ist sehr hoch oder unendlich, ist das Filament wahrscheinlich defekt.
Materialien und ihre Widerstandswerte

[frame]Verschiedene Materialien haben unterschiedliche Widerstandswerte: Metalle wie Kupfer haben einen niedrigen Widerstand, während Isolatoren wie Gummi einen hohen Widerstand aufweisen. Faktoren wie Temperatur können den Widerstand beeinflussen.[/frame]
',4,'');
INSERT INTO "SubchapterContent" VALUES (179,22,'[subheading]Schutzleiterprüfung[/subheading]

Der Schutzleiter (engl. Protective Earth, abgekürzt PE) ist ein sicherheitsrelevanter Bestandteil elektrischer Anlagen, der dafür sorgt, dass gefährliche elektrische Ströme im Fehlerfall sicher zur Erde abgeleitet werden. 

Seine Funktion besteht darin, bei einem Kurzschluss oder Fehlerstrom zu verhindern, dass Metallteile eines Geräts unter Spannung stehen, die beim Berühren zu einem Stromschlag führen könnten.

Der Schutzleiter ist üblicherweise grün-gelb gekennzeichnet und mit dem Erdungssystem verbunden, sodass er einen sicheren Ableitungsweg für den Strom bietet. 

[LF_4_Schutzleiter_small]

Bei der Schutzleiterprüfung wird der Widerstand des Schutzleiters gemessen, um sicherzustellen, dass er niedrig genug ist, um im Fehlerfall eine sichere Erdung zu gewährleisten.

Diese Prüfung ist notwendig, um die elektrische Sicherheit zu überprüfen und das Risiko von Stromunfällen zu verringern.
',5,'');
INSERT INTO "SubchapterContent" VALUES (181,22,'[subheading]Isolationswiderstandsmessung[/subheading]

Die Isolationswiderstandsmessung überprüft die Qualität der Isolierung in elektrischen Anlagen und Bauteilen. 
Sie stellt sicher, dass der elektrische Widerstand zwischen aktiven Leitern und dem geerdeten Schutzleiter hoch genug ist, um Personen und Anlagen vor gefährlichen Fehlerströmen zu schützen.

Dabei wird eine Gleichspannung angelegt, und der Stromfluss durch die Isolierung wird gemessen. 
Ein niedriger Widerstand deutet auf eine beschädigte oder feuchte Isolierung hin, während ein hoher Widerstand eine intakte Isolierung anzeigt. 

Die Messung wird oft vor der Inbetriebnahme elektrischer Anlagen durchgeführt, um die Sicherheit der Anlage zu überprüfen.',6,'');
INSERT INTO "SubchapterContent" VALUES (185,23,'[heading]Arbeitsschutz in der Elektrotechnik[/heading]

[LF_4_Arbeitsschutz_welcome]

Arbeiten an elektrischen Anlagen erfordern besondere Vorsichtsmaßnahmen, um Unfälle zu vermeiden. 

Es gibt spezielle Schutzmaßnahmen, die sicherstellen, dass Elektriker und andere Fachkräfte sicher arbeiten können und Unfälle durch Stromschläge zu vermeiden.',1,'');
INSERT INTO "SubchapterContent" VALUES (186,23,'[subheading]Die 5 Sicherheitsregeln der Elektrotechnik[/subheading]

Bei Arbeiten an elektrischen Anlagen gibt es bestimmte Vorschriften, um Stromunfälle zu vermeiden. 

Diese Sicherheitsmaßnahmen sind international anerkannt und lassen sich in fünf grundlegende Regeln unterteilen:

[bullet]Freischalten[/bullet]
[bullet]Gegen Wiedereinschalten sichern[/bullet]
[bullet]Spannungsfreiheit feststellen[/bullet]
[bullet]Erden und kurzschließen[/bullet]
[bullet]Benachbarte, unter Spannung stehende Teile abdecken oder abschranken[/bullet]


Im Folgenden werden diese Maßnahmen genauer erklärt, um zu zeigen, wie sie sichere Arbeitsbedingungen gewährleisten.

',2,'');
INSERT INTO "SubchapterContent" VALUES (187,23,'[section]1. Freischalten[/section]

Die erste Sicherheitsregel besagt, dass die elektrische Anlage allpolig freigeschaltet werden muss. 

Das bedeutet, dass die gesamte elektrische Anlage vom Stromnetz getrennt wird, damit kein Strom mehr fließen kann. 

[LF_4_Freischalten]

Dies verhindert, dass Personen während der Arbeit einem Stromschlag ausgesetzt sind.',3,'');
INSERT INTO "SubchapterContent" VALUES (188,23,'[section]2. Gegen Wiedereinschalten sichern[/section]

Nach dem Freischalten muss sichergestellt werden, dass die Anlage nicht versehentlich wieder eingeschaltet wird. 

Dazu werden Sperrvorrichtungen wie Vorhängeschlösser zusammen mit Warnschildern an den abgeschalteten Schaltern oder Sicherungen angebracht. 

Dies verhindert, dass die Anlage während der Arbeiten versehentlich unter Strom gesetzt wird.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (189,23,'[section]3. Spannungsfreiheit feststellen[/section]

Um ganz sicher zu sein, dass der Arbeitsort spannungsfrei ist, wird ein Multimeter (misst die Spannung) oder Spannungsprüfer (zeigt nur Spannung an) verwendet. 

[LF_4_Spannungsprüfer_zoom]

Dieser Schritt prüft, ob an den Leitungen oder Bauteilen keine elektrische Spannung mehr vorhanden ist, bevor die Arbeiten beginnen.

[frame]Achte bei der Arbeit darauf, dass du einen kontaktlosen oder zweipoligen Spannungsprüfer verwendest. Der einpolige Spannungsprüfer, auch ''Lügenstift'', ist zu ungenau und kann zudem gefährlich sein.[/frame]',5,'');
INSERT INTO "SubchapterContent" VALUES (190,23,'[section]4. Erden und kurzschließen[/section]

Falls es zu einem unerwarteten Spannungsfall kommen sollte, müssen die abgeschalteten Teile der Anlage geerdet und kurzgeschlossen werden. 

[LF_4_Erden]

Dies stellt sicher, dass keine Spannung mehr entstehen kann, die eine Gefahr darstellen könnte.',6,'');
INSERT INTO "SubchapterContent" VALUES (191,23,'[section]5. Benachbarte, unter Spannung stehende Teile abdecken oder abschranken[/section]

Wenn benachbarte Teile der Anlage nicht spannungsfrei geschaltet werden können, müssen diese abgedeckt oder abgeschrankt werden. 

Dies verhindert, dass Personen versehentlich in Kontakt mit stromführenden Teilen kommen.',7,'');
INSERT INTO "SubchapterContent" VALUES (192,24,'[heading]Trinkwasserrohre[/heading]

[LF_5_Trinkwasserrohre_welcome]

In der Trinkwasserinstallation werden unterschiedliche Rohrmaterialien verwendet. 

Jedes Material hat seine eigenen Vorzüge und spezielle Einsatzgebiete.',1,'');
INSERT INTO "SubchapterContent" VALUES (193,24,'[subheading]Kupferrohre[/subheading]

Kupfer ist ein weiches Metall und lässt sich daher leicht auf Baustellen verarbeiten. 
Es kann in fast allen Trinkwasserinstallationen verwendet werden, außer in Regionen mit sehr saurem Wasser. 
Ein pH-Wert von mindestens 7,4 im Wasser ist erforderlich, um Kupfer sicher einsetzen zu können.

Kupferrohre sind bekannt für ihre lange Lebensdauer von bis zu 100 Jahren. 
Dies liegt vor allem an einer schützenden Oxidschicht, die sich nach kurzer Zeit an den Innenwänden der Rohre bildet. 
[LF_5_Kupferrohr]
Sie sind vollständig recycelbar und behalten ihre Qualität auch nach der Wiederverwendung. 

[bold]Vorteile:[/bold]

[bullet]Leicht zu verarbeiten[/bullet]
[bullet]Sehr langlebig (bis zu 100 Jahre)[/bullet]
[bullet]100% recycelbar[/bullet]
[bullet]Hohe Wärmeleitfähigkeit[/bullet]

[bold]Nachteile:[/bold]

[bullet]Nicht für Gebiete mit saurem Wasser geeignet[/bullet]
[bullet]Höhere Kosten im Vergleich zu anderen Materialien[/bullet]

',2,'');
INSERT INTO "SubchapterContent" VALUES (194,24,'[subheading]Verzinkte Stahlrohre[/subheading]


Verzinkte Stahlrohre gelten heute als veraltet. Zwar bieten sie anfänglich Korrosionsschutz, doch im Laufe der Zeit treten häufig Probleme auf. 
Bei ungeeigneter Wasserqualität, hohem Kalkgehalt oder Temperaturen über 60°C kann sich die Zinkschicht ablösen. 
Dies führt zu Ablagerungen, die den Rohrquerschnitt verengen, was wiederum Druckverlust und verstopfte Perlatoren zur Folge haben kann.

[frame]Perlatoren sind die kleinen Siebeinsätze, die am Ende von Wasserhähnen angebracht sind. Sie vermischen das Wasser mit Luft und sorgen so für einen weicheren Wasserstrahl und reduzieren den Wasserverbrauch. [/frame]

Beim Entleeren und Wiederbefüllen alter Rohrsysteme können Ablagerungen gelöst und Armaturen verstopfen. 
Zudem können die Rohrwände durch Korrosion so dünn werden, dass sie brechen.

[bold]Vorteile:[/bold]

[bullet]Mechanisch stabil[/bullet]

[bold]Nachteile:[/bold]

[bullet]Korrosion bei falscher Wasserqualität oder hohen Temperaturen[/bullet]
[bullet]Rostbildung an Gewindeverbindungen[/bullet]',3,'');
INSERT INTO "SubchapterContent" VALUES (195,24,'[subheading]Edelstahlrohre[/subheading]

Edelstahl eignet sich ideal für Trinkwasserleitungen und den Transport vieler Flüssigkeiten. 
Seine Korrosionsfestigkeit beruht auf einer schützenden Chromoxidschicht, die sich bei Beschädigung selbst erneuert und Edelstahl vor Korrosion schützt.

Allerdings kann hoher Chloridgehalt, etwa in Schwimmbädern oder durch übermäßige Desinfektion, die Beständigkeit beeinträchtigen. 
Daher sollte bei Schwimmbadwasser ein besonderes Augenmerk auf die Eignung der verwendeten Rohre gelegt werden.

[LF_5_Edelstahl]

Edelstahl ist zwar teurer, wird jedoch aufgrund seiner hygienischen Eigenschaften in sensiblen Bereichen wie Krankenhäusern und Laboren bevorzugt eingesetzt.

[bold]Vorteile:[/bold]

[bullet]Hohe Korrosionsbeständigkeit[/bullet]
[bullet]Langlebig und hygienisch[/bullet]

[bold]Nachteile:[/bold]

[bullet]Empfindlich gegenüber hohen Chloridgehalten[/bullet]
[bullet]Hohe Anschaffungskosten[/bullet]',4,'');
INSERT INTO "SubchapterContent" VALUES (196,24,'[subheading]Kunststoffrohre[/subheading]

Kunststoffrohre sind weit verbreitet in Trinkwasserinstallationen aufgrund ihrer Flexibilität und einfachen Handhabung. 
Sie sind leicht, preiswert und lassen sich unkompliziert verlegen. 
Besonders in Kalt- und Warmwasserinstallationen finden sie Anwendung.
[LF_5_Kunststoff]
Kunststoffrohre können verschweißt, verklebt oder verpresst werden.

[bold]Vorteile:[/bold]

[bullet]Leicht und flexibel[/bullet]
[bullet]Einfach und kostengünstig zu verlegen[/bullet]
[bullet]Korrosions- und kalkresistent[/bullet]
[bullet]Gute Wärme- und Schalldämmung[/bullet]

[bold]Nachteile:[/bold]

[bullet]Bei hohen Temperaturen weniger beständig als Metallrohre[/bullet]
[bullet]Anfälliger für Beschädigungen durch mechanische Einflüsse[/bullet]
[bullet]Nicht für alle Anwendungen geeignet(z.B. hohe Temperaturen)[/bullet]
[bullet]Mögliche Diffusionsoffenheit, was zu Sauerstoffeintritt und Korrosion führen kann[/bullet]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (197,24,'[section]Kunststoffarten[/section]

Die Wahl des richtigen Kunststoffrohrs hängt von der Anwendung ab. 

Hier eine Übersicht der gängigsten Kunststoffarten:

[bold]PE (Polyethylen)[/bold]
[bullet]Flexibel, korrosionsbeständig, schlagfest, hohe UV-beständig[/bullet]
[LF_5_UV_small]
[bold]PE-X (vernetztes Polyethylen)[/bold]
[bullet]Druck- und temperaturstabil, langlebig, korrosionsfrei[/bullet]

[bold]PVC (Polyvinylchlorid)[/bold]
[bullet]Langlebig, korrosionsbeständig, kostengünstig[/bullet]

[bold]PVC-C (Chloriertes Polyvinylchlorid)[/bold]
[bullet]Temperatur- und druckbeständig bis 70°C, klebbar[/bullet]
[LF_5_PVC_C_small]
[bold]PVC-U (Weichmacherfreies Polyvinylchlorid)[/bold]
[bullet]Nur für Kaltwasserinstallationen geeignet[/bullet]

[bold]PB (Polybuthylen)[/bold]
[bullet]Flexibel, temperatur- und mechanisch beständig[/bullet]',6,NULL);
INSERT INTO "SubchapterContent" VALUES (198,25,'[heading]Unser Trinkwasser[/heading]

[LF_5_Trinkwasser_welcome]

Trinkwasser ist für unser tägliches Leben unverzichtbar.

Von der Gewinnung bis zur Nutzung durchläuft es zahlreiche Schritte, um stets den erforderlichen Qualitätsstandards zu entsprechen.',1,'');
INSERT INTO "SubchapterContent" VALUES (199,25,'[subheading]Herkunft unseres Trinkwassers[/subheading]

Unser Trinkwasser kommt überwiegend aus Grundwasser, Quellwasser und Oberflächenwasser wie Flüssen und Seen.
 
Dieses Wasser wird in Wasserwerken gereinigt und aufbereitet, bevor es zu den Haushalten gelangt. 
[LF_5_Wasserkreislauf]
Der natürliche Wasserkreislauf sorgt für die ständige Erneuerung des Wassers, indem Grundwasserquellen durch Regen wieder aufgefüllt werden.',2,'');
INSERT INTO "SubchapterContent" VALUES (200,25,'[subheading]Zusammensetzung und Eigenschaften[/subheading]

Wasser besteht aus zwei Wasserstoffatomen und einem Sauerstoffatom (H₂O). 
Es ist ein farb- und geruchloses, flüssiges Molekül mit besonderen Eigenschaften. 

[frame]Eine besondere Eigenschaft von Wasser ist seine Dichteanomalie: Es erreicht seine höchste Dichte bei 4°C und dehnt sich beim weiteren Abkühlen aus. Dadurch schwimmt Eis auf Wasser, was verhindert, dass Gewässer komplett durchfrieren – eine lebenswichtige Voraussetzung für viele Lebewesen.[/frame]
Wasser hat eine hohe Wärmekapazität, löst viele Stoffe und bildet aufgrund seiner Oberflächenspannung Tropfen. 
Es kommt in flüssiger, fester (Eis) und gasförmiger (Dampf) Form vor. 

Trinkwasser enthält gelöste Mineralien wie Kalzium, Magnesium oder Natrium, die den Geschmack beeinflussen und wichtige Nährstoffe für den menschlichen Körper liefern.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (201,25,'[subheading]pH-Wert im Trinkwasser[/subheading]

Der pH-Wert des Wassers gibt an, ob es sauer, neutral oder basisch ist. 
Ein idealer pH-Wert für Trinkwasser liegt zwischen 6,5 und 9,5. 
[LF_5_PH_zoom]
Ein zu niedriger pH-Wert (sauer) kann Korrosion in Rohrleitungen verursachen, während ein zu hoher pH-Wert (basisch) Kalkablagerungen fördern kann.

[frame]Der pH-Wert steht für „potentia Hydrogenii“, also die „Potenz des Wasserstoffs“. Er gibt an, wie konzentriert die Wasserstoffionen (H⁺) in einer Lösung sind.[/frame]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (202,25,'[subheading]Gase im Trinkwasser[/subheading]

Im Trinkwasser sind verschiedene Gase gelöst, die sowohl die Wasserqualität als auch den Geschmack beeinflussen:

[bold]Sauerstoff (O₂)[/bold]
Trinkwasser sollte einen Mindestgehalt von 6 mg Sauerstoff pro Liter haben. 
Dieser Sauerstoff hilft, eine Schutzschicht auf Metallleitungen zu bilden, um Korrosion zu verhindern, und trägt auch zur Frische des Wassers bei.

[bold]Kohlendioxid (CO₂)[/bold]
Kohlendioxid verbindet sich im Wasser mit H₂O zu Kohlensäure (H₂CO₃). 
Diese Säure beeinflusst den pH-Wert und hilft, Kalk zu lösen. 
[LF_5_H2O_small]
Wird das Wasser erhitzt, braucht es mehr Kohlensäure, um Kalk zu lösen. 
Wenn das Wasser wieder abkühlt, bleibt überschüssiges Kohlendioxid zurück, was das Wasser aggressiver machen kann und Korrosion an den Leitungen fördern könnte.
In diesem Zusammenhang spricht man auch vom [bold]Kalk-Kohlensäure-Gleichgewicht[/bold].

[bold]Stickstoff (N₂)[/bold]
Stickstoff im Wasser hat hauptsächlich die Aufgabe, das natürliche Gasgleichgewicht zu unterstützen. Es ist zwar nicht aktiv an chemischen Prozessen beteiligt, spielt aber eine wichtige Rolle dabei, den Druck der gelösten Gase im Wasser zu stabilisieren. 
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (203,25,'[subheading]Wasserhärte und Kalkablagerungen[/subheading]

Die Wasserhärte wird durch den Gehalt an Kalzium- und Magnesiumionen im Wasser bestimmt. 

[bold]Hartes Wasser[/bold] enthält hohe Mengen dieser Mineralien und kann zu Kalkablagerungen in Rohren und Geräten führen. 
[LF_5_Kalk_zoom]
[bold]Weiches Wasser[/bold] enthält weniger dieser Mineralien und ist daher weniger anfällig für Kalkbildung.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (204,25,'[subheading]Trinkwasserverordnung[/subheading]

Die Trinkwasserverordnung wurde erstmals 2001 erlassen und legt fest, welche Anforderungen an die Qualität von Trinkwasser in Deutschland gestellt werden, um die Gesundheit der Bevölkerung zu schützen. 

Sie regelt die Grenzwerte für Schadstoffe und mikrobiologische Verunreinigungen und bestimmt, wie das Wasser regelmäßig kontrolliert und aufbereitet werden muss. 
[LF_5_Trinkwasser]
Ziel der Verordnung ist es, sicherzustellen, dass das Trinkwasser für den menschlichen Gebrauch unbedenklich ist und den hohen Standards entspricht, die für die öffentliche Gesundheit erforderlich sind.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (205,25,'[subheading]Charakteristik von Trinkwasser[/subheading]

Die Anforderungen an Trinkwasser werden in Deutschland durch die DIN 2000 geregelt. 
Diese Norm legt die Anforderungen an die Versorgung mit Trinkwasser fest, um die Gesundheit und Hygiene zu gewährleisten. 

Es muss:

[bullet]an der Übergabestelle in genügender Menge und mit ausreichendem Druck zur Verfügung stehen.[/bullet]
[bullet]frei von Krankheitserregern sein und darf keine gesundheitsschädlichen Eigenschaften haben.[/bullet]
[bullet]farblos, klar, kühl, geruchlos, keimarm, appetitlich sein und zum Genuss anregen.[/bullet]

',8,NULL);
INSERT INTO "SubchapterContent" VALUES (206,26,'[heading]Korrosion in Trinkwasseranlagen[/heading]
[LF_5_Korrosion_welcome]
Korrosion, ist der allmähliche Zerfall von Metallen durch chemische Reaktionen mit ihrer Umgebung, z.B. Sauerstoff. 

Besonders in Trinkwassersystemen ist Korrosion problematisch, da sie nicht nur die Leitungen schädigt, sondern auch die Trinkwasserqualität beeinträchtigt. 
Sauerstoff, Kohlendioxid und gelöste Salze im Wasser fördern den Korrosionsprozess, was langfristig zu ernsthaften Schäden führen kann.',1,'');
INSERT INTO "SubchapterContent" VALUES (207,26,'[subheading]Was ist Korrosion?[/subheading]

Korrosion ist der allmähliche Zerfall von Metallen durch chemische Reaktionen mit ihrer Umgebung. 
Besonders in Trinkwassersystemen ist Korrosion problematisch, da sie nicht nur die Leitungen schädigt, sondern auch die Trinkwasserqualität beeinträchtigt. 
[LF_5_Rost_Rohr_zoom]
Sauerstoff, Kohlendioxid und gelöste Salze im Wasser fördern den Korrosionsprozess, was langfristig zu ernsthaften Schäden führen kann.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (208,26,'[subheading]Materialschäden und Wasserverschmutzung[/subheading]

[bold]Materialschäden[/bold] 
Korrosion schwächt das Metall, wodurch Rohrleitungen durchrosten, brechen oder Risse bekommen können.

[LF_5_Materialschaden_small]

[bold]Wasserverschmutzung[/bold] 
Korrodierte Rohre setzen Metalle wie Eisen oder Zink frei, die das Trinkwasser verunreinigen und seine Qualität verschlechtern können.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (209,26,'[subheading]Druckverlust und Wartungskosten[/subheading]

[bold]Druckverlust und Lecks[/bold] 
Durch Korrosion entstehende Lecks führen zu Druckverlust im Leitungssystem, was die Effizienz der Wasserversorgung mindert.
[LF_5_Druckverlust]
[bold]Hohe Instandhaltungskosten[/bold] 
Regelmäßige Reparaturen oder der Austausch von korrodierten Rohrleitungen sind teuer und aufwändig.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (210,26,'[subheading]Korrosionsarten in Trinkwassersystemen[/subheading]

Korrosion tritt in verschiedenen Formen auf, abhängig von den äußeren Bedingungen und den verwendeten Materialien. 

In Trinkwassersystemen sind besonders die folgenden Korrosionsarten relevant:

[bold]Flächenkorrosion[/bold]
Ein gleichmäßiger Abtrag des Metalls über die gesamte Oberfläche. 
Diese Art tritt auf, wenn die gesamte Fläche des Rohrs kontinuierlich durch Sauerstoff und Wasser angegriffen wird.
[LF_5_Korrosionsarten_zoom]
[bold]Lochkorrosion[/bold] 
Hierbei entstehen kleine Löcher oder Vertiefungen im Metall. 
Sie ist besonders gefährlich, da sie unvorhersehbare Lecks verursachen kann. 
Lochkorrosion tritt oft in Bereichen auf, die nicht regelmäßig gewartet oder überprüft werden.

[bold]Kontaktkorrosion[/bold]
Diese Art der Korrosion entsteht, wenn zwei verschiedene Metalle, die sich berühren, in feuchter Umgebung wie Wasser oder Luft sind. Das weniger beständige Metall (also das „schwächere“) beginnt schneller zu rosten oder zu korrodieren, während das andere Metall geschützt bleibt. 
Das passiert, weil zwischen den Metallen ein kleiner elektrischer Unterschied besteht, der den Korrosionsprozess beschleunigt.
[LF_5_Korrosionsarten_2_zoom]
[bold]Spannungskorrosion[/bold] 
Tritt auf, wenn mechanische Belastungen und chemische Einflüsse gleichzeitig wirken. 
Dies führt zu einer schnellen Materialschwächung und erhöht das Risiko von Brüchen oder Rissen.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (213,26,'[subheading]Vermeidung von Korrosion[/subheading]

Korrosion in Trinkwassersystemen lässt sich durch verschiedene Maßnahmen wirksam vermeiden. 
[LF_5_Korrosion_vermeiden]
Die Auswahl des passenden Materials, eine regelmäßige Wartung sowie die fachgerechte Verarbeitung tragen dazu bei, die Lebensdauer der Leitungen zu verlängern und Korrosionsschäden zu verhindern.',8,'');
INSERT INTO "SubchapterContent" VALUES (214,26,'[section]Materialwahl[/section]

Der Einsatz von korrosionsbeständigen Materialien wie Edelstahl oder Kunststoff ist eine der besten Methoden, um Korrosion von vornherein zu vermeiden. 
Diese Materialien rosten nicht und sind widerstandsfähig gegen aggressive Chemikalien im Wasser.

[section]Korrosionsschutzbeschichtungen und -ummantelungen[/section]

Rohre können mit speziellen Beschichtungen überzogen werden, die das Metall vor Feuchtigkeit, Sauerstoff und anderen aggressiven Substanzen schützen. 
Zusätzlich bieten Ummantelungen aus Kunststoff oder anderen schützenden Materialien einen weiteren Schutz gegen mechanische Einwirkungen und verhindern den Kontakt der Rohre mit korrosiven Elementen. 
Diese Ummantelungen sind besonders in feuchten oder aggressiven Umgebungen nützlich, da sie die Haltbarkeit der Leitungen erhöhen und Korrosion weiter reduzieren.

[section]Tauwasserschutz[/section]

Eine Dämmung als Tauwasserschutz sorgt dafür, dass kalte Rohre, wie Kaltwasserleitungen, vor der Bildung von Kondenswasser geschützt werden. 
Die Dämmmaterialien isolieren das Rohr thermisch von der Umgebungsluft, wodurch die Entstehung von Tauwasser auf der Rohroberfläche verhindert wird.
[LF_5_Tauwasser_zoom]
Dies beugt Korrosionsschäden und Feuchtigkeitsschäden im Gebäude vor.
',9,NULL);
INSERT INTO "SubchapterContent" VALUES (215,26,'[section]Kathodischer Korrosionsschutz[/section]

Durch den Einsatz von Opferanoden wird der Korrosionsprozess auf das Opfermaterial gelenkt, anstatt das Rohr selbst anzugreifen. 
Diese Methode wird oft bei Trinkwassererwärmern und unterirdischen Leitungen verwendet.

[frame]Opferanoden sind Metallstücke (meist aus Zink, Magnesium oder Aluminium), die absichtlich in Kontakt mit Rohren gebracht werden, um Korrosion zu verhindern. Sie korrodieren anstelle des Rohres, sodass das Rohrmaterial geschützt bleibt. Die Anode muss nach einer gewissen Zeit ersetzt werden, da sie sich mit der Zeit auflöst.[/frame]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (216,26,'[section]Chemische Wasserbehandlung[/section]

Die Zugabe von bestimmten Chemikalien wie Inhibitoren oder pH-Regulatoren kann das Korrosionsrisiko verringern, indem sie den pH-Wert des Wassers stabilisieren oder schädliche Ionen neutralisieren.

[section]Regelmäßige Wartung[/section]

Eine regelmäßige Inspektion und Wartung der Leitungen sowie die frühzeitige Erkennung von Korrosionsschäden helfen, kostspielige Reparaturen zu vermeiden. 
Durch rechtzeitiges Eingreifen lassen sich größere Schäden verhindern.',11,NULL);
INSERT INTO "SubchapterContent" VALUES (217,27,'[heading]Aufbereitung von Trinkwasser[/heading]

[LF_5_Aufbereitung_welcome]

Trinkwasser muss oft behandelt werden, um Verunreinigungen zu entfernen und seine Qualität zu verbessern. 
Im Folgenden sehen wir uns die verschiedenen Arten der Trinkwasseraufbereitung an.',1,'');
INSERT INTO "SubchapterContent" VALUES (218,27,'[subheading]Mechanische Aufbereitung[/subheading]

Mechanische Aufbereitung nutzt Filter, um Schwebstoffe wie Sand, Rost oder kleine Partikel aus dem Trinkwasser zu entfernen. 

Diese Filter können in der Hauptwasserleitung, direkt vor einem Gerät oder am Auslauf einer Zapfstelle, wie zum Beispiel als Sieb am Wasserhahn, eingebaut werden.
[LF_5_Wasserfilter_zoom]
Bei Neuinstallationen werden bevorzugt rückspülbare Wasserfilter verwendet.

Ein rückspülbarer Wasserfilter kann gereinigt werden, indem der Wasserfluss umgekehrt wird, wodurch die eingeschlossenen Partikel ausgespült werden. 

Im Gegensatz dazu wird bei einem Kerzenfilter das Filterelement ausgetauscht, da es nicht rückspülbar ist.',2,'');
INSERT INTO "SubchapterContent" VALUES (219,27,'[subheading]Physikalische Aufbereitung [/subheading]

Kalk kann sich in Wasserleitungen absetzen und diese verstopfen. 

Kalkschutzgeräte verhindern, dass sich Kalk an den Rohrwänden festsetzt. 
[LF_5_Kalkschutzgerät_zoom]
Sie arbeiten mit Magnetfeldern, die durch Permanentmagneten oder elektrischem Strom erzeugt werden und machen den Kalk weniger haftbar.',3,'');
INSERT INTO "SubchapterContent" VALUES (220,27,'[subheading]Chemische Aufbereitung [/subheading]

Die chemische Aufbereitung von Trinkwasser umfasst verschiedene Verfahren, um Verunreinigungen zu beseitigen und die Wasserqualität zu verbessern. 

[bold]Chlorierung[/bold]
Chlor wird eingesetzt, um Bakterien, Viren und andere Krankheitserreger im Wasser abzutöten. 
Es ist eine weit verbreitete Methode zur Desinfektion, die sicherstellt, dass das Wasser frei von schädlichen Mikroorganismen bleibt.

[bold]Ozonierung[/bold]
Ozon ist ein starkes Desinfektionsmittel, das ebenfalls Mikroorganismen im Wasser abtötet. 
Im Gegensatz zu Chlor hinterlässt Ozon keine chemischen Rückstände im Wasser, was es zu einer beliebten Alternative macht.
[LF_5_O3_small]
[bold]Flockung[/bold]
Bei diesem Verfahren werden Chemikalien wie Aluminiumsulfat hinzugefügt, die kleine Partikel im Wasser binden, damit sie sich zu größeren Flocken verbinden. 
Diese Flocken können dann leichter herausgefiltert werden, was das Wasser klarer und sauberer macht.

[bold]Aktivkohlefiltration[/bold]
Hierbei wird Wasser durch Aktivkohle geleitet, die Schadstoffe wie Pestizide und andere organische Verbindungen herausfiltert. 
Diese Methode hilft auch, unangenehme Gerüche und Geschmacksstoffe zu entfernen.
[LF_5_Aktivkohle_zoom]
[frame]Aktivkohle wird auch beim Menschen in Tablettenform verwendet, um bei Vergiftungen zu helfen, indem sie Giftstoffe ähnlich wie im Wasser bindet.[/frame]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (221,27,'[section]Kalk und Kohlensäure im Trinkwasser[/section]

Regenwasser nimmt Kohlensäure (CO₂) aus der Luft auf, die im Boden Kalk löst und Calciumhydrogencarbonat bildet. 
Bei Erwärmung zerfällt dies zu Kalk, der sich in Rohren und Geräten ablagern kann. 
Das führt zu verengten Rohren.
[LF_5_Ionenaustausch_zoom]
Um Kalkbildung zu vermeiden, wird Wasser häufig durch Ionenaustausch enthärtet. 
Dabei werden Calcium- und Magnesiumionen durch Natrium ersetzt. 
Kalk ist zwar gesundheitlich unbedenklich, kann jedoch Geräte und Rohre schädigen.

[frame]Ionen sind elektrisch geladene Teilchen. Sie entstehen, wenn Atome oder Moleküle Elektronen abgeben oder aufnehmen. In der Wasseraufbereitung helfen sie, gelöste Stoffe wie Kalk zu entfernen.[/frame]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (223,27,'[section]Entsalzung des Trinkwassers[/section]

Die Entsalzung von Trinkwasser ist ein Verfahren, bei dem unerwünschte Salze entfernt werden, um die Wasserqualität zu verbessern. 
Dies ist vor allem in Regionen mit salzhaltigem Grund- oder Meerwasser relevant.

Es gibt verschiedene Methoden zur Entsalzung:

[bold]Umkehrosmose[/bold]
Dabei wird das Wasser unter Druck durch eine Filtermembran gepresst, die Salze und andere Verunreinigungen zurückhält. 
Diese Methode ist besonders in Haushalten und industriellen Anwendungen verbreitet.
[LF_5_Osmose_zoom]
[bold]Thermische Entsalzung[/bold]
Hier wird das Wasser erhitzt und der Wasserdampf kondensiert, wodurch die Salze im Restwasser zurückbleiben. 
Diese Methode wird oft in großen Meerwasserentsalzungsanlagen verwendet.

[bold]Entsalzungspatronen[/bold]
Entsalzungspatronen werden in kleinen Geräten wie Laboren oder Trinkwasserspendern eingesetzt. 
Sie basieren auf Umkehrosmose oder speziellen Filtern zur Reduzierung des Salzgehalts. 
Die Patronen müssen regelmäßig ausgetauscht werden, um eine gleichbleibende Wasserqualität sicherzustellen.

[frame]Eine Filtermembran ist ein dünner Filter mit winzigen Poren, der nur bestimmte Stoffe wie Wasser durchlässt und Verunreinigungen zurückhält. Sie wird in der Entsalzung verwendet, um Salze und andere Partikel aus dem Wasser zu filtern.[/frame]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (224,28,'[heading]Druckminderer und Wasserzähler[/heading]

[LF_5_Druckminderer_welcome]

Beide Geräte sind Teil der Trinkwasserinstallation, da sie den Druck regeln und den Wasserverbrauch messen.

Eine regelmäßige Wartung sichert ihre einwandfreie Funktion.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (225,28,'[subheading]Was ist ein Druckminderer?[/subheading]

Ein Druckminderer sorgt dafür, dass der [bold]Wasserdruck im Leitungssystem konstant bleibt[/bold], auch wenn der Druck im Versorgungsnetz schwankt. 
Dadurch werden Schäden an Geräten und laute Geräusche vermieden, die durch zu hohen Druck entstehen könnten. 
Ab einem Versorgungsdruck von 5 bar sollte ein Druckminderer installiert werden.

Der Druckminderer passt den Druck automatisch an, indem er das Ventil je nach Bedarf öffnet oder schließt. 
Er wird häufig in Hausinstallationen eingesetzt, um den Wasserdruck in der gesamten Anlage zu regulieren. 

[frame]Ein Druckminderer hilft nicht nur, den Druck zu regulieren, sondern reduziert auch störende Strömungsgeräusche in Wasserleitungen.[/frame]',2,NULL);
INSERT INTO "SubchapterContent" VALUES (226,28,'[section]Aufbau und Funktion eines Druckminderers[/section]

Ein Druckminderer stellt sicher, dass der Druck nach dem Ventil, der sogenannte [bold]Hinterdruck[/bold], einen festgelegten Wert nicht überschreitet, selbst wenn der Vordruck schwankt. 
Dies wird durch eine Feder und eine  Membran ermöglicht, die auf den Hinterdruck reagieren und ein Ventil entsprechend öffnet oder schließt. 

Wenn der Hinterdruck zu stark ansteigt, schließt die Membran das Ventil, wodurch weniger Wasser durchströmen kann, und der Druck wird reduziert.

Sollte der Hinterdruck hingegen zu stark absinken, öffnet die Feder  das Ventil weiter, sodass mehr Wasser hindurchfließen kann und der Druck wieder steigt.
[LF_5_Druckminderer_zoom]
Über einen Drehknopf kann der Druck der  Feder und somit  der gewünschte Hinterdruck eingestellt werden, sodass der Druckminderer flexibel an unterschiedliche Anforderungen angepasst werden kann. 
[LF_5_Druckminderer_2_zoom]
Auf diese Weise sorgt der Druckminderer stets für einen stabilen und sicheren Druck im nachgeschalteten System.
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (227,28,'[subheading]Wasserzähleranlage[/subheading]

Eine Wasserzähleranlage misst den Wasserverbrauch in Haushalten und Gebäuden und besteht aus einem Wasserzähler sowie weiteren Armaturen wie Absperrventilen und einem Rückflussverhinderer. 

Der Wasserzähler zeigt an, wie viel Wasser durch die Leitung geflossen ist, und ermöglicht so die genaue Abrechnung. 
Meist wird der Zähler vom Wasserversorger eingebaut und regelmäßig geeicht. 
Zum Schutz vor Verunreinigungen ist es oft sinnvoll, einen Feinfilter einzubauen. 

[frame]Die AVBWasserV regelt die Bedingungen zwischen Wasserversorgern und Kunden. Sie bestimmt, dass der Wasserversorger den Wasserzähler installiert und regelmäßig prüft, um eine genaue Abrechnung zu gewährleisten.[/frame]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (228,28,'[section]Aufbau einer Wasserzähleranlage[/section]

Die Wasserzähleranlage besteht aus mehreren Komponenten, die zusammenarbeiten, um die Wassermessung und die Sicherheit der Trinkwasserversorgung zu gewährleisten:

[bold]Absperrarmaturen[/bold]
Diese ermöglichen es, den Wasserfluss bei Bedarf zu unterbrechen, beispielsweise für Wartungsarbeiten oder Reparaturen. 
Die erste Asperrarmatur im Haus wird auch HAE (Hauptabsperreinrichtung) genannt.

[bold]Wasserzähler[/bold]
Er misst präzise die durchfließende Wassermenge und zeigt den Verbrauch in Kubikmetern an, damit der Wasserbedarf des Kunden genau ermittelt werden kann.

[bold]Rückflussverhinderer[/bold]
Dieser verhindert, dass bereits verbrauchtes Wasser aus der Hausinstallation zurück in das öffentliche Netz gelangt, um eine Verunreinigung des Trinkwassers zu vermeiden. Der in der Wasserzähleranlage verbaute Rückflussverhinderer muss eine Prüföffnung haben.

[bold]Montagebügel[/bold] mit Anschluss für den Potenzialausgleich und Längenausgleich
[LF_5_Wasserzählanlage_zoom]
1. HAE (Hauptabsperreinrichtung)
2. Montagebügel mit Anschluss für den Potentialausgleich
3. Wasserzähler
4. Längenausgleichsstück
5. KFR Ventil (Kombiniertes Freistromventil mit Rückflussverhinderer)
6. Entleerung zum Prüfen des Rückflussverhinderers
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (229,28,'[bold]Eichen der Wasserzähler[/bold]

Das Eichen eines Wasserzählers ist der Prozess, bei dem der Zähler auf seine Messgenauigkeit überprüft wird. 
Dabei wird kontrolliert, ob der Wasserzähler den tatsächlichen Wasserverbrauch korrekt erfasst.
[LF_5_Wasserzähler_zoom]
Dies machen spezielle Firmen, die dafür ausgerüstet sind. 

Die Eichung stellt sicher, dass der Zähler innerhalb der gesetzlich festgelegten Toleranzen arbeitet. 
Nach dem Eichen wird der Zähler mit einer Eichmarke versehen, die bestätigt, dass er ordnungsgemäß funktioniert und genaue Messungen liefert. 

Diese Eichung muss regelmäßig erneuert werden, um sicherzustellen, dass der Zähler weiterhin präzise arbeitet.
',6,'');
INSERT INTO "SubchapterContent" VALUES (230,29,'[heading]Schutz des Trinkwassers[/heading]

[LF_5_Schutz_welcome]

Trinkwasser muss sauber und frei von Verunreinigungen bleiben. 

Um das zu gewährleisten, werden bei der Installation verschiedene Schutzmaßnahmen angewendet. ',1,NULL);
INSERT INTO "SubchapterContent" VALUES (231,29,'[subheading]Sauberkeit bei der Installation[/subheading]

Bei der Installation von Trinkwasserleitungen ist auf Sauberkeit zu achten, um die Wasserqualität zu erhalten. 
Schmutz und Staub von der Baustelle können ins System gelangen und die Hygiene beeinträchtigen. 

Daher sollten Rohre und Fittings nach der Verlegung gründlich gespült werden, um Rückstände zu entfernen.

Auch das sachgemäße Lagern von Rohren und Fittings ist erforderlich. 
[LF_5_Aufbewahrungsbox_zoom]
Diese Bauteile sollten während der Bauphase verschlossen oder in sauberen, geschützten Bereichen aufbewahrt werden, um Schmutz und Beschädigungen zu vermeiden. 
So wird verhindert, dass Verunreinigungen ins Trinkwassersystem gelangen.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (232,29,'[subheading]Sicherungssysteme[/subheading]
  
Um Rücksaugen und Rückfließen zu verhindern, werden Sicherungsarmaturen verwendet, die als Einzelsicherungen oder Sammelsicherungen eingesetzt werden. 
Rücksaugen oder Rückfließen tritt auf, wenn ein Druckabfall dazu führt, dass verunreinigtes Wasser in das Trinkwassersystem zurückfließen kann.

[bold]Einzelsicherung[/bold]  
Bei einer Einzelsicherung wird jede einzelne Entnahmestelle oder jedes Gerät durch eine separate Sicherungsarmatur geschützt. Zum Beispiel wird ein Rohrunterbrecher direkt an eine Waschmaschine angeschlossen, um zu verhindern, dass verunreinigtes Wasser in die Trinkwasserleitung zurückfließt.

[bold]Sammelsicherung[/bold]
Eine Sammelsicherung schützt mehrere Entnahmestellen gleichzeitig. Ein Beispiel ist der [bold]Systemtrenner BA[/bold], der eine zentrale Sicherungsarmatur darstellt und mehrere Geräte oder Anschlüsse auf einmal absichert. Diese Art von Armatur kommt häufig bei Bewässerungsanlagen oder in industriellen Anwendungen zum Einsatz.

[frame]Heute ist die Einzelsicherung Standard, da sie jede Entnahmestelle individuell schützt. Dadurch werden Verunreinigungen gezielt verhindert, bevor sie ins Trinkwassersystem gelangen können.[/frame]
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (233,29,'[section]Rückflussverhinderer – Funktionsweise[/section]

Ein Rückflussverhinderer (RV) schützt das Trinkwassersystem, indem er den Wasserfluss in nur eine Richtung zulässt. 
[LF_5_Rückflussverhinderer_zoom]
Wenn der Wasserdruck im System fällt, sorgt eine Feder dafür, dass das Ventil automatisch schließt und verhindert, dass verunreinigtes Wasser in die Trinkwasserleitung zurückfließt. Es gibt sowohl prüfbare als auch nicht prüfbare Rückflussverhinderer. Bei den prüfbaren Rückflussverhinderern ist eine Prüfschraube vorhanden, die es ermöglicht, die Funktion des Ventils zu testen und sicherzustellen, dass der Rückflussverhinderer korrekt arbeitet.
[LF_5_Rückflussverhinderer_Schnitt_zoom]
Es gibt Prüfbare Rückflussverhinderer mit Prüfschraube (Bild) und nicht Prüfbare Rückflussverhinderer.

[frame]Rückflussverhinderer können ein einzelnes Bauteil oder in einer anderen Armatur integriert sein. Ein Beispiel hierfür ist das KFR Ventil (Kombiniertes Freistromventil mit Rückflussverhinderer).[/frame]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (234,29,'[section]Rohrunterbrecher[/section]

Rohrunterbrecher verhindern das Rückfließen von verunreinigtem Wasser in Trinkwasserleitungen, indem sie einen freien Luftraum schaffen. 
Dieser Luftraum sorgt dafür, dass bei einem Druckabfall kein Wasser zurückfließen kann. 
[LF_5_Rohrunterbrecher_zoom]
Sie kommen in Installationen wie Waschmaschinen oder Bewässerungsanlagen zum Einsatz, um die Wasserqualität zu schützen. 
Wenn der Druck sinkt, bleibt der Luftraum bestehen und verhindert den Rückfluss. 

Es gibt Rohrunterbrecher mit und ohne beweglichen Bauteilen.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (235,29,'[section]Systemtrenner Typ BA[/section]

Ein Systemtrenner vom Typ BA ist ein spezielles Bauteil, das in Trinkwasserinstallationen verwendet wird, um Rückflüsse zuverlässig zu verhindern. 
Er verfügt über drei Zonen, die durch zwei Rückflussverhinderer und eine Entlastungseinrichtung getrennt sind.
[LF_5_Systemtrenner_zoom]
Wenn der Druck im System fällt,oder die Druckdifferenz zwischen Eingangs- und Ausgangskammer 140 mbar übersteigt, öffnet die Entlastungseinrichtung und leitet Wasser aus der mittleren Zone ab, sodass kein verunreinigtes Wasser in die Trinkwasserleitung gelangen kann.
[LF_5_Systemtrenner_2_zoom]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (236,29,'[subheading]Schutz gegen ungewollte Erwärmung[/subheading]

Trinkwasserleitungen sollten so verlegt werden, dass sie nicht ungewollt erwärmt werden. 
Die Nähe zu Wärmequellen wie Heizleitungen oder Warmwasserleitungen kann die Wasserqualität beeinträchtigen. 
[LF_5_keime_small]
Eine korrekte Leitungsführung verhindert Temperaturanstiege, die das Wachstum von Keimen fördern könnten.',11,NULL);
INSERT INTO "SubchapterContent" VALUES (237,29,'[subheading]Spülen von Trinkwasserleitungen[/subheading]

Nach der Installation müssen die Leitungen gründlich gespült werden. 
Dies verhindert, dass sich Schmutz und Fremdstoffe im Trinkwasser ansammeln.

[bold]Ziel:[/bold]

[bullet]Die Rohrinnenflächen zu reinigen[/bullet]
[bullet]Die Trinkwasserqualität sicherzustellen[/bullet]
[bullet]Korrosionsschäden zu verhindern[/bullet]
[bullet]Funktionsstörungen an Armaturen und Geräten zu vermeiden[/bullet]

[frame]Auch nach längeren Stillstandszeiten ist das Spülen notwendig, um sauberes und sicheres Wasser zu gewährleisten.[/frame]',12,NULL);
INSERT INTO "SubchapterContent" VALUES (238,30,'[heading]Prüfen und Inbetriebnahme[/heading]

[LF_5_Prüfen_welcome]

Vor der Inbetriebnahme einer Trinkwasseranlage müssen verschiedene Prüfungen durchgeführt werden. 
Dies stellt sicher, dass das System dicht und funktionstüchtig ist.',1,'');
INSERT INTO "SubchapterContent" VALUES (239,30,'[subheading]Dichtheitsprüfung bei metallischen Leitungen[/subheading]

Die Dichtheitsprüfung für metallische Rohrleitungen, wie Stahl- und Kupferrohre, erfolgt unter einem Prüfdruck von 15 bar. 
Dieser Druck wird für mindestens 10 Minuten gehalten. 
Falls die Temperaturunterschiede zwischen Prüfwasser und Umgebung größer als 10 °K sind, muss die Wartezeit auf 30 Minuten erhöht werden. 
Es darf kein Druckabfall auftreten, da dies auf Undichtigkeiten hinweisen würde.',2,'');
INSERT INTO "SubchapterContent" VALUES (240,30,'[subheading]Spülen der Leitungen[/subheading]

Vor der Inbetriebnahme müssen alle Leitungen gründlich gespült werden. 
Dies verhindert, dass Fremdstoffe und Ablagerungen im Wasser zurückbleiben. 
Die Spülung muss mit einer Mindestgeschwindigkeit von 2 m/s erfolgen, und alle Entnahmestellen sollten geöffnet werden, um den Durchfluss zu maximieren. 
Die Leitungen sollten in Abschnittslängen von nicht mehr als 100 m gespült werden.',3,'');
INSERT INTO "SubchapterContent" VALUES (241,30,'[section]Wichtige Punkte beim Spülen der Leitungen[/section]

Beim Spülen der Trinkwasserleitungen sind mehrere Punkte zu beachten:

[bullet]Die Leitungslänge pro Spülabschnitt darf 100 m nicht überschreiten.[/bullet]
[bullet]Es muss von unten nach oben und von den nächstgelegenen zu den entfernteren Entnahmestellen gespült werden.[/bullet]
[bullet]Jede Entnahmestelle sollte für mindestens 15 Sekunden gespült werden.[/bullet]',4,'');
INSERT INTO "SubchapterContent" VALUES (242,30,'[subheading]Druckprüfung mit Luft oder Inertgasen[/subheading]

In einigen Fällen wird die Dichtheitsprüfung nicht mit Wasser, sondern mit Luft oder Inertgasen (wie Stickstoff) durchgeführt. 
Diese Methode wird oft bei Kunststoffrohren oder bei kalten Temperaturen angewendet, um das Risiko von Frostschäden zu vermeiden. 
Der Prüfdruck beträgt in der Regel 1 bis 3 bar und die Prüfung dauert etwa 30 Minuten.

Bei der Prüfung mit Luft oder Inertgasen muss sorgfältig auf die Sicherheit geachtet werden, da komprimierte Gase bei plötzlicher Druckentlastung gefährlich sein können.',5,'');
INSERT INTO "SubchapterContent" VALUES (243,30,'[subheading]Inbetriebnahme und Übergabe der Anlage[/subheading]

Nach der erfolgreichen Prüfung und Spülung wird die Anlage in Betrieb genommen. 
Der Betreiber muss in die Bedienung der Anlage eingewiesen werden und erhält ein Übergabeprotokoll. 
Die Sicherungseinrichtungen wie Rückflussverhinderer und Absperrventile müssen dem Betreiber erklärt werden, um den sicheren Betrieb zu gewährleisten.',6,'');
INSERT INTO "SubchapterContent" VALUES (244,31,'[heading]Druck und Strömung in Trinkwasseranlagen[/heading]

In Trinkwasserleitungen sorgen Druck und Strömung für eine stabile Wasserversorgung. 

Normen wie DIN 1988-300 und DIN EN 806-3 bieten dafür passende Vorgaben zur Auslegung.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (245,31,'[subheading]Druckberechnung[/subheading]

Die DIN 1988-300 legt fest, wie der Druckverlust in Trinkwasserleitungen zu berechnen ist. 
Der statische Druck ist dabei der Druck des ruhenden Wassers, während der dynamische Druck durch die Strömung in der Leitung beeinflusst wird.

Der Ruhedruck p0 ist der Druck bei nicht fließendem Wasser.
Der Fließdruck pv ist der Druck, wenn Wasser durch die Leitung strömt und Reibungsverluste auftreten.

Der dynamische Druckverlust wird durch die Rohrlänge, den Durchmesser und die Fließgeschwindigkeit beeinflusst.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (246,31,'[subheading]Berechnung des Volumenstroms[/subheading]

Der Volumenstrom 𝑉 ist die Menge an Wasser, die durch eine Leitung fließt. 
Er hängt von der Fließgeschwindigkeit v, dem Rohrquerschnitt A und der Zeit ab.
 
Formel (mit dem Punkt über dem V)
 
DIN EN 806-3 gibt Empfehlungen zur Berechnung von Rohrdurchmessern und Volumenstrom, um einen konstanten Druck und eine ausreichende Wassermenge zu gewährleisten.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (247,31,'[subheading]Druckverlust durch Reibung[/subheading]

In jeder Wasserleitung entsteht ein Druckverlust durch Reibung an den Rohrwänden. Dieser Druckverlust hängt von der Rohrlänge, dem Durchmesser, der Fließgeschwindigkeit und der Viskosität des Wassers ab. 
Die Berechnung erfolgt nach der Darcy-Weisbach-Gleichung:

Formel

f ist der Reibungskoeffizient, der vom Material der Rohrwand abhängt.
L ist die Länge der Leitung.
D ist der Durchmesser der Leitung.
ρ ist die Dichte des Wassers.
v ist die Fließgeschwindigkeit.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (248,31,'[bold]Innere und äußere Reibung[/bold]

Beim Fließen des Wassers entstehen zwei Arten von Reibung:

Innere Reibung: Diese Reibung entsteht durch die Viskosität des Wassers. 
Sie beschreibt, wie die verschiedenen Wasserschichten aneinander vorbeifließen.

Äußere Reibung: Diese tritt zwischen dem Wasser und der Rohrwand auf. 
Sie ist bei rauen Rohrwänden größer und führt zu einem höheren Druckverlust.

Die kinematische Viskosität von Wasser nimmt mit steigender Temperatur ab, was die Strömung erleichtert. 
Das bedeutet, dass Wasser dünnflüssiger wird und schneller durch die Leitungen fließt.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (249,31,'[bold]Dynamischer Druck und Strömungsgeschwindigkeit[/bold]

 Der dynamische Druck entsteht durch die Bewegung des Wassers. 
 Er ist abhängig von der Dichte des Wassers und der Geschwindigkeit, mit der es durch die Leitung strömt. 
 Die Strömungsgeschwindigkeit kann durch Änderungen des Rohrquerschnitts beeinflusst werden, wie es bei Venturi-Düsen der Fall ist.
 
 Formel für den dynamischen Druck:
 
 Formel',6,NULL);
INSERT INTO "SubchapterContent" VALUES (250,1,'[subheading]Schriftfeld[/subheading]

Damit alle wichtigen Informationen schnell gefunden werden können, gibt es auf jedem Zeichenblatt ein Schriftfeld.

Das Schriftfeld enthält Details wie den Namen des Zeichners, das Datum, den Maßstab und den Projektnamen. 

[LF_1_Schriftfeld_welcome_zoom]

Es ist normalerweise am unteren Rand des Blatts platziert und sorgt dafür, dass alle wichtigen Daten übersichtlich an einer Stelle stehen.',2.1,NULL);
INSERT INTO "SubchapterContent" VALUES (251,32,'[heading]Abwasserinstallation[/heading]

[LF_6_welcome]
Eine funktionierende Abwasserinstallation sorgt dafür, dass Schmutzwasser sicher und effizient abgeleitet wird. 

Dabei sind verschiedene Systeme und Techniken im Einsatz, um eine umweltgerechte Entsorgung zu gewährleisten.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (252,32,'[subheading]Abwasserarten[/subheading]

Abwasser entsteht in verschiedenen Bereichen des täglichen Lebens und muss je nach Art unterschiedlich behandelt werden. 
Die verschiedenen Abwasserarten erfordern spezifische Reinigungsverfahren, um Umweltbelastungen zu vermeiden:

[bold]Schmutzwasser[/bold]
Übergeordneter Begriff für Wasser aus Haushalten (Duschen, Toiletten, Abwasch) und Industrie, das mit Schmutz und Schadstoffen belastet ist.

[bold]Regenwasser[/bold]
Wasser, das bei Regen von Dächern, Straßen und anderen Flächen abfließt.
[LF_6_Regenwasser_small]
[bold]Mischwasser[/bold]
Eine Mischung aus Schmutzwasser und Regenwasser, das in alten Abwassersystemen vorkommt.

[bold]Grauwasser[/bold]
Sauberes Abwasser, das keine Fäkalien enthält (z. B. aus Duschen oder Waschbecken).
[LF_6_Dusche_small]
[bold]Schwarzwasser[/bold]
Abwasser, das Fäkalien enthält, z. B. aus Toiletten.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (254,32,'[subheading]Abwasser – Ein wachsendes Problem [/subheading]

Früher wurde Abwasser direkt in Flüsse und Seen geleitet, um es loszuwerden.
 
Diese Gewässer nennt man „Vorfluter“. Doch anstatt das Problem zu lösen, verschlimmert dies die Umweltbelastung. 
Abwasser enthält Nährstoffe, die das Pflanzenwachstum fördern. 

Wenn diese Pflanzen absterben, verbrauchen sie beim Zersetzen Sauerstoff, den Fische und andere Wasserlebewesen benötigen.

[frame]Ohne ausreichend Sauerstoff „kippt“ das Wasser – es wird ungesund, riecht unangenehm und schädigt die Umwelt. Deshalb ist es wichtig, Abwasser zu behandeln, bevor es in Flüsse oder Seen geleitet wird.[/frame]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (256,32,'[subheading]Warum Abwasserreinigung wichtig ist[/subheading]

Ohne eine gründliche Reinigung kann Abwasser die Umwelt schädigen. 

Die wichtigsten Probleme sind:

[bold]Verschmutzung[/bold]
Abwasser enthält Chemikalien und Bakterien, die schädlich für Mensch und Tier sind.

[bold]Sauerstoffmangel[/bold]
Verschmutztes Wasser verbraucht den Sauerstoff, den Lebewesen im Wasser benötigen.
[LF_6_Fischsterben_small]
[bold]Giftige Gase[/bold]
Wenn Abwasser in tiefe Gewässerschichten gelangt, entstehen giftige Gase wie Methan oder Schwefelwasserstoff. 
Diese Gase können sowohl für die Umwelt als auch für Menschen gefährlich werden.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (258,32,'[subheading]Mechanische Abwasserreinigung[/subheading]

Abwasser wird in Kläranlagen durch mehrere Stufen gereinigt, bevor es in die Natur zurückgeführt wird. 
Die erste Stufe ist die mechanische Reinigung:

[bold]Gitter und Siebe[/bold]
Grobe Schmutzpartikel wie Blätter, Plastik und größere Gegenstände werden aus dem Wasser gefiltert.

[bold]Sandfänge[/bold]
Hier wird das Wasser verlangsamt, damit schwere Partikel wie Sand und Kies auf den Boden sinken und entfernt werden können.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (259,32,'[subheading]Biologische und chemische Abwasserreinigung[/subheading]

Die zweite und dritte Stufe der Abwasserreinigung sind die [bold]biologische[/bold] und [bold]chemische[/bold] Reinigung:

[bold]Biologische Reinigung[/bold]
Bakterien zersetzen organische Stoffe wie Fäkalien oder Lebensmittelreste im Wasser. 
Diese Bakterien benötigen Sauerstoff, damit sie ihre Arbeit effektiv verrichten und das Wasser von organischen Verschmutzungen befreien.
[LF_6_bakterien_small]
[bold]Chemische Reinigung[/bold]
Chemikalien werden hinzugefügt, um kleine Schmutzpartikel zu verklumpen. 
Diese Partikel setzen sich als Schlamm ab, der in Faultürmen zu Biogas und Dünger weiterverarbeitet wird.',9,'');
INSERT INTO "SubchapterContent" VALUES (260,32,'[subheading]Mischsystem[/subheading]

Beim Mischsystem fließen sowohl Schmutzwasser als auch Regenwasser durch denselben Kanal zur Kläranlage. 
Dies ist eine einfachere und günstigere Lösung, da nur ein Kanalsystem gebaut werden muss.
[LF_6_Mischsystem_zoom] 
Allerdings kann die Kläranlage bei starkem Regen überlastet werden, weil das Regenwasser das Volumen des Abwassersystems stark erhöht.

[frame]Das Mischsystem ist vor allem in älteren Stadtgebieten verbreitet, wo weniger Platz für separate Systeme vorhanden ist.[/frame]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (261,32,'[subheading]Trennsystem[/subheading]

Beim Trennsystem gibt es zwei getrennte Kanäle: 
einen für (1) [bold]Schmutzwasser[/bold] und einen für (2) [bold]Regenwasser[/bold]. 

[LF_6_Trennsystem_Abwasser_zoom]

Dadurch wird die Kläranlage entlastet, weil das Regenwasser direkt in Flüsse und Seen geleitet werden kann, ohne vorher gereinigt werden zu müssen. 

Allerdings ist dieses System teurer und aufwändiger zu bauen, da zwei separate Kanalsysteme notwendig sind.',11,NULL);
INSERT INTO "SubchapterContent" VALUES (262,32,'[subheading]Warum die Abwasserreinigung wichtig ist[/subheading]

Sauberes Wasser ist für das Leben auf der Erde unverzichtbar. Ohne Abwasserreinigung würden unsere Flüsse und Seen verschmutzen und das Ökosystem würde zusammenbrechen. 
[LF_6_Tropfen_small]
Durch die Reinigung wird sichergestellt, dass schädliche Stoffe entfernt werden und das Wasser gefahrlos zurück in die Natur gelangen kann.',12,NULL);
INSERT INTO "SubchapterContent" VALUES (263,33,'[heading]Abwasserleitungen und deren Anforderungen [/heading]

[LF_6_Abwasserleitungen_welcome]

In diesem Abschnitt lernst du, wie Abwasserleitungen funktionieren, welche Anforderungen sie erfüllen müssen und welche Materialien verwendet werden.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (264,33,'[subheading]Schwerkraftentwässerungen[/subheading]

Schwerkraftentwässerungen leiten Wasser ohne Pumpen ab. 
Das Wasser fließt durch die Schwerkraft von höheren Stellen zu tiefer liegenden Stellen. 
Diese Systeme sind Standard in der Abwassertechnik, da sie wartungsarm sind. 
Nur in speziellen Fällen werden Pumpen eingesetzt.

[frame]Schwerkraft, auch als Gravitation bekannt, ist die natürliche Anziehungskraft, die Objekte aufgrund ihrer Masse zur Erde hinzieht.[/frame]
[LF_6_Schwerkraft_small]
[section]Warum Schwerkraftentwässerung?[/section]

Der größte Vorteil der Schwerkraftentwässerung ist, dass keine Energie für Pumpen benötigt wird. 
Das macht diese Systeme besonders effizient und kostengünstig im Betrieb. 
Fast alle Abwassersysteme in Wohnhäusern funktionieren auf diese Weise.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (266,33,'[subheading]DIN-Normen für Entwässerungsanlagen[/subheading]

In Deutschland gibt es klare Vorschriften für Abwassersysteme. 

Die wichtigsten Normen sind:

[bullet]DIN EN 12056[/bullet]
[bullet]DIN EN 752[/bullet]
[bullet]DIN 1986-100[/bullet]

[bold]DIN EN 12056[/bold]
Diese Norm legt die Anforderungen an die Planung und den Betrieb von Entwässerungssystemen innerhalb von Gebäuden fest. Sie zielt darauf ab, dass Abwasser und Regenwasser sicher und zuverlässig abgeleitet werden, ohne die Gebäudestruktur oder Hygiene zu gefährden.

[bullet]Gilt für Schwerkraft-Entwässerungssysteme in Gebäuden.[/bullet]
[bullet]Beinhaltet die Dimensionierung von Abwasser- und Regenwasserleitungen.[/bullet]
[bullet]Vorschriften für die Belüftung der Leitungen zur Vermeidung von Unterdruck.[/bullet]
[bullet]Anforderungen an die Ableitung von Wasser aus Küchen, Bädern und Sanitäranlagen.[/bullet]
[bullet]Bestimmungen zum Schutz vor Überflutung und Rückstaus.[/bullet]

[bold]DIN EN 752[/bold]
Diese Norm regelt die Anforderungen für Abwasser- und Regenwassersysteme außerhalb von Gebäuden. Sie stellt sicher, dass die Kanalisation und andere Entwässerungssysteme effizient arbeiten, auch bei extremen Wetterereignissen, und langfristig instand gehalten werden.

[bullet]Bestimmungen zur hydraulischen Leistungsfähigkeit der Anlagen.[/bullet]
[bullet]Vorschriften für die Planung, den Bau und die Instandhaltung von Entwässerungssystemen.[/bullet]
[bullet]Anforderungen an die Ableitung von Regen- und Schmutzwasser.[/bullet]
[bullet]Vorgaben zur Vermeidung von Überlastungen bei Starkregen.[/bullet]

Diese Normen stellen sicher, dass Entwässerungsanlagen sowohl innerhalb als auch außerhalb von Gebäuden den technischen und sicherheitstechnischen Anforderungen entsprechen.

[bold]DIN 1986-100[/bold]
Die DIN 1986-100 ist eine Norm, die sich mit der Planung, Ausführung und Betrieb von Entwässerungsanlagen innerhalb von Gebäuden und Grundstücken befasst. 

[bullet]Bemessung und Dimensionierung der Rohrleitungen für die Abwasserableitung.[/bullet]
[bullet]Anforderungen an Rückstauschutz und Schutzmaßnahmen gegen Überflutung.[/bullet]
[bullet]Vorgaben zur Ableitung von Regenwasser und dessen Behandlung auf Grundstücken.[/bullet]
[bullet]Wartung und Instandhaltung der Entwässerungssysteme, um eine sichere und dauerhafte Funktion sicherzustellen.[/bullet]
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (268,33,'[subheading]Mindestgefälle in Entwässerungsanlagen[/subheading]

Damit das Abwasser gut abfließen kann, muss in den Rohren ein Mindestgefälle vorhanden sein. 

Dieses beträgt:

[bullet]1 cm pro Meter für unbelüftete Anschlussleitungen[/bullet]
[bullet]0,5 cm pro Meter für belüftete Anschlussleitungen[/bullet]
[LF_6_Gefälle]
Das sorgt dafür, dass das Wasser durch die Schwerkraft schnell und ohne Rückstau abfließen kann.

Wir werden später nochmal das Thema Gefälle genauer behandeln.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (274,33,'[subheading]Prüfzeichen für Abwasserrohre[/subheading]

Bestimmte Rohre und Formteile, die in der Entwässerung verwendet werden, müssen ein Prüfzeichen haben. 

Dieses Zeichen zeigt, dass sie geprüft wurden und den Standards entsprechen. 
Das bedeutet, dass sie sicher sind und nicht leicht beschädigt werden können.

Es gibt verschiedene Prüfzeichen, je nachdem, welche Anforderungen die Rohre erfüllen müssen. 

Wenn eine Entwässerungsanlage dieses Zeichen nicht hat, darf sie nicht verbaut werden.
',10,NULL);
INSERT INTO "SubchapterContent" VALUES (275,34,'[heading]Leitungsteile der Entwässerungsanlage[/heading]

[LF_6_Leitungsteile_welcome]

In einer Entwässerungsanlage gibt es verschiedene Leitungen, die alle spezielle Aufgaben erfüllen. 

Jede dieser Leitungen trägt dazu bei, das Abwasser sicher und effizient abzuleiten.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (276,34,'[subheading]Anschlusskanal[/subheading]

Der Anschlusskanal führt das Abwasser von der Grundstücksgrenze bis zur öffentlichen Straße.

Diese Leitung stellt die Verbindung zum öffentlichen Abwassersystem her.

[LF_6_Anschlusskanal_zoom]',8,NULL);
INSERT INTO "SubchapterContent" VALUES (277,34,'[subheading]Grundleitungen[/subheading]

Grundleitungen liegen unter der Erde und transportieren das Abwasser aus den Fall- und Anschlussleitungen zum Anschlusskanal. 

Sie werden sowohl außerhalb oder unterhalb von Gebäuden verlegt und müssen leicht zugänglich für Reinigungen sein.

Dafür müssen Reinigungsöffnungen  eingebaut werden.

[LF_6_Grundleitung_zoom]',6,NULL);
INSERT INTO "SubchapterContent" VALUES (278,34,'[subheading]Sammelleitungen[/subheading]

Sammelleitungen befinden sich im Gebäude und sammeln das Abwasser aus den Fall- und Anschlussleitungen.

[LF_6_Sammelleitung_zoom]

Sie haben dieselbe Funktion wie Grundleitungen, verlaufen aber oberirdisch, innerhalb des Gebäudes.

[frame]Sammelleitungen und Sammelanschlussleitungen werden häufig verwechselt, da ihre Bezeichnungen ähnlich klingen. Sie unterscheiden sich jedoch in ihrer Funktion und Position im Abwassersystem.[/frame]
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (279,34,'[subheading]Fallleitungen[/subheading]

Fallleitungen verlaufen senkrecht durch mehrere Stockwerke eines Gebäudes und leiten das Abwasser in die Grund- oder Sammelleitung.
 
[LF_6_Falleitung_zoom]

Es gibt Schmutzwasser-Fallleitungen, die innerhalb des Gebäudes verlaufen, und Regenwasser-Fallleitungen, die meist außen am Gebäude angebracht sind.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (280,34,'[subheading]Einzel- und Sammelanschlussleitungen[/subheading]

Anschlussleitungen verbinden Sanitär-Objekte, wie Waschbecken oder Toiletten, mit Fall-, Sammel- oder Grundleitungen im Abwassersystem. 
[LF_6_Einzelanschlussleitung_zoom]

In Deutschland unterscheidet man zwischen Einzel-Anschlussleitungen, die jeweils ein Objekt mit der Abwasserleitung verbinden, und Sammel-Anschlussleitungen, die mehrere Objekte, wie z.B. Waschbecken und Toiletten, gemeinsam an die Hauptleitung anschließen.

[LF_6_Sammelanschlussleitung_zoom]

',4,NULL);
INSERT INTO "SubchapterContent" VALUES (281,34,'[subheading]Verbindungsleitungen[/subheading]

Die Verbindungsleitung verbindet den Siphon (Geruchsverschluss) eines Sanitär-Objekts mit der Anschlussleitung. 

[LF_6_Verbindungsleitung_zoom]
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (282,34,'[subheading]Umgehungsleitungen[/subheading]

Umgehungsleitungen werden eingesetzt, wenn Anschlussleitungen z. B. bei einer Fallleitungsverziehung oder beim Übergang von einer Fallleitung in eine andere umgeleitet werden müssen. 

Dabei entstehen oft Überdruck- und Unterdruckbereiche, insbesondere beim Umlenken in liegende Leitungen. 
[LF_6_Umgehungsleitungen_zoom]
Diese Druckunterschiede müssen durch die Umgehungsleitung umgangen werden, um einen störungsfreien Abfluss sicherzustellen und Probleme wie Rückstau oder Geräuschentwicklung zu vermeiden.

',10,NULL);
INSERT INTO "SubchapterContent" VALUES (283,34,'[subheading]Lüftungsleitungen[/subheading]

Lüftungsleitungen transportieren kein Abwasser. 

Sie sorgen dafür, dass Luft in der Entwässerungsanlage zirkuliert und den Druck ausgleicht. 

[LF_6_Lüftungsleitung_zoom]

Diese Leitungen werden über das Dach geführt.
',9,NULL);
INSERT INTO "SubchapterContent" VALUES (284,35,'[heading]Das Gefälle[/heading]

[LF_6_Gefälle_2]

In den nächsten Slides erfährst du, wie das Gefälle in Abwasserleitungen funktioniert und warum die richtige Neigung entscheidend ist. 

Außerdem lernst du, wie du das Gefälle berechnest und welche Vorschriften es gibt.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (285,35,'[subheading]Was ist das Gefälle?[/subheading]

Das Gefälle beschreibt, wie stark eine Leitung nach unten geneigt ist.

Je größer das Gefälle, desto schneller fließt das Wasser. 

Ist das Gefälle jedoch zu groß, kann das Wasser zu schnell fließen und feste Stoffe, wie Toilettenpapier, bleiben in der Leitung liegen. 
[LF_6_Gefälle_pümpel_small]
Ein zu geringes Gefälle sorgt dagegen für langsames Abfließen, was ebenfalls Probleme verursachen kann.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (286,35,'[subheading]Mindest- und Maximalgefälle[/subheading]

Damit das Abwasser gut abläuft, gibt es bestimmte Vorschriften. 

Das [bold]Mindestgefälle[/bold] für Abwasserleitungen beträgt je nach Leitungsart [bold]0,5%[/bold] oder [bold]1%[/bold]. 
Das bedeutet, dass die Leitung bei 1% Gefälle auf einer Länge von 1 Meter um 1 cm absinkt. 

Das [bold]Maximalgefälle[/bold] sollte nicht mehr als [bold]5%[/bold] betragen, da das Wasser sonst zu schnell fließt.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (287,35,'[subheading]Berechnung des Gefälles[/subheading]

Gefälle beschreibt, wie steil eine Fläche ist, indem es das Verhältnis zwischen dem Höhenunterschied (Δh) und der horizontalen Länge (l) angibt.

Es gibt drei verschiedene Methoden, um das Gefälle zu berechnen:

[bold]Relativgefälle[/bold]
[bold]Prozentuales Gefälle[/bold]
[bold]Neigungsverhältnis[/bold]

Jede Methode zeigt das Gefälle in unterschiedlichen Einheiten (dimensionslos, %, Verhältnis).

In unserem Beispiel wollen wir das Gefälle eines Rohres berechnen, das eine [bold]horizontale Länge von l = 5m[/bold] und einen [bold]Höhenunterschied von Δh = 0,2m[/bold] hat. 

Anhand dieses Beispiels werden wir die drei Berechnungen anwenden.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (288,35,'[section]Relativgefälle[/section]

Diese Formel gibt das Verhältnis zwischen dem Höhenunterschied und der horizontalen Länge an. 
Sie ist dimensionslos, d. h., es wird kein konkreter Wert wie Meter oder Prozent angegeben.

[bold]Formel[/bold]
[LF_6_Relativgefälle_small]

[bold]Erklärung[/bold]

[bold]Ir[/bold] Relativgefälle (dimensionslos, kein konkreter Wert wie Meter, % oder Grad)
[bold]Δh [/bold] Delta, Höhe (Höhenunterschied in Metern)
[bold]l[/bold] Horizontale Länge (in Metern)

[bold]Berechnung[/bold]
[LF_6_Relativgefälle_Berechnung_small]

Das Relativgefälle für unser Beispielrohr beträgt 0,04.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (289,35,'[section]Prozentuales Gefälle[/section]

Diese Formel berechnet das Gefälle als Prozentsatz. 
Das Ergebnis wird in Prozent (%) angegeben und zeigt, wie viel Prozent der Höhenunterschied der Länge entspricht.

[bold]Formel[/bold]
[LF_6_prozentuales_Gefälle_small]

[bold]Erklärung[/bold]

[bold]I%[/bold] Gefälle in Prozent (%)
[bold]Δh [/bold] Delta, Höhe (Höhenunterschied in Metern)
[bold]l[/bold] Horizontale Länge (in Metern)

[bold]Berechnung[/bold]
[LF_6_prozentuales_Gefälle_Berechnung_small]

Das Gefälle beträgt hier 4%.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (290,36,'[heading]Der Füllungsgrad[/heading]

[LF_6_Füllgrad_welcome]

Der Füllungsgrad gibt an, wie voll eine Abflussleitung ist und beeinflusst, wie gut das Abwasser abfließen kann. 

Du lernst, wie der Füllungsgrad berechnet wird und warum er wichtig für das Abwassersystem ist.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (291,36,'[subheading]Definition des Füllungsgrades[/subheading]

Der Füllungsgrad beschreibt, wie voll eine Abflussleitung während der Benutzung ist. 
Es handelt sich um das Verhältnis zwischen der Höhe des Abwassers und dem Durchmesser der Leitung. 

Ein Füllungsgrad von [bold]1[/bold] bedeutet, dass die Leitung vollständig mit Wasser gefüllt ist, während ein Füllungsgrad von [bold]0,5[/bold] anzeigt, dass die Leitung nur zur Hälfte gefüllt ist.

[bold]Bedeutung des optimalen Füllungsgrades[/bold]

Ein optimaler Füllungsgrad stellt sicher, dass das Abwasser ungehindert abfließen kann und Verstopfungen vermieden werden. 
Gleichzeitig bleibt ausreichend Luft im Rohr, was zur Entlüftung der Abwasserleitungen beiträgt und die Bildung unangenehmer Gerüche verhindert. 

[frame]Eine gute Luftzirkulation im Rohr unterstützt den reibungslosen Betrieb des Abwassersystems.[/frame]',2,NULL);
INSERT INTO "SubchapterContent" VALUES (293,36,'[subheading]Optimaler Füllungsgrad[/subheading]

In der Praxis wird ein Füllungsgrad von etwa [bold]50-70%[/bold] angestrebt. 

Das sorgt dafür, dass das Abwasser mit ausreichender Geschwindigkeit abfließt und gleichzeitig genügend Luft im Rohr bleibt. 

[LF_6_optimaler_Füllungsgrad_zoom]

Ein solcher Füllungsgrad stellt sicher, dass die Abflussleistung optimal ist und Verstopfungen vermieden werden.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (294,36,'[subheading]Auswirkungen des Füllungsgrads[/subheading]

Ein zu [bold]hoher Füllungsgrad[/bold] (nahe 100%) kann zu Problemen wie Blubbergeräuschen, unangenehmen Gerüchen oder sogar Rückstau führen. 

[LF_6_hoher_Füllungsgrad_zoom]

Ein zu [bold]niedriger Füllungsgrad[/bold] (unter 50%) beeinträchtigt hingegen die Selbstreinigung des Rohres, da das Wasser zu langsam fließt und Ablagerungen nicht weggespült werden.

[LF_6_niedriger_Füllungsgrad_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (295,36,'[subheading]Berechnung des Füllungsgrad[/subheading]

Der Füllungsgrad wird berechnet, indem man die Höhe des Abwassers in der Leitung durch den Durchmesser der Leitung teilt.
Das Ergebnis wid dann mit 100 multipliziert. ??

[bold]Formel[/bold]
[LF_6_Formel_Füllungsgrad_small]

[bold]Erklärung[/bold]

[bold]h[/bold] die Höhe des Abwassers in der Leitung
[bold]d[/bold] der Innendurchmesser der Leitung

[LF_6_Füllungsgrad_zoom]
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (296,37,'[heading]Rohrwerkstoffe Abwasserleitungen[/heading]

[LF_6_Rohrwerkstoffe_welcome]

Abwasserrohre bestehen aus unterschiedlichen Materialien, die je nach Anforderung ausgewählt werden. 

Hier lernst du die gängigsten Materialien und ihre Eigenschaften kennen.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (297,37,'[subheading]Nennweite (DN)[/subheading]

Der "Diameter Nominal" (DN) ist eine normierte Bezeichnung für den ungefähren Innendurchmesser eines Rohrs. 
Dabei handelt es sich um eine vereinfachte Größenangabe, die nicht den genauen Innendurchmesser, sondern einen abgerundeten Wert angibt. 
Der DN-Wert ermöglicht es, Rohrgrößen unabhängig vom Material miteinander zu vergleichen, da er international standardisiert ist. 
So können Rohre aus verschiedenen Werkstoffen (z.B. Metall, Kunststoff) besser aufeinander abgestimmt und für gleiche Anwendungen genutzt werden, obwohl ihre tatsächlichen Innendurchmesser leicht variieren können.

[frame]"Nominal" stammt vom lateinischen Wort "nomen", was "Name" bedeutet. Allgemein bezieht sich "nominal" auf etwas, das als Bezeichnung oder vereinbarter Wert dient, ohne zwingend den exakten realen oder physikalischen Wert darzustellen. [/frame]',14,NULL);
INSERT INTO "SubchapterContent" VALUES (298,37,'[subheading]Blechrohre[/subheading]

Blechrohre werden oft für Regenwasserleitungen eingesetzt.

[LF_6_Regenrohr_small]

Sie sind jedoch nicht für alle Einsatzgebiete geeignet, da sie in bestimmten Umgebungen rostanfällig sein können.
',2,'');
INSERT INTO "SubchapterContent" VALUES (299,37,'[subheading]Faserzementrohre[/subheading]

Faserzementrohre bestehen aus Zement und synthetischen Fasern, wodurch sie elastisch und gleichzeitig robust sind. 

Sie sind korrosionsbeständig und feuerfest. 

Allerdings werden sie heute nur noch selten verwendet, da modernere Materialien sie in den meisten Anwendungsbereichen, einschließlich Entwässerungsanlagen, weitgehend ersetzt haben.

[frame]Bei der Handhabung alter Faserzementrohre ist besondere Vorsicht geboten, da diese Asbest enthalten können. Es ist wichtig, geeignete Schutzmaßnahmen zu ergreifen, um das Freisetzen gefährlicher Asbestfasern zu vermeiden.[/frame]',3,'');
INSERT INTO "SubchapterContent" VALUES (300,37,'[subheading]Glasrohre[/subheading]

Glasrohre sind besonders beständig gegen Säuren, Salze und organische Stoffe. 

Sie verhindern Ablagerungen und bieten durch ihre Transparenz die Möglichkeit zur Sichtkontrolle. 

[frame]Aufgrund ihrer hohen Kosten werden sie oft in der chemischen Industrie und in Laboren eingesetzt.[/frame]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (301,37,'[subheading]Gussrohre[/subheading]

Gussrohre haben eine hohe Festigkeit, Hitzebeständigkeit und gute Schalldämmun. 
Sie sind korrosions- und feuerbeständig, daher ideal für Entwässerungsanlagen. 

Ihre Innenbeschichtung, meist aus [bold]Epoxid-Teer[/bold], schützt vor heißem Abwasser sowie haushaltsüblichen Säuren und Laugen. 

[frame]Epoxid ist ein Kunstharz, das durch chemische Reaktion aushärtet und eine sehr widerstandsfähige, stabile und langlebige Beschichtung bildet[/frame]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (302,37,'[subheading]Stahlrohre[/subheading]

Stahlrohre bestehen aus [bold]geschweißtem[/bold], [bold]verzinktem[/bold] Stahl. 

Sie sind hitzebeständig und korrosionsbeständig. 
Zusätzlich haben sie eine Kunststoffbeschichtung im Inneren, um sie vor Rost zu schützen. 

Stahlrohre werden häufig für sichtbare Regenwasserleitungen verwendet.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (303,37,'[subheading]Steinzeugrohre[/subheading]

Steinzeugrohre bestehen aus gebrannter Keramik, die durch eine Glasur geschützt ist. 

Diese Rohre sind sehr widerstandsfähig gegen Säuren und Laugen und werden oft in der Kanalisation und zur Abwasserableitung eingesetzt.

[LF_6_Kanalisation_small]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (304,37,'[subheading]Kunststoffrohre[/subheading]

Kunststoffrohre sind aufgrund ihrer vielen Vorteile besonders beliebt in Entwässerungsanlagen. 

Dazu gehören:

[bold]Leichtes Gewicht[/bold]
Erleichtert Transport und Installation.

[bold]Korrosionsbeständigkeit[/bold]
Widerstandsfähig gegenüber Rost und Chemikalien.

[bold]Einfache Montage[/bold]
Spart Zeit und Kosten.

[bold]Glatte Innenflächen[/bold]
Verhindern Ablagerungen und sorgen für ungehinderten Abfluss.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (305,37,'[section]PE-HD-Rohre[/section]

PE-HD-Rohre bestehen aus einem besonders dichten Kunststoff, der sehr robust ist. 

Sie sind schweißbar, frostbeständig und hitzebeständig bis 100°C. 
[LF_6_PEHD_small]
Sie werden häufig in Entwässerungsanlagen verwendet, da sie mechanischen Belastungen gut standhalten.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (306,37,'[section]PE-HD-Rohre, mineralverstärkt[/section]

Mineralverstärkte PE-HD-Rohre bestehen aus hochdichtem Polyethylen (PE-HD), das durch mineralische Füllstoffe verstärkt wird. 

Diese Kombination erhöht die Steifigkeit und Festigkeit der Rohre, ohne deren Flexibilität zu verlieren. 

Zudem sorgt die Verstärkung für eine bessere Schalldämmung.

[LF_6_Schalldämmung_PEHD_small]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (307,37,'[section]HT-Rohre – Hochtemperaturrohre[/section]

HT-Rohre (Hochtemperatur-Rohre) können aus verschiedenen Kunststoffen bestehen, meist aber wird Polypropylen (PP) verwendet. 

Diese Rohre eignen sich für Abwässer mit hohen Temperaturen bis 100°C.

[frame]Hochtemperatur bedeutet, dass Materialien oder Systeme in der Lage sind, dauerhaft hohen thermischen Belastungen standzuhalten, ohne ihre Funktion oder Stabilität zu verlieren.[/frame]',11,NULL);
INSERT INTO "SubchapterContent" VALUES (308,37,'[section]PP-Rohre, mineralverstärkt[/section]

PP-Rohre mit mineralischen Zusätzen haben eine erhöhte Stabilität und bieten eine verbesserte Schalldämmung. 

[LF_6_PP_small]

Durch die Mineralstoffe besitzen sie eine doppelt so hohe Dichte im Vergleich zu herkömmlichen PP-Rohren, was sie für den Einsatz in geräuschsensiblen Gebäuden wie Wohnhäusern geeignet macht.',12,NULL);
INSERT INTO "SubchapterContent" VALUES (309,37,'[section]PVC-U-Rohre[/section]


PVC-U-Rohre bestehen aus hartem PVC und sind widerstandsfähig. 
Sie werden häufig als KG-Rohre (Kanalgrundrohre) unter der Erde verlegt und durch Steckmuffen verbunden. 
Ihre verstärkten Wände verleihen ihnen zusätzliche Robustheit, wodurch sie sich ideal für die Ableitung von Abwasser und als Teil von Kanalisationen eignen. 

Allerdings sind PVC-U-Rohre nicht UV-beständig und sollten daher nicht dauerhaft direkter Sonneneinstrahlung ausgesetzt werden.

[frame]Das "U" in PVC-U steht für "unplasticized", was bedeutet, dass das Material kein Weichmacher enthält. [/frame]',13,NULL);
INSERT INTO "SubchapterContent" VALUES (311,38,'[heading]Regenwasser[/heading]

Regenwasser fällt regelmäßig an und kann sowohl abgeleitet als auch sinnvoll genutzt werden. 
Die folgenden Slides zeigen, wie dies in Entwässerungssystemen funktioniert.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (312,38,'[subheading]Ableitung von Regenwasser[/subheading]

Regenwasser kann auf zwei Arten abgeleitet werden: im Mischsystem oder im Trennsystem. 
Im Mischsystem fließen Regenwasser und Schmutzwasser zusammen in einer Leitung, während im Trennsystem zwei separate Kanäle verwendet werden.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (313,38,'[subheading]Ableitung im Mischsystem[/subheading]

Im Mischsystem fließen Regen- und Schmutzwasser gemeinsam in einen Kanal. 
Dies ist die ältere Methode, die bei Sanierungen von Bestandsgebäuden oft noch zu finden ist. 
Ein Nachteil ist, dass Kläranlagen stärker belastet werden.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (314,38,'[subheading]Ableitung im Trennsystem[/subheading]

Im Trennsystem werden Regenwasser und Schmutzwasser in getrennten Kanälen abgeleitet. 
Dies entlastet die Kläranlagen, da das Regenwasser nicht gereinigt werden muss. 
Es kann direkt in Flüsse oder Versickerungsanlagen geleitet werden.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (315,38,'[subheading] Berechnung der Regenwassermenge[/subheading]

Die Regenwassermenge, die abgeleitet werden muss, hängt von der Dachfläche, der Niederschlagsmenge und dem Abflussbeiwert ab. 
Zur Berechnung verwendet man die Formel:

Regenwassermenge(l/s) = Dachfläche (m²) x Abflussbeiwert x Niederschlagsmenge (l/s x m²)

[frame]
Der Abflussbeiwert hängt vom Material der Dachfläche ab. 
Diese Werte können in technischen Regelwerken, DIN-Normen (z.B. DIN 1986), oder von Fachleuten, wie Ingenieuren und Dachdeckern, abgerufen werden.[/frame]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (316,38,'[subheading]Beispielberechnung der Regenwassermenge[/subheading]

Ein Dach mit einer Fläche von 100 m² und einem Abflussbeiwert von 0,8 soll bei einem Niederschlag von 0,03 l/s·m² entwässert werden. Die Regenwassermenge beträgt:
100 m² × 0,8 × 0,03 l/s·m² = 2,4 l/s

Das Ergebnis bedeutet, dass von der Dachfläche 2,4 Liter Wasser pro Sekunde abgeleitet werden müssen.
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (317,38,'[subheading]Regenwassernutzung[/subheading]

Regenwasser kann für viele Zwecke genutzt werden, z.B. für die Gartenbewässerung, die WC-Spülung oder die Autowäsche. 
Regenwassernutzungsanlagen sind eine umweltfreundliche Alternative, die auch die Kosten für Trinkwasser senken kann.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (318,38,'[subheading]Vorteile der Regenwassernutzung[/subheading]

Die Nutzung von Regenwasser bietet viele Vorteile:
Senkung des Trinkwasserverbrauchs
Kosteneinsparung
Umweltschonend, da weniger Trinkwasser benötigt wird
Entlastung der Kläranlagen durch geringeren Abfluss in die Kanalisation
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (319,8,'[subheading]Verbotszeichen[/subheading]

Verbotszeichen zeigen deutlich, was in bestimmten Bereichen nicht erlaubt ist.


Beispiele:


[LF_2_Verbotsschilder_zoom]',3,'');
INSERT INTO "SubchapterContent" VALUES (320,8,'[subheading]Warnzeichen[/subheading]

Warnzeichen weisen auf mögliche Gefahren hin, die besondere Vorsicht erfordern.


Beispiele:

[LF_2_Warnzeichen_zoom]',4,'');
INSERT INTO "SubchapterContent" VALUES (321,8,'[subheading]Gebotszeichen[/subheading]

Gebotszeichen geben an, welche Maßnahmen ergriffen werden müssen, um die Sicherheit zu gewährleisten.


Beispiele:

[LF_2_Gebotszeichen_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (322,8,'[subheading]Rettungszeichen[/subheading]

Rettungszeichen weisen auf sichere Fluchtwege oder Erste-Hilfe-Stationen hin.


Beispiele:

[LF_2_Rettungszeichen_zoom]',6,'');
INSERT INTO "SubchapterContent" VALUES (323,8,'[subheading]Brandschutzzeichen[/subheading]

Brandschutzzeichen markieren die Position von Feuerlöscheinrichtungen oder Brandmeldern.


Beispiele:

[LF_2_Brandschutz_zoom]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (324,39,'[heading]Temperatureinheiten[/heading]

[LF_7_Temperatureinheiten_welcome]

In diesem Kapitel geht es um Temperatureinheiten, wie Wärme gemessen wird und was Temperaturdifferenzen bedeuten.',1,'');
INSERT INTO "SubchapterContent" VALUES (325,39,'[subheading]Was ist Wärme?[/subheading]

Wärme ist eine Form von Energie, die durch die Bewegung von Teilchen entsteht. 

Wenn sich die Teilchen schneller bewegen, steigt die Temperatur und wir nehmen Wärme wahr. 

Wärme kann nicht direkt gemessen werden, sondern nur die Temperatur, die durch die Bewegung der Teilchen entsteht.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (326,39,'[subheading]Wie messen wir Wärme?[/subheading]

Wärme selbst wird nicht direkt gemessen, sondern ihre Wirkung – die Temperatur. 
Um die Temperatur zu messen, verwenden wir Thermometer. 
Sie zeigen die Temperatur auf verschiedenen Skalen an, zum Beispiel Celsius oder Kelvin.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (327,39,'[subheading]Die Celsius-Skala[/subheading]

Die Celsius-Skala wird in den meisten Ländern, insbesondere in Europa, verwendet, um Temperaturen im Alltag zu messen.
Auf ihr liegt der Gefrierpunkt von Wasser bei 0 °C und der Siedepunkt bei 100 °C. 
[LF_7_Celsius_zoom]  ',4,'');
INSERT INTO "SubchapterContent" VALUES (328,39,'[subheading]Die Kelvin-Skala[/subheading]

Die Kelvin-Skala wird vor allem in der Wissenschaft genutzt. 
Sie beginnt bei -273,15 °C, dem absoluten Nullpunkt, bei dem keine Teilchenbewegung mehr stattfindet. 
Ein Kelvin entspricht einem Grad Celsius.

[frame]Der Gefrierpunkt von Wasser liegt bei 0 °C (273,15 K). Hier bewegen sich die Teilchen langsamer und das Wasser wird fest. Am absoluten Nullpunkt bei -273,15 °C (0 K) stoppen die Teilchenbewegungen vollständig – dies ist die niedrigste mögliche Temperatur.[/frame]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (329,39,'[subheading]Aggregatzustände und Temperatur[/subheading]

Temperatur beeinflusst die Aggregatzustände von Stoffen. 
Bei hoher Temperatur wird ein fester Stoff flüssig (Schmelzpunkt) und bei noch höherer Temperatur gasförmig (Siedepunkt). 
Jeder Stoff hat seine eigenen Schmelz- und Siedepunkte.

[bold]Dichteanomalie[/bold]
Die Dichteanomalie des Wassers ist ein Phänomen, das Wasser von anderen Stoffen unterscheidet. 
Normalerweise steigt die Dichte bei sinkender Temperatur, aber bei Wasser nur bis 4 °C. 
[LF_7_Dichteanomalie_zoom]
Unterhalb dieser Temperatur dehnt sich Wasser aus und wird weniger dicht. 
Dadurch bleibt kaltes Wasser in Seen und Flüssen im Winter oben und friert an der Oberfläche, während das Wasser darunter wärmer bleibt. 
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (330,39,'[subheading]Temperaturdifferenzen[/subheading]

Eine Temperaturdifferenz bedeutet, dass zwei Orte oder Gegenstände unterschiedlich warm sind. 
Wenn ein Raum wärmer ist als ein anderer, fließt die Wärme vom warmen Raum zum kälteren. 
Das passiert, weil Wärme immer von einem Ort mit höherer Temperatur zu einem Ort mit niedrigerer Temperatur fließen will. 

Diese Temperaturunterschiede sind wichtig, damit Heizsysteme richtig funktionieren: 
Die Heizkörper geben warme Luft ab, die sich im Raum verteilt, um ihn auf die gewünschte Temperatur zu bringen.

[frame]In der Heizungstechnik wird die Temperaturdifferenz in Kelvin (K) angegeben, da Kelvin als absolute Einheit für Temperaturunterschiede verwendet wird. So vermeidet man negative Werte, die bei Celsius oder Fahrenheit auftreten könnten, da Kelvin keinen Nullpunkt unterschreitet.[/frame]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (331,40,'[heading]Wärmetransfer[/heading]

[LF_7_Wärmetransfer_welcome]

In diesem Kapitel lernst du die drei Arten des Wärmetransfers kennen: Wärmeleitung, Konvektion und Wärmestrahlung. 
Außerdem sehen wir uns die verschiedenen Prinzipien von Wärmeübertragern an.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (332,40,'[subheading]Was bedeutet Wärmetransfer[/subheading]

Wärmetransfer bedeutet, dass Wärme von einem Ort mit höherer Temperatur zu einem Ort mit niedrigerer Temperatur fließt.

Dies geschieht durch drei verschiedene Arten:
[bold]Wärmeleitung[/bold]
[bold]Konvektion[/bold]
[bold]Wärmestrahlung[/bold]

In Zentralheizungsanlagen finden alle drei Arten der Wärmeübertragung gleichzeitig statt:
 
[bold]Wärmeleitung[/bold] in den Heizkörpern, [bold]Konvektion[/bold] der Luft im Raum und [bold]Wärmestrahlung[/bold] von der Heizfläche.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (333,40,'[subheading]Wärmeleitung[/subheading]

Wärmeleitung tritt besonders in festen Stoffen auf. 
Die Teilchen in festen Stoffen übertragen ihre Schwingungen an benachbarte Teilchen, wodurch die Wärme weitergeleitet wird. Metalle sind dabei besonders gute Wärmeleiter, da ihre Teilchen dicht gepackt sind und die Wärme schnell weitergeben.

[bold]Gute Wärmeleiter[/bold] 
Metalle wie Kupfer, Aluminium, Eisen.

[bold]Schlechte Wärmeleiter[/bold]
Dämmstoffe, poröse Kunststoffe, Luft.

[frame]Wasser ist ein mäßiger Wärmeleiter. Es leitet Wärme besser als Dämmstoffe oder Luft, aber deutlich schlechter als Metalle. Aufgrund dieser Eigenschaft wird Wasser oft in Heizsystemen als Wärmeträger eingesetzt, da es die Wärme gleichmäßig transportieren kann, ohne sie zu schnell zu verlieren.[/frame]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (334,40,'[subheading]Konvektion[/subheading]

Konvektion ist der Wärmeübertragungsprozess, der in Flüssigkeiten und Gasen stattfindet. 
Wenn ein Bereich einer Flüssigkeit oder eines Gases erwärmt wird, verringert sich die Dichte dort, wodurch die wärmeren, leichteren Teilchen aufsteigen. 
Gleichzeitig sinken kältere, dichtere Teilchen ab. 
Dies erzeugt eine ständige Zirkulation, die Wärme im Raum oder in einem System verteilt.

[bold]Freie Konvektion[/bold] 
Hier erfolgt die Bewegung allein durch Temperaturunterschiede. 
Die warmen Teilchen steigen von selbst auf, und kältere Teilchen sinken ab, ohne zusätzliche Unterstützung.

[bold]Erzwungene Konvektion[/bold]
Eine Pumpe oder ein Ventilator beschleunigt die Zirkulation, um die Wärmeverteilung gezielt zu verstärken und zu steuern.
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (335,40,'[subheading]Wärmestrahlung[/subheading]

Wärmestrahlung ist die Übertragung von Wärme durch elektromagnetische Wellen, wie z. B. Infrarotstrahlen. 
Anders als bei der Wärmeleitung oder Konvektion benötigt die Strahlung kein Medium.

[bold]Beispiel[/bold] 
Die Wärme, die von der Sonne kommt, erreicht die Erde durch Strahlung.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (336,40,'[subheading]Wärmeübertrager[/subheading]

Wärmeübertrager sind Geräte, die Wärme zwischen zwei Medien übertragen.

[bold]Gleichstromprinzip[/bold]
Beide Medien fließen in dieselbe Richtung.

[bold]Gegenstromprinzip[/bold]
Die Medien fließen in entgegengesetzte Richtungen und bieten einen effizienteren Wärmeaustausch.

[bold]Kreuzstromprinzip[/bold]
Die Medien fließen im rechten Winkel zueinander, was häufig in industriellen Prozessen genutzt wird.	',6,NULL);
INSERT INTO "SubchapterContent" VALUES (338,41,'[heading]Gebäudeenergiegesetz[/heading]

[LF_7_Gebäudeenergiegesetz_welcome]
Das Gebäudeenergiegesetz (GEG) regelt, wie Gebäude effizient beheizt und gekühlt werden, um den Energieverbrauch zu senken.
',1,NULL);
INSERT INTO "SubchapterContent" VALUES (339,41,'[subheading]Was ist das Gebäudeenergiegesetz (GEG)?[/subheading]

Das GEG wurde 2020 in Deutschland eingeführt und ersetzt die früheren Energieeinsparverordnungen. 
Ziel des Gesetzes ist es, die Energieeffizienz von Gebäuden zu verbessern, um den Energieverbrauch zu senken und den Einsatz erneuerbarer Energien zu fördern.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (340,41,'[subheading]Niedrigstenergie-Gebäude[/subheading]

Das GEG fordert, dass Neubauten als Niedrigstenergie-Gebäude geplant und gebaut werden. 
Diese Gebäude haben eine sehr gute Wärmedämmung und eine effiziente Heiztechnik, die mit minimalem Energieaufwand auskommt. 
Ein solches Gebäude benötigt weniger als 40 kWh/(m²·a) Energie für Heizung und Kühlung.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (341,41,'[subheading]Energieausweis[/subheading]

Der Energieausweis zeigt den Energieverbrauch eines Gebäudes an. 
Er ist beim Verkauf oder bei der Vermietung eines Gebäudes Pflicht und soll den Energieverbrauch transparent machen. 
Neubauten müssen diesen Ausweis ebenfalls erhalten.
[LF_7_Energieausweis_zoom]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (342,41,'[subheading]Erneuerbare Energien im GEG[/subheading]

Das GEG fördert auch den Einsatz erneuerbarer Energien wie Solarenergie, Umweltwärme oder Biomasse. 

Heizsysteme, die mit erneuerbaren Energien betrieben werden, sollen zur Verbesserung der Energieeffizienz beitragen.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (353,43,'[heading]Systeme zur Raumbeheizung[/heading]

[LF_7_Heizsysteme_welcome]

Heizsysteme sorgen dafür, dass Räume angenehm und gleichmäßig beheizt werden. 
Wir werden uns sowohl verschiedene Heizkörperarten als auch Flächenheizungen ansehen, ihre Funktionsweise erklären und die jeweiligen Vor- und Nachteile erläutern.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (354,43,'[subheading]Gliederheizkörper[/subheading]

[bold]Funktionsweise[/bold]
Gliederheizkörper bestehen aus mehreren vertikal angeordneten Gliedern, die durch Warmwasser beheizt werden. Die Wärme wird dabei sowohl durch Strahlung als auch durch Konvektion an die Raumluft abgegeben. 
Es gibt zwei Haupttypen:

[bold]Gussgliederheizkörper[/bold]
Die Glieder bestehen aus Gusseisen, das Wärme gut speichert und gleichmäßig abgibt.

[bold]Stahlgliederheizkörper[/bold]
Die Glieder bestehen aus zwei zusammengeschweißten Halbschalen aus Stahlblech, wodurch sie leichter sind und schneller auf Temperaturänderungen reagieren.

[bold]Vorteile[/bold]
Einfach zu reinigen
Robuste Bauweise
Lange Lebensdauer

[bold]Nachteile[/bold]:
Benötigt mehr Platz
Eher in älteren Heizungsanlagen zu finden
Hohe Vorlauftemperaturen nötig
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (355,43,'[subheading]Plattenheizkörper[/subheading]

[bold]Funktionsweise[/bold]
Plattenheizkörper bestehen aus Stahlblechplatten, durch die warmes Wasser fließt. 
Die Wärme wird überwiegend durch Strahlung und teilweise durch Konvektion an den Raum abgegeben.

[bold]Vorteile[/bold]
Flache Bauweise, platzsparend
Geringer Wasserbedarf

[bold]Nachteile[/bold]:
Hohe Vorlauftemperatur nötig
Niedriger Konvektionsanteil',4,NULL);
INSERT INTO "SubchapterContent" VALUES (356,43,'[subheading]Bad-Heizkörper[/subheading]

[bold]Funktionsweise[/bold]
Bad-Heizkörper bestehen aus waagerechten Stahlrohren, die durch warmes Wasser beheizt werden. 
Sie dienen gleichzeitig als Handtuchhalter und Raumheizung.

[bold]Vorteile[/bold]
Praktisch zum Trocknen von Handtüchern
Ästhetisch ansprechend
Gute Heizleistung für kleinere Räume

[bold]Nachteile[/bold]:
Begrenzte Heizleistung für größere Räume
Oft teurer in der Anschaffung
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (357,43,'[subheading]Konvektoren[/subheading]

[bold]Funktionsweise[/bold]
Konvektoren bestehen aus Rohren, die von Lamellen umgeben sind. 
Die Luft zirkuliert durch die Lamellen, wird erwärmt und im Raum verteilt, hauptsächlich durch Konvektion.

[bold]Vorteile[/bold]
Geringes Wasservolumen
Schnelle Erwärmung des Raumes
Platzsparend

[bold]Nachteile[/bold]:
Weniger Strahlungswärme
Höherer Stromverbrauch bei Modellen mit Ventilator
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (358,43,'[subheading]Unterflur-Konvektoren[/subheading]

[bold]Funktionsweise[/bold]
Unterflur-Konvektoren werden im Boden, meist direkt vor großen Fensterflächen, eingebaut. 
Sie funktionieren, indem sie die kalte Luft, die durch das Fenster hereinkommt, aufnehmen und durch den Konvektor erwärmen, bevor sie in den Raum gelangt. 
Dadurch wird verhindert, dass kalte Zugluft den Raum abkühlt. 
Ein Gitter, das den Konvektor abdeckt, sorgt dafür, dass die warme Luft gleichmäßig nach oben strömt.

[bold]Vorteile[/bold]
Unauffällige Installation im Boden
Ideal für große Fensterfronten, da sie Kaltluft abfangen
Kann mit einem Gebläse für stärkere Wärmeleistung ausgestattet werden

[bold]Nachteile[/bold]:
Höherer Installationsaufwand
Teurer als herkömmliche Heizkörper
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (359,43,'[subheading]Ventilator-Konvektoren[/subheading]

[bold]Funktionsweise[/bold]
Ventilator-Konvektoren nutzen einen eingebauten Ventilator, der warme Luft aktiv in den Raum bläst. 
Dadurch wird eine bessere und schnellere Wärmeverteilung erzielt.

[bold]Vorteile[/bold]
Sehr effiziente Wärmeverteilung
Geeignet für große Räume
Kann auch zur Kühlung eingesetzt werden

[bold]Nachteile[/bold]:
Höherer Energieverbrauch
Geräuschentwicklung durch den Ventilator',9,NULL);
INSERT INTO "SubchapterContent" VALUES (360,43,'[subheading]Einführung in Systeme zur Raumbeheizung[/subheading]

Heizsysteme sind fest installierte Einrichtungen, die Wärme an den Raum abgeben, um eine angenehme Temperatur zu gewährleisten. 
Es gibt verschiedene Typen von Heizkörpern und Heizsystemen, die sich in Form, Material und Funktionsweise unterscheiden. 
Je nach Bauweise und Einsatzbereich bringt jede Art von Heizsystem spezifische Vor- und Nachteile mit sich.

Im Heizkreislauf spielt das erwärmte Wasser eine zentrale Rolle. Der sogenannte Vorlauf transportiert das warme Wasser vom Wärmeerzeuger – wie einem Heizkessel, einer Wärmepumpe oder einer Solaranlage – zu den Wärmeverbrauchern. 

Zu den Wärmeverbrauchern gehören alle Geräte, die die produzierte Wärme an den Raum abgeben, wie z. B. Heizkörper, Wärmetauscher oder Fußbodenheizungen. 
Das abgekühlte Wasser fließt dann über den Rücklauf zurück zum Wärmeerzeuger, um erneut erhitzt und in den Kreislauf zurückgeführt zu werden.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (361,43,'[subheading]Flächenheizungen[/subheading]

Flächenheizungen nutzen große Flächen wie den Boden oder Wände, um die Wärme gleichmäßig im Raum zu verteilen. 
Diese Systeme sind unsichtbar verbaut und bieten eine sanfte, gleichmäßige Wärme, die sich gut für moderne Bauweisen eignet.',10,NULL);
INSERT INTO "SubchapterContent" VALUES (362,43,'[subheading]Warmwasser-Fußbodenheizungen[/subheading]

[bold]Funktionsweise[/bold]
Bei Warmwasser-Fußbodenheizungen wird warmes Wasser durch in den Boden verlegte Rohre geleitet. 
Diese Rohre bestehen meist aus Polyethylen (PE) oder Polypropylen (PP). 
Die Wärme wird gleichmäßig über die Bodenfläche an den Raum abgegeben.

[bold]Vorteile[/bold]
Hygienisch, da keine sichtbaren Heizkörper erforderlich sind
Hoher Komfort durch gleichmäßige Wärme
Geringe Staubaufwirbelung, ideal für Allergiker

[bold]Nachteile[/bold]:
Hohe Anschaffungskosten
Regelmäßige Wartung erforderlich, um Korrosion zu verhindern',11,'');
INSERT INTO "SubchapterContent" VALUES (363,43,'[subheading]Verlegung der Heizrohre[/subheading]

Die Heizrohre werden spiralförmig oder schlangenförmig verlegt. 

Der Verlegeabstand kann je nach Bedarf variieren:
In Randzonen (Nähe von Fenstern) beträgt der Abstand 5-10 cm
In Aufenthaltszonen (weiter weg von Fenstern) 15-30 cm
Diese engere Verlegung in Randzonen hilft, Wärmeverluste durch Fenster zu vermeiden.',12,NULL);
INSERT INTO "SubchapterContent" VALUES (364,43,'[subheading]Heizkreise und Heizkreisverteiler[/subheading]

Jede Fußbodenheizung ist in mehrere Heizkreise unterteilt, die durch einen Verteiler miteinander verbunden sind. 
Jeder Heizkreis erhält warmes Wasser aus dem Heizsystem. Thermostate sorgen für eine gleichmäßige Raumtemperatur. 
Der Heizkreisverteiler regelt den Volumenstrom des Wassers und passt die Leistung an die Heizanforderungen an.',13,'');
INSERT INTO "SubchapterContent" VALUES (365,43,'[subheading]Heizestriche und Zementestriche[/subheading]

[bold]Heizestrich[/bold]
Der Heizestrich muss mindestens 45 mm dick sein, um die Heizrohre ausreichend zu bedecken. 
Der Estrich schützt die Rohre und verteilt die Wärme gleichmäßig auf den Bodenbelag.

[bold]Zementestrich[/bold]
Ein Zementestrich besteht aus Zement, Sand, Wasser und Zusatzmitteln. 
Diese Mischung sorgt für Stabilität und Flexibilität, um Risse während des Trocknens zu vermeiden.',14,'');
INSERT INTO "SubchapterContent" VALUES (366,43,'[subheading]Nassverlegesysteme[/subheading]

Bei diesem System werden die Heizrohre in den frischen Estrich eingebettet. 
Der Estrich dient nicht nur als Schutz, sondern auch zur Verankerung der Heizrohre. 
Durch die direkte Verbindung zwischen den Rohren und dem Estrich entsteht eine gleichmäßige Wärmeverteilung.',15,'');
INSERT INTO "SubchapterContent" VALUES (367,43,'[subheading]Trockensysteme[/subheading]

Beim Trockensystem werden die Heizrohre in vorgefertigte Hohlräume im Boden verlegt. 
Diese Hohlräume sind mit Kunststoffen oder Blechen abgedeckt. 
Im Gegensatz zu Nasssystemen müssen die Rohre nicht von Estrich bedeckt werden, wodurch sie schneller reagieren und weniger Energie benötigen.',16,NULL);
INSERT INTO "SubchapterContent" VALUES (368,44,'[heading]Berechnung der Raumbeheizung[/heading]

[LF_7_Berechnung_welcome]
Bei der Raumbeheizung ist es wichtig, die benötigte Heizlast und Wärmeleistung genau zu berechnen. 
In diesem Abschnitt werden wir die Norm-Wärmeleistung, Umrechnungsfaktoren sowie die Berechnung von Heizkörpern und Fußbodenheizungen Schritt für Schritt erklären.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (369,44,'[subheading]Norm-Wärmeleistung und Umrechnungsfaktoren[/subheading]

[bold]Norm-Wärmeleistung[/bold]
Die Norm-Wärmeleistung eines Heizkörpers wird durch die Differenz zwischen Vorlauf-, Rücklauf- und Raumtemperatur bestimmt. 
Sie gibt die Wärmeleistung an, die der Heizkörper bei Standardbedingungen abgibt. 
Die Berechnung erfolgt anhand folgender Formel:

Formel

Erklärung

Rechenbeispiel:
Wenn die Vorlauftemperatur 75 °C, die Rücklauftemperatur 65 °C und die Raumtemperatur 20 °C beträgt, ist die wirksame Übertemperatur:',2,NULL);
INSERT INTO "SubchapterContent" VALUES (370,44,'[bold]Umrechnungsfaktoren[/bold]

Die Umrechnungsfaktoren (𝑓𝑟) dienen dazu, die tatsächliche Heizkörperleistung bei abweichenden Temperaturen von den Standardbedingungen zu ermitteln. 
Sie werden für verschiedene Temperaturkombinationen bereitgestellt und müssen in die Berechnungen der Heizleistung einfließen.

Formel:

Rechenbeispiel:',3,NULL);
INSERT INTO "SubchapterContent" VALUES (371,44,'[subheading]Berechnung von Heizkörpern[/subheading]

[bold]Flachheizkörper nach Länge berechnen[/bold]
Flachheizkörper werden in der Regel nach ihrer Länge berechnet. 
Die Norm-Wärmeleistung (𝑞𝑛) pro Meter Länge wird mit der Heizkörperlänge multipliziert.

Formel

Erklärung

Rechenbeispiel',4,NULL);
INSERT INTO "SubchapterContent" VALUES (372,44,'[bold]Gliederheizkörper nach Gliedern berechnen[/bold]
Gliederheizkörper werden auf Basis der Anzahl der Glieder berechnet. 
Jedes Glied hat eine Norm-Wärmeleistung (𝑞𝑛), die multipliziert mit der Anzahl der Glieder die Gesamtleistung ergibt.

Formel

Erklärung

Rechenbeispiel',5,NULL);
INSERT INTO "SubchapterContent" VALUES (373,44,'[bold]Stahlheizkörper nach Gliedern und Länge berechnen[/bold]
Für Stahlrohr-Radiatoren wird sowohl die Anzahl der Glieder als auch die Länge des Heizkörpers berücksichtigt. 
Die Norm-Wärmeleistung (𝑞𝑛) je Glied und Meter Länge wird multipliziert, um die Gesamtheizleistung zu berechnen.

Formel

Erklärung

Rechenbeispiel',6,NULL);
INSERT INTO "SubchapterContent" VALUES (374,44,'[subheading]Berechnung bei Fußbodenheizung[/subheading]

[bold]Rohrbedarf ermitteln[/bold]
Der Rohrbedarf für eine Fußbodenheizung hängt von der Verlegeart (schlangen- oder spiralförmig) und dem Verlegeabstand ab. 

Formel

Erklärung

rechenbeispiel',7,NULL);
INSERT INTO "SubchapterContent" VALUES (375,44,'[bold]Fußbodenoberflächentemperatur[/bold]
Die Oberflächentemperatur Of hängt  von der Wassertemperatur, der Wärmeleistung und dem Wärmedurchlasswiderstand des Estrichs und Bodenbelags ab.
. Maximale Oberflächentemperaturen sind je nach Raumnutzung unterschiedlich: 
Aufenthaltszonen dürfen maximal 29 °C erreichen, in Bädern sind 33 °C erlaubt.

Formel

Erklärung

Rechenbeispiel',8,NULL);
INSERT INTO "SubchapterContent" VALUES (376,44,'[bold]Wärmeleistung der Fußbodenheizung[/bold]

Die Wärmeleistung der Fußbodenheizung hängt von der mittleren Wassertemperatur, der Raumtemperatur und der Oberflächentemperatur ab. 

Formel

Erklärung

Rechenbeispiel',9,NULL);
INSERT INTO "SubchapterContent" VALUES (377,44,'Die Wärmestromdichte q gibt an, wie viel Wärme pro Fläche abgegeben wird. 

Formel

Erklärung

Rechenbeispiel',10,NULL);
INSERT INTO "SubchapterContent" VALUES (378,45,'[heading]Zweirohr- und Einrohrheizungen[/heading]

[LF_7_Rohrheizung_welcome]

Zweirohr- und Einrohrheizungen sind die gängigsten Systeme zur Verteilung von Heizungswasser in Gebäuden. 
Sie unterscheiden sich in der Art, wie das Heizwasser zu den Heizkörpern geleitet und wieder zurückgeführt wird.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (379,45,'[subheading]Zweirohrheizung[/subheading]

Bei der Zweirohrheizung gibt es für jeden Heizkörper eine separate Vorlauf- und Rücklaufleitung. 
Jeder Heizkörper wird direkt mit Heizwasser versorgt, und das abgekühlte Wasser fließt separat zurück.

[bold]Vorteile[/bold]
Jeder Heizkörper bekommt die gleiche Vorlauftemperatur, unabhängig von der Position im System.
Gleichmäßige Wärmeverteilung im gesamten Gebäude.
Besserer hydraulischer Abgleich und Regelbarkeit.

[bold]Nachteile[/bold]
Höherer Installationsaufwand durch doppelte Rohrleitungen.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (380,45,'[subheading]Einrohrheizung[/subheading]

Bei der Einrohrheizung fließt das Heizungswasser durch eine einzige Leitung. 
Jeder Heizkörper ist in diese Leitung eingebunden und nimmt nur einen Teil des Heizwassers auf, der Rest fließt weiter zum nächsten Heizkörpe

[bold]Vorteile[/bold]
Geringerer Installationsaufwand, da nur eine Leitung benötigt wird.
Platzsparend und kostengünstig.
Besonders geeignet für einfache, kleinere Systeme.

[bold]Nachteile[/bold]
Die Vorlauftemperatur sinkt mit jedem Heizkörper, was zu ungleichmäßiger Wärmeverteilung führen kann.
Schwieriger hydraulisch abzugleichen.
Weniger effiziente Wärmeverteilung in größeren Gebäuden.
[LF_7_Rohrverlegung_Einrohrheizung_zoom]
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (381,45,'[subheading]Verteilungsarten[/subheading]

In Heizsystemen gibt es verschiedene Möglichkeiten, wie das Heizungswasser zu den Heizkörpern geleitet wird. 
Die Wahl der Verteilungsart hängt von der Bauweise und den spezifischen Anforderungen des Gebäudes ab.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (382,45,'[bold]Untere Verteilung[/bold]

Bei der unteren Verteilung werden die Vor- und Rücklaufleitungen im Untergeschoss oder Keller verlegt. 
Diese Leitungen führen dann zu den einzelnen Heizkörpern oder Heizsträngen, die sich in den darüber liegenden Etagen befinden.

Vorteile:
Einfacher Zugang zu den Rohrleitungen.
Weniger Platzbedarf in den Etagen.
Leichte Wartung.
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (383,45,'[bold]Obere Verteilung[/bold]

Bei der oberen Verteilung werden die Vorlaufleitungen im Dachgeschoss oder an der Decke verlegt und führen von dort aus zu den Heizkörpern in den darunterliegenden Etagen.

Vorteile:
Platzsparend in älteren Gebäuden, wo keine Bodenleitungen möglich sind.
Kann in abgehängten Decken versteckt werden.

Nachteile:
Schwerkraftheizung kann für ungleichmäßige Wärmeverteilung sorgen.
Aufwendiger bei der Installation in neuen Gebäuden.
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (384,45,'[bold]Zentrale Verteilung[/bold]

Die zentrale Verteilung nutzt eine zentrale Pumpe oder Verteilereinheit, um das Heizwasser zu den einzelnen Heizkörpern oder Heizkreisen zu leiten. 
Das System kann mit einem Verteiler im Keller oder Technikraum arbeiten, von dem aus die Heizstränge zu den verschiedenen Bereichen des Gebäudes führen.

Vorteile:
Effiziente Wärmeverteilung durch zentrale Regelung.
Gute Steuerbarkeit der einzelnen Heizkreise.

Nachteile:
Höherer Installationsaufwand bei der Verlegung der zentralen Leitungen.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (385,46,'[heading]Heizungspumpe[/heading]

[LF_7_Heizungspumpe_welcome]

Heizungspumpen bewegen das Heizungswasser durch das System und beeinflussen die Effizienz und Funktionsweise der gesamten Heizungsanlage.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (386,46,'[subheading]Arten von Heizungspumpen[/subheading]

Es gibt zwei Haupttypen von Heizungspumpen, die in modernen Heizungsanlagen verwendet werden:

[bold]Nassläuferpumpen[/bold]
Das Pumpengehäuse ist von Wasser durchströmt, wodurch die Lager und der Rotor gekühlt werden.
Besonders leise im Betrieb, da keine Wellenabdichtung erforderlich ist.
Geringere Effizienz im Vergleich zu Trockenläuferpumpen, aber einfacher in der Wartung.

[bold]Trockenläuferpumpen[/bold]
Das Pumpengehäuse ist trocken, nur der Rotor kommt mit Wasser in Kontakt.
Sie sind effizienter als Nassläuferpumpen, da kein Reibungsverlust durch Wasser entsteht.
Häufiger in größeren Anlagen verwendet, da sie größere Wassermengen bewältigen können.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (387,46,'[subcheading]Berechnung der Pumpenleistung[subheading]

Die Pumpenleistung gibt an, wie viel Wasser pro Zeiteinheit durch das Heizsystem gepumpt werden kann. 

Formel

Erklärung

Rechenbeispiel',3,NULL);
INSERT INTO "SubchapterContent" VALUES (388,46,'[subheading]Einfluss der Drehzahl auf die Pumpenleistung[/subheading]

Die Drehzahl der Pumpe beeinflusst direkt die Pumpenleistung. 
Die folgende Formel zeigt den Zusammenhang zwischen der Drehzahländerung und der neuen Pumpenleistung:

Formel

Erklärung

Rechenbeispiel',4,NULL);
INSERT INTO "SubchapterContent" VALUES (389,47,'[heading]Hydraulischer Abgleich[/heading]

[LF_7_Hydraulischer_Abgleich_welcome]

Der hydraulische Abgleich sorgt dafür, dass das Heizungswasser gleichmäßig im gesamten System verteilt wird. 
Dies stellt sicher, dass jeder Heizkörper nur die benötigte Menge an Wärmeenergie erhält, um den Raum effizient zu beheizen.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (390,47,'[subheading]Möglichkeiten des hydraulischen Abgleichs[/subheading]

Es gibt verschiedene Wege, den hydraulischen Abgleich durchzuführen:

[bold]Voreinstellbare Thermostatventile[/bold]
Diese Ventile erlauben es, die maximale Durchflussmenge zu begrenzen und den Druckverlust für jeden Heizkörper individuell anzupassen. 
Sie sorgen dafür, dass das Heizungswasser gleichmäßig auf die Heizkörper verteilt wird.

[bold]Einstellbare Rücklaufverschraubungen[/bold]
Diese wirken wie voreinstellbare Thermostatventile, können jedoch im Rücklauf des Heizkörpers installiert werden. 
Sie ermöglichen eine Feinjustierung des Wassermassenstroms, indem der Rücklauf begrenzt wird.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (391,47,'[subheading]Warum ist der hydraulische Abgleich wichtig?[/subheading]

Ein korrekt durchgeführter hydraulischer Abgleich:

[bold]Verbessert die Energieeffizienz[/bold]
Durch den optimalen Abgleich des Wasserdurchflusses wird sichergestellt, dass jeder Heizkörper genau die benötigte Wärmemenge erhält, was den Energieverbrauch senkt.

[bold]Vermeidet Druckverluste[/bold]
Heizkörper, die am weitesten vom Heizkessel entfernt sind, profitieren, da Druckverluste im System minimiert werden.

[bold]Reduziert Heizkosten[/bold]
Ein effizient eingestelltes System benötigt weniger Energie, was die Heizkosten senkt.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (392,48,'[heading]Heizkörperanschlüsse[/heading]

Heizkörperanschlüsse regeln den Wasserdurchfluss im Heizsystem und steuern die Heizkörperleistung. 
Dazu gehören Thermostatventile und verschiedene Arten von Verschraubungen, die für den Anschluss an das Heizsystem erforderlich sind.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (393,48,'[subheading]Thermostatventile[/subheading]

Thermostatventile steuern automatisch den Wasserdurchfluss in Abhängigkeit von der Raumtemperatur. 

Wenn die eingestellte Temperatur erreicht ist, verringert sich der Wasserstrom zum Heizkörper, um die gewünschte Raumtemperatur zu halten.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (394,48,'[subheading]Arten von Thermostatventilen[/subheading]

[bold]Durchgangsventil[/bold
Für geradlinige Anschlüsse.

[bold]Eckventil[/bold]
Ermöglicht eine 90-Grad-Verbindung.

[bold]Axialventil[/bold]
Für den Einsatz bei seitlich ausgerichteten Anschlüssen.

[bold]Winkel-Eckventil[/bold]
Kombiniert Eck- und Axialfunktionen für kompliziertere Installationen.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (395,48,'[subheading]Funktion der Thermostatventile[/subheading]

Thermostatventile arbeiten über einen Fühlmechanismus, der auf Temperaturveränderungen reagiert. 

Wenn die Raumtemperatur steigt, schließt sich das Ventil durch den Druck eines Dehnmediums und stoppt den Heizwasserdurchfluss. 
Bei sinkenden Temperaturen öffnet sich das Ventil wieder und lässt warmes Wasser in den Heizkörper strömen.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (396,48,'[subheading]Heizkörperverschraubungen[/subheading]

Heizkörperverschraubungen, wie die einstellbaren Rücklaufverschraubungen, sind entscheidend, um den Wasserdurchfluss präzise zu regulieren. 

Sie ermöglichen es, den Massenstrom des Heizungswassers anzupassen und so eine optimale Wärmeverteilung sicherzustellen. 

Einstellbare Verschraubungen bieten darüber hinaus Flexibilität in der Installation und Wartung.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (397,49,'[heading]Rohrleitungsberechnung[/heading]

Die Dimensionierung des Rohrnetzes in einem Heizsystem beeinflusst, wie das Heizwasser zu den Heizkörpern gelangt. 
In den folgenden Slides werden wir die Berechnungen und Dimensionierungsfaktoren kennenlernen, die für die optimale Gestaltung des Systems relevant sind.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (398,49,'[subheading]Berechnung des Massestrom[/subheading]

Der Massestrom wird bestimmt, um die Menge an Wasser zu berechnen, die pro Zeiteinheit durch das System fließt. 
Dieser Wert ist abhängig von der Wärmeleistung Q, der spezifischen Wärmekapazität c, und der Temperaturdifferenz Δ0.

Formel

Erklärung


Rechenbeispiel',2,NULL);
INSERT INTO "SubchapterContent" VALUES (399,49,'[subheading]Berechnung des Druckverlust[/subheading]

Der Druckverlust in einer Rohrleitung ergibt sich durch die Summe der Widerstände im Rohrnetz. 
Dabei spielen sowohl die Länge der Rohrleitung als auch Einzelwiderstände wie Bögen und Ventile eine Rolle.

Formel

Erklärung


Rechenbeispiel',3,NULL);
INSERT INTO "SubchapterContent" VALUES (400,49,'[subheading]Dimensionierung der Rohrleitungen[/subheading]

Die Dimensionierung der Rohrleitungen bezieht sich auf die Auswahl des Rohrdurchmessers und der Rohrlänge, um einen optimalen Wasserfluss zu gewährleisten. 
Typische Werte für Druckgefälle und Fließgeschwindigkeiten können im Tabellenbuch nachgeschlagen werden, um die benötigte Rohrgröße zu bestimmen. 
Der Rohrdurchmesser Dkann mit der folgenden Formel berechnet werden:

Formel

Erklärung

Rechenbeispiel',4,NULL);
INSERT INTO "SubchapterContent" VALUES (401,49,'[subheading]Berechnung von Teilleitungen[/subheading]

Ein Rohrnetz besteht oft aus mehreren Teilleitungen, die jeweils eigene Druckverluste aufweisen. 
Die Gesamtdruckverluste setzen sich aus den Teilstücken zusammen. 
Die Berechnung erfolgt individuell für jede Strecke und summiert sich zu einem Gesamtdruckverlust, der bei der Pumpenauswahl berücksichtigt wird.

Formel

Erklärung

Rechenbeispiel',5,NULL);
INSERT INTO "SubchapterContent" VALUES (402,50,'[heading]Prüfung und Inbetriebnahme[/heading]

Bevor eine Heizungsanlage genutzt wird, werden verschiedene Prüfungen durchgeführt, um sicherzustellen, dass das System ordnungsgemäß funktioniert. 
Diese Schritte tragen dazu bei, dass die Anlage zuverlässig und sicher arbeitet.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (403,50,'[subheading]Dichtheitsprüfung[/subheading]

Bei der Dichtheitsprüfung wird das Heizsystem unter erhöhtem Druck getestet, um sicherzustellen, dass keine Leckagen an den Verbindungen oder Rohren auftreten. 
Dies verhindert mögliche Wasserschäden oder Systemausfälle. 
Ein detailliertes Protokoll dokumentiert den Prüfverlauf und die Ergebnisse.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (404,50,'[subheading]Wasserqualität (Korrosionsschutz und Steinbildung)[/subheading]

Die Qualität des Heizungswassers beeinflusst die Langlebigkeit und Effizienz der Anlage.

Korrosionsschutzmittel und die Vermeidung von Steinbildung sind notwendig, um Schäden und Effizienzverluste zu vermeiden. 

Je nach Wasserhärte sind spezielle Maßnahmen zur Enthärtung oder Zugabe von Inhibitoren erforderlich.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (405,50,'[subheading]Dokumentation der Inbetriebnahme[/subheading]

Nach der Inbetriebnahme einer Heizungsanlage ist die Dokumentation entscheidend. Es werden folgende Punkte festgehalten:

Testergebnisse der Dichtheitsprüfung
Messdaten zur Wasserqualität (pH-Wert, Härtegrad, Korrosionsschutzmaßnahmen)
Protokolle zur Befüllung und Entlüftung der Anlage
Verwendete Materialien und Einstellungen (z. B. Korrosionsschutzmittel, Thermostat- und Ventileinstellungen)
Vermerke über durchgeführte Reparaturen oder Anpassungen
Sicherheitsüberprüfungen, die die Einhaltung der Normen bestätigen',4,NULL);
INSERT INTO "SubchapterContent" VALUES (406,51,'[heading]Berechnung der Wärmeenergie[/heading]

Die Berechnung der Wärmeenergie dient dazu, die erforderliche Energiemenge für die Erwärmung eines Raumes festzulegen. 
Dabei werden Faktoren wie die spezifische Wärmekapazität und die Wärmeleistung berücksichtigt.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (407,51,'[subheading]Einheiten[/subheading]

Die grundlegenden Einheiten in der Wärmeberechnung sind:

Wärmemenge Q in Joule (J) oder Kilowattstunden (kWh)
Leistung P in Watt (W)
(1 W = 1 J/s)
Temperaturdifferenz ΔT in Kelvin (K)

Diese Einheiten werden für die Berechnungen der benötigten Wärmeenergie genutzt.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (408,51,'[subheading]Spezifische Wärmekapazität[/subheading]

Die spezifische Wärmekapazität c gibt an, wie viel Energie benötigt wird, um die Temperatur von 1 kg eines Stoffes um 1 K zu erhöhen. 
Die spezifische Wärmekapazität von Wasser beträgt beispielsweise 4,19 kJ/kg·K.

Formel

Erklärung
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (409,51,'[subheading]Wärmeleistung (U-Wert)[/subheading]

Der U-Wert beschreibt den Wärmestrom durch ein Bauteil pro Quadratmeter Fläche bei einer Temperaturdifferenz von 1 K. 
Je niedriger der U-Wert, desto besser ist die Dämmung.

Formel

Erklärung:
Q die Wärmeleistung ist,

U der U-Wert des Materials,

A die Fläche in Quadratmetern,

ΔT die Temperaturdifferenz in K.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (410,51,'[subheading]Heizkörperberechnung[/subheading]

Für die Berechnung der erforderlichen Heizkörpergröße wird die Formel der Wärmeleistung verwendet. 
Diese hängt von der Raumgröße, der benötigten Temperatur und dem Wärmedurchgangskoeffizienten ab.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (411,51,'[subheading]Beispielrechnung Wärmeenergie[/subheading]

Um die benötigte Wärmeenergie für den Raum zu berechnen, werden alle zuvor genannten Faktoren zusammengeführt. 
Mithilfe der bekannten Werte für den U-Wert, die Fläche und die Temperaturdifferenz kann die Wärmemenge bestimmt werden.

Formel

erklärung

Rechenbeispiel

Dieses Ergebnis zeigt die Menge an Wärmeenergie, die erforderlich ist, um den Raum auf der gewünschten Temperaturdifferenz zu halten.
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (413,9,'[subheading]Bohrerarten[/subheading]

Beim Bohren gibt es verschiedene Bohrertypen, die jeweils für unterschiedliche Materialien geeignet sind:

[section]Steinbohrer[/section] 
Ideal für harte Materialien wie Beton.

[section]Metallbohrer[/section]
Geeignet für weiche und harte Metalle.
[LF_2_Bohrerarten_1_zoom]
[section]Holzbohrer[/section]
Perfekt für Holzarbeiten, mit einer Zentrierspitze für präzise Löcher.
[LF_2_Bohrerarten_2_zoom]
[section]Keramikbohrer[/section]
Für extrem harte keramische Materialien wie Fliesen und Keramik. 
Sorgt für saubere Löcher ohne die Gefahr, das Material zu beschädigen.

[frame]Beim Bohren wird das Material durch die Drehbewegung und die Vorschubkraft (die Kraft, die nach vorne wirkt) entfernt, wodurch ein präzises Loch entsteht.[/frame]',2,NULL);
INSERT INTO "SubchapterContent" VALUES (414,52,'[heading]Werkstoffkunde Sanitärausstattung[/heading]

In der Sanitärtechnik werden viele verschiedene Werkstoffe verwendet, um sicherzustellen, dass Hygiene und Langlebigkeit gewährleistet sind. 
Auf den nächsten Slides schauen wir uns die wichtigsten Materialien und ihre Einsatzmöglichkeiten genauer an.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (415,52,'[subheading]Werkstoffe für Sanitär-Gegenstände[/subheading]

Sanitär-Gegenstände bestehen meist aus harten Oberflächen, die leicht zu reinigen und desinfizieren sind. 

Sie müssen abriebfest und beständig gegen chemische Reinigungsmittel sein.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (416,52,'[subheading]Keramische Werkstoffe - Porzellan[/subheading]

Porzellan wird aus Ton, Quarz und Feldspat hergestellt. 

Es wird bei sehr hohen Temperaturen gebrannt und dann glasiert, um eine widerstandsfähige Oberfläche zu erhalten.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (417,52,'[subheading]Keramische Werkstoffe - Steinzeug[/subheading]

Steinzeug ist sehr hart und dicht. 

Es ist wasser- und frostbeständig, weshalb es oft in Labors oder Sanitäranlagen verwendet wird. 

Auch Abflüsse bestehen häufig aus Steinzeug.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (418,52,'[subheading]Metallische Werkstoffe - Edelstahl[/subheading]

Edelstahl wird wegen seiner Rostbeständigkeit in vielen Bereichen verwendet, z. B. für Spülbecken, Abflüsse und Küchenanwendungen. 

Es ist sehr hygienisch und langlebig.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (419,52,'[subheading]Kunststoffe - Acryl[/subheading]

Acryl wird oft für Badewannen, Duschwannen und Waschbecken verwendet. 

Es ist leicht, widerstandsfähig und in verschiedenen Farben erhältlich.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (420,52,'[subheading]PMMA (Acryl) in der Sanitärtechnik[/subheading]

PMMA (Polymethylmethacrylat) ist eine besondere Art von Acryl, die sich leicht formen lässt. 

Es wird für Waschbecken und andere Sanitärgegenstände verwendet.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (421,52,'[subheading]Verbundwerkstoffe - ABS[/subheading]

Verbundwerkstoffe wie ABS werden häufig für Duschköpfe und Armaturen verwendet. 

Sie sind robust und leicht, was sie ideal für Sanitäranwendungen macht.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (422,52,'[subheading]Acrylharze in der Sanitärtechnik[/subheading]

Acrylharze werden für hochwertige Waschbecken oder Badewannen verwendet. 

Sie haben eine glatte, pflegeleichte Oberfläche und sind widerstandsfähig gegen Kratzer.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (423,52,'[subheading]GFK (glasfaserverstärkter Kunststoff)[/subheading]

GFK (Glasfaserverstärkter Kunststoff) ist sehr robust und wird für Wasch- und Urinalbecken in öffentlichen Einrichtungen verwendet. 

Er ist besonders stabil und widerstandsfähig.',10,NULL);
INSERT INTO "SubchapterContent" VALUES (424,53,'[heading]Sanitärarmaturen[/heading]

Sanitärarmaturen sind in jedem Bad oder jeder Küche zu finden. 
Sie regulieren den Wasserfluss und haben verschiedene Funktionen, wie Absperren, Mischen oder Abfließen des Wassers. 

Wir schauen uns die verschiedenen Typen genauer an.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (425,53,'[subheading]Absperrarmaturen[/subheading]

Absperrarmaturen dienen dazu, den Wasserfluss komplett zu stoppen. 

Sie werden in der Hauptwasserleitung oder vor Geräten wie Waschmaschinen montiert, damit Reparaturen oder Wartungen durchgeführt werden können.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (426,53,'[subheading]Auslaufarmaturen[/subheading]

Auslaufarmaturen steuern den Wasserfluss, der aus einer Quelle kommt, z. B. einem Wasserhahn über einem Waschbecken. 

Sie werden in Badezimmern und Küchen verwendet, um den Wasserverbrauch zu regulieren.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (427,53,'[subheading]Ablaufarmaturen[/subheading]

Ablaufarmaturen leiten das verbrauchte Wasser ab. 

Sie sind in Waschbecken, Duschen und Badewannen zu finden und sorgen dafür, dass das Wasser sicher abfließt, ohne das System zu verstopfen.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (428,53,'[subheading]Einhebel-Mischarmaturen[/subheading]

Einhebel-Mischarmaturen mischen kaltes und warmes Wasser, wobei Temperatur und Wasserfluss mit nur einem Hebel gesteuert werden. 

Sie sind besonders benutzerfreundlich und weit verbreitet.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (429,53,'[subheading]Zweigriff-Mischarmaturen[/subheading]

Zweigriff-Mischarmaturen haben separate Griffe für kaltes und warmes Wasser. 

Sie bieten eine präzise Steuerung der Wassertemperatur, erfordern jedoch zwei Handgriffe.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (430,53,'[subheading]Thermostatarmaturen[/subheading]

Thermostatarmaturen sind Mischarmaturen, die die Temperatur des Wassers automatisch regulieren. 

Sie stellen sicher, dass die gewählte Temperatur konstant bleibt, auch wenn sich der Wasserdruck oder die Zulauftemperaturen ändern.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (431,53,'[section]Funktionsweise von Thermostatarmaturen[/section]

Thermostatarmaturen haben eine eingebaute Temperaturregelung, die das Wasser auf eine voreingestellte Temperatur bringt. 

Falls die Temperatur zu hoch ist, blockieren sie den Warmwasserfluss, um Verbrühungen zu verhindern.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (432,53,'[subheading]Selbstschließende Armaturen[/subheading]

Selbstschließende Armaturen schließen automatisch nach einer bestimmten Zeit oder nach dem Gebrauch. 

Sie werden oft in öffentlichen Bereichen eingesetzt, um Wasser zu sparen.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (433,53,'[subheading]Berührungslos gesteuerte Armaturen[/subheading]

Berührungslose Armaturen funktionieren mit Sensoren und sind besonders hygienisch. 

Sie fließen nur, wenn eine Hand unter die Armatur gehalten wird, und stoppen automatisch, wenn die Hand entfernt wird.',10,NULL);
INSERT INTO "SubchapterContent" VALUES (434,53,'[subheading]Mischarmaturen mit Lichtsteuerung[/subheading]

Mischarmaturen können auch mit Lichtsteuerungen ausgestattet sein. Durch einen Lichtstrahl wird das Wasser ausgelöst, wenn sich eine Person in der Nähe der Armatur befindet. 

Das spart Wasser und erhöht die Hygiene.
',11,NULL);
INSERT INTO "SubchapterContent" VALUES (435,54,'[heading]Fliesengerechte Installation[/heading]

Bei der fliesengerechten Installation wird darauf geachtet, dass Sanitärobjekte wie Waschbecken, WC und Badewannen korrekt platziert werden und die Fugen sauber verlaufen. 

So entsteht ein gleichmäßiges und optisch ansprechendes Gesamtbild.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (436,54,'[subheading]Auswahl der Fliesen[/subheading]

Die Auswahl der Fliesen spielt eine entscheidende Rolle für das Ergebnis. 

Die Größe der Fliesen bestimmt die Breite der Fugen, und das Material der Fliesen sollte zur Umgebung passen, um Langlebigkeit zu gewährleisten. 

Es ist wichtig, frühzeitig zu entscheiden, welche Fliesen verwendet werden, damit die weiteren Installationsschritte daran angepasst werden können.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (437,54,'[subheading]Maßlinien und Fliesenraster[/subheading]

Maßlinien und Fliesenraster unterstützen die exakte Platzierung von Sanitärobjekten. 

Fliesenraster helfen dabei, Abstände und Ausrichtungen zu messen, damit die Fliesen genau passen. 

Die Wandfläche wird in Raster aufgeteilt, um sicherzustellen, dass die Fliesen richtig positioniert und geschnitten werden können, falls nötig.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (438,54,'[subheading]Fliesen und Wandabstände[/subheading]

Sanitärobjekte wie Waschbecken oder Toiletten müssen korrekt zur Wand und zu den Fliesen ausgerichtet werden. 

Dies erfolgt nach einem Fliesenraster, das hilft, die Objekte symmetrisch zu positionieren. 

Die richtigen Wandabstände und Fliesen sorgen für ein harmonisches Fugenbild, wodurch ein gleichmäßiger Gesamteindruck entsteht.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (439,54,'[subheading]Fugenbreite und Fliesengröße[/subheading]

Die Fugenbreite richtet sich nach der Größe der Fliesen. 

Größere Fliesen erfordern in der Regel schmalere Fugen, um ein gleichmäßiges Erscheinungsbild zu erreichen. 

Kleinere Fliesen hingegen benötigen breitere Fugen, damit das Verlegemuster klar erkennbar bleibt und die Stabilität gewährleistet ist. 

Die Fugen sorgen auch dafür, dass sich die Fliesen bei Temperaturschwankungen ausdehnen können.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (440,54,'[subheading]Verlegung und Ausrichtung[/subheading]

Die richtige Verlegung der Fliesen ist von großer Bedeutung, da eine falsche Ausrichtung zu ungeraden Fugen und einem unprofessionellen Aussehen führen kann. 

Fliesen sollten in geraden Linien und symmetrisch zur Raumarchitektur verlegt werden, um sicherzustellen, dass sie harmonisch ins Gesamtbild passen. 

Fehler bei der Verlegung lassen sich später nur schwer korrigieren und sollten daher vermieden werden.

',6,NULL);
INSERT INTO "SubchapterContent" VALUES (441,54,'[subheading]Fliesengerechte Installation in Nassbereichen[/subheading]

In Nassbereichen wie Duschen und Badewannen müssen die Fliesen besonders sorgfältig verlegt werden. 

Die Abdichtung der Fugen ist hier besonders wichtig, um Wasserschäden und Schimmelbildung zu vermeiden. 

Silikonfugen dienen dazu, die Bereiche zwischen den Fliesen und den Sanitärobjekten abzudichten, damit keine Feuchtigkeit in die Wände eindringt.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (442,54,'[subheading]Abschluss der Installation[/subheading]

Nach der Verlegung der Fliesen werden die Fugen überprüft und, falls nötig, nachgearbeitet. 

Eine saubere Ausführung der Fugen und der Fliesenränder trägt maßgeblich zum Gesamtbild bei. 

Die Kanten sollten sorgfältig abgedichtet sein, damit Feuchtigkeit keine Schäden verursachen kann. 

Der abschließende Schritt ist die Reinigung der Fliesen, um überschüssige Materialien zu entfernen.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (443,55,'[heading]Sanitär-Gegenstände[/heading]

Sanitär-Gegenstände umfassen alle Elemente, die in Badezimmern zur täglichen Körperpflege genutzt werden. 
Dazu gehören Waschbecken, Toiletten, Bidets, Duschkabinen und Badewannen. 

Diese Gegenstände tragen zu Komfort und Hygiene bei und sind in verschiedenen Ausführungen erhältlich, um sich an unterschiedliche Raumgestaltungen anzupassen.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (444,55,'[subheading]Waschbecken[/subheading]

Waschbecken werden in verschiedenen Materialien wie Sanitärporzellan oder Acryl hergestellt und sind in diversen Formen und Größen verfügbar. 

Einzelwaschtische sind ideal für kleinere Räume, während Doppelwaschtische Platz für mehrere Personen bieten.

[section]Montagemöglichkeiten[/section]
[bold]Einbauwaschtische[/bold] 
Werden in Möbel integriert und sind platzsparend.

[bold]Aufsatzwaschtische[/bold] 
Werden auf Schränken montiert und bieten zusätzlichen Stauraum.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (445,55,'[section]Einbauwaschtische[/section]

Einbauwaschtische werden direkt in Badezimmermöbel integriert und bieten eine platzsparende Lösung. 

Sie sind in verschiedenen Größen und Materialien wie Acryl oder Edelstahl erhältlich. 

Einbauwaschtische lassen sich leicht reinigen und sorgen für eine moderne, nahtlose Optik im Badezimmer.

[frame]Einbauwaschtische bieten besonders in kleinen Bädern eine platzsparende und optisch ansprechende Lösung.[/frame]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (446,55,'[section]Aufsatzwaschtische[/section]

Aufsatzwaschtische werden auf Unterschränken montiert und bieten Stauraum unterhalb des Beckens. 

Diese Waschtische sind in vielen modernen Badezimmern zu finden und kombinieren Funktionalität und ansprechendes Design.
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (447,55,'[section]Waschtischsäulen[/section]

Waschtischsäulen werden unterhalb von freistehenden Waschtischen angebracht und verstecken die Anschlüsse für Wasser und Abfluss. 

Sie tragen zur Ästhetik bei und sorgen für ein aufgeräumtes Erscheinungsbild im Badezimmer.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (448,55,'[subheading]Badewannen[/subheading]

Badewannen gibt es in verschiedenen Materialien wie Acryl, Gusseisen oder emailliertem Stahl. 

Sie bieten Komfort und sind in unterschiedlichen Formen und Größen erhältlich. 

Badewannen können freistehend oder eingebaut installiert werden.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (449,55,'[section]Badewannengrößen und Volumen[/section]

Standardbadewannen haben Längen von 150 bis 180 cm, während das Volumen je nach Modell zwischen 150 und 300 Litern liegt. 

Kleinere Modelle sind platzsparend, während größere Wannen mehr Raum für Entspannung bieten.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (450,55,'[section]Badewannen-Armaturen[/section]

Badewannen-Armaturen werden entweder am Wannenrand oder an der Wand montiert. 

Mischarmaturen mit Handbrausen sind weit verbreitet und ermöglichen sowohl das Füllen der Wanne als auch das Duschen.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (451,55,'[section]Whirlpool-Badewannen[/section]

Whirlpool-Badewannen verfügen über Düsen, die Wasser und Luft vermischen und eine Massagewirkung erzielen. 

Sie bieten ein Wellness-Erlebnis zu Hause und können in verschiedenen Größen erworben werden.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (452,55,'[section]Ablaufarmaturen und Zubehör[/section]

Badewannen sind mit Überlaufventilen und Ablaufsiphons ausgestattet, um überlaufendes Wasser zu vermeiden. 

Zusätzliches Zubehör wie Haltegriffe und Wannenkissen bieten Komfort und Sicherheit.',10,NULL);
INSERT INTO "SubchapterContent" VALUES (453,55,'[subheading]Duschen[/subheading]

Duschen sind eine platzsparende Alternative zur Badewanne und werden häufig in kleinen Bädern installiert. 

Sie bestehen aus einer Duschwanne oder bodengleichen Duschflächen sowie einer Armatur zur Regulierung von Wasser und Temperatur.',11,NULL);
INSERT INTO "SubchapterContent" VALUES (454,55,'[section]Duschwannen[/section]

Duschwannen gibt es in verschiedenen Größen und Formen, von quadratischen Modellen bis hin zu rechteckigen Varianten. 

Flache Wannen erleichtern den Einstieg und eignen sich besonders für barrierefreie Bäder.',12,NULL);
INSERT INTO "SubchapterContent" VALUES (455,55,'[section]Duschabtrennungen[/section]

Duschabtrennungen verhindern das Spritzen von Wasser und tragen zur optischen Trennung im Bad bei. 

Sie bestehen aus feststehenden oder beweglichen Glaselementen und können mit Sicherheitsglas oder Kunststoff ausgestattet sein.

[bold]Optionen[/bold]
Feststehend oder beweglich.
Aus Sicherheitsglas oder Kunststoff.
',13,NULL);
INSERT INTO "SubchapterContent" VALUES (456,55,'[section]Duscharmaturen[/section]

Duscharmaturen regulieren Wassermenge und -temperatur. 

Einhebelmischer sind gängig, da sie einfach zu bedienen sind. 

Thermostatarmaturen halten die Wassertemperatur konstant. 

Brauseköpfe sind in verschiedenen Varianten erhältlich, darunter Regen- und Handbrausen.',14,NULL);
INSERT INTO "SubchapterContent" VALUES (457,55,'[section]Ablaufarmaturen und Montage[/section]

Ablaufarmaturen leiten das Duschwasser ab. Bei flachen Duschwannen liegt der Ablauf nahe dem Boden, um eine barrierefreie Entwässerung zu ermöglichen. 

Die Montagehöhe von Duschwannen beträgt normalerweise 150 bis 250 mm.',15,NULL);
INSERT INTO "SubchapterContent" VALUES (458,55,'[subheading]Handtuchhalter[/subheading]

Handtuchhalter sind in verschiedenen Formen und Größen erhältlich. 

Sie können an der Wand oder an Badezimmermöbeln befestigt werden und sorgen dafür, dass Handtücher immer griffbereit sind. 

Moderne Handtuchhalter sind oft beheizbar und tragen zur Trocknung der Handtücher bei.',16,NULL);
INSERT INTO "SubchapterContent" VALUES (459,55,'[subheading]Spiegelschränke[/subheading]

Spiegelschränke kombinieren Stauraum und Spiegel in einem Möbelstück. 

Sie bieten Platz für Pflegeartikel und verfügen oft über integrierte Beleuchtung und Steckdosen für elektrische Geräte wie Rasierer oder Zahnbürsten.',17,NULL);
INSERT INTO "SubchapterContent" VALUES (460,55,'[subheading]Klosettbecken[/subheading]

Klosettbecken, auch als WC bekannt, dienen der Entsorgung von Urin und Fäkalien. 

Es gibt Wand- und Standklosetts sowie unterschiedliche Spülsysteme wie die Zwei-Mengen-Spülung, die den Wasserverbrauch optimiert.',18,'');
INSERT INTO "SubchapterContent" VALUES (461,55,'[section]Klosettarten – Wand- vs. Standklosetts[/section]

Klosettbecken können in Wand- und Standklosetts unterteilt werden. 

Wandklosetts werden an der Wand befestigt und ermöglichen eine leichtere Reinigung des Bodens. 

Standklosetts hingegen stehen direkt auf dem Boden und sind einfacher zu installieren.

[bold]Vorteile von Wandklosetts[/bold]
Optisch ansprechender, da der Boden leichter zu reinigen ist.
Vorwandinstallationen sorgen für mehr Stabilität.

[bold]Vorteile von Standklosetts[/bold]
Einfachere Installation.
Ideal für ältere Gebäude oder Renovierungsprojekte.
',19,NULL);
INSERT INTO "SubchapterContent" VALUES (462,55,'[section]Zwei-Mengen-Spülung[/section]

Die Zwei-Mengen-Spülung ermöglicht es dem Benutzer, zwischen einer kleinen und einer großen Spülmenge zu wählen, um Wasser zu sparen. 

Diese Funktion ist besonders in modernen Badezimmern Standard und trägt erheblich zur Wassereffizienz bei.

[bold]Merkmale der Zwei-Mengen-Spülung[/bold]
Kleine Spülmenge: ca. 3 Liter für geringe Verschmutzung.
Große Spülmenge: ca. 6-9 Liter für stärkere Verschmutzung.
Spart bis zu 50% Wasser im Vergleich zu traditionellen Spülsystemen.
',20,NULL);
INSERT INTO "SubchapterContent" VALUES (463,55,'[section]Spülkastensysteme[/section]

Moderne Spülkästen haben ein Fassungsvermögen von 6 bis 9 Litern und sind entweder sichtbar oder unsichtbar hinter der Wand installiert. 

Unterputz-Spülkästen sind in modernen Badezimmern weit verbreitet, da sie ästhetisch ansprechend und platzsparend sind.

[bold]Typen von Spülkästen[/bold]
Unterputz-Spülkasten: Hinter der Wand versteckt, sorgt für eine cleane Optik.
Aufputz-Spülkasten: Sichtbar, einfacher zu installieren, besonders bei Renovierungen.
',21,NULL);
INSERT INTO "SubchapterContent" VALUES (464,55,'[section]Hygienespülungen[/section]

Hygienespülungen werden in öffentlichen Sanitäranlagen eingesetzt, um sicherzustellen, dass die Spülung automatisch nach jeder Benutzung erfolgt. 

Diese Spülsysteme sind berührungslos und tragen zur Hygiene und Wasserersparnis bei.

[bold]Funktionen der Hygienespülungen[/bold]
Berührungslose Spülung durch Sensoren.
Wasser wird nach jeder Benutzung automatisch nachgefüllt.
Reduziert Keimbildung und verbessert die Hygiene in öffentlichen Räumen.
',22,NULL);
INSERT INTO "SubchapterContent" VALUES (465,55,'[section] Pflege und Wartung von Klosettbecken[/section]

Klosettbecken sollten regelmäßig gereinigt werden, um Kalk- und Schmutzablagerungen zu vermeiden. 

Zudem sollten Dichtungen und Spülsysteme regelmäßig überprüft und gewartet werden, um einen reibungslosen Betrieb zu gewährleisten.

[bold]Pflege-Tipps[/bold]
Wöchentliche Reinigung mit geeigneten Reinigungsmitteln.
Kalkablagerungen mit Essigessenz oder speziellen Entkalkern behandeln.
Dichtungen und Spülsysteme jährlich kontrollieren und gegebenenfalls austauschen.
',23,NULL);
INSERT INTO "SubchapterContent" VALUES (466,55,'[section]Bidets[/section]

Bidets, auch Sitzwaschbecken genannt, sind für die Intimhygiene konzipiert. 

Sie bieten warmes und kaltes Wasser durch Mischarmaturen. 

In modernen Badezimmern werden sie oft neben dem WC installiert.',24,NULL);
INSERT INTO "SubchapterContent" VALUES (467,55,'[section]Spülkastensysteme[/section]',25,NULL);
INSERT INTO "SubchapterContent" VALUES (469,15,'[section]Weichlöten von Kupferrohren – Schritt für Schritt[/section]

Weichlöten ist eine einfache Methode, um Kupferrohre dauerhaft zu verbinden. 

Hier ist der Ablauf im Überblick:

[bold]Vorbereitung[/bold]
Rohr und Fitting gründlich reinigen, um Oxidation und Schmutz zu entfernen.

[bold]Flussmittel auftragen[/bold]
Das Flussmittel sorgt dafür, dass das Lot gleichmäßig fließt und Oxidation verhindert wird.

[bold]Erhitzen[/bold]
Rohr und Fitting gleichmäßig erhitzen, bis die richtige Temperatur erreicht ist.

[LF_3_Weichlöten_2_zoom]

[bold]Lötvorgang[/bold]
Das Lot schmilzt und wird durch Kapillarwirkung in die Verbindung gezogen.

[frame]Die Kapillarwirkung beschreibt, wie Flüssigkeiten in engen Spalten oder Röhren aufsteigen oder sich ausbreiten. Sie entsteht durch das Zusammenspiel von Adhäsion (zwischen Flüssigkeit und Oberfläche) und Kohäsion (zwischen den Molekülen der Flüssigkeit).[/frame]

[bold]Abkühlen lassen[/bold]
Nach dem Abkühlen entsteht eine stabile und dichte Verbindung.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (470,15,'[section]Radiale Pressverbindungen[/section]

[bold]Verfahren[/bold]
Bei radialen Pressverbindungen werden die Rohrenden und Fittings durch ein Presswerkzeug verformt. 

[LF_3_radial_kupfer_zoom]

Ein Dichtungsring, der in der Verbindung sitzt, wird dabei zusammengepresst, wodurch eine dichte und stabile Verbindung entsteht. 

Diese Technik wird bei Metall- und Kunststoffrohren eingesetzt.

[LF_3_radial_Kunststoff_zoom]
',8,'');
INSERT INTO "SubchapterContent" VALUES (471,15,'[section]Axiale Pressverbindungen[/section]

[bold]Verfahren[/bold]
Bei axialen Pressverbindungen wird in der Regel kein Dichtungsring verwendet. 

Eine Schiebehülse wird über den Fitting geschoben, und das Rohr wird so weit aufgeweitet, dass es darüber passt. 
[LF_3_axial_Kunststoff_zoom]
Anschließend wird die Schiebehülse mit einer Pressmaschine über das Rohr und den Fitting gepresst, was das Rohr dicht um den Fitting schließt.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (472,56,'[heading]Planung von Sanitärräumen[/heading]

[LF_8_Sanitärplanung_welcome]

Bei der Planung von Sanitärräumen spielen verschiedene Aspekte eine Rolle, darunter die Positionierung der Sanitärobjekte, die Abstände zwischen ihnen und die Bewegungsflächen. 

Diese Faktoren sorgen dafür, dass der Raum praktisch genutzt werden kann.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (473,56,'[subheading]Planungsgrundlagen für Sanitärräume[/subheading]

Bei der Planung von Sanitärräumen müssen mehrere Faktoren berücksichtigt werden. 
 
Dazu gehören bauliche Gegebenheiten wie der Grundriss und die Lage von Fenstern sowie die Anordnung der Sanitärobjekte. 
 
Geräuschbelastungen sollten vermieden und die Leitungswege so geplant werden, dass sie einfach verlaufen.',2,'');
INSERT INTO "SubchapterContent" VALUES (474,56,'[subheading]Stellflächen und seitliche Abstände[/subheading]

Sanitärgegenstände wie Toiletten, Waschbecken und Duschen benötigen ausreichend Stellfläche. 

Dabei sollten folgende Mindestabstände eingeplant werden:

Seitlicher Abstand zu einer Toilette: mindestens 20 cm
Seitlicher Abstand zu einem Waschbecken: mindestens 25 cm
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (475,56,'[subheading]Bewegungsflächen und Barrierefreiheit[/subheading]

Sanitärräume sollten genügend Bewegungsfreiheit bieten, damit sie leicht nutzbar sind. 

Die empfohlenen Bewegungsflächen:

Vor einem Waschbecken: mindestens 70 cm
Vor einer Toilette oder Dusche: mindestens 75 cm
In barrierefreien Bädern: mindestens 150 cm x 150 cm Bewegungsfläche
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (476,56,'[subheading]Lüftung und Heizung[/subheading]

Sanitärräume benötigen eine gute Belüftung, um Feuchtigkeit und Schimmelbildung zu verhindern. 

In Räumen ohne Fenster ist eine mechanische Lüftung vorgeschrieben. 

Für die Beheizung bieten sich Fußbodenheizungen oder Wandheizkörper an, die eine gleichmäßige Wärmeverteilung ermöglichen.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (477,56,'[subheading]Geräuschminderung und Schallschutz[/subheading]

Bei der Planung von Sanitärräumen sollte auch darauf geachtet werden, Geräusche durch sanitäre Anlagen zu reduzieren. 

Schalldämmungen bei der Installation und die Verwendung schallisolierender Materialien können helfen, Lärmbelästigungen zu minimieren, besonders in Mehrfamilienhäusern.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (478,57,'[heading]Vorwandinstallationen[/heading]

Vorwand-Installationen erleichtern die Montage von Rohrleitungen und Sanitärobjekten in Bädern. 

Hier erfährst du, wie durch vorgefertigte Systeme die Installation schneller und präziser wird.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (479,57,'[subheading]Was sind Vorwandinstallationen?[/subheading]

Vorwand-Installationen erleichtern die Planung von Sanitärräumen. 

Sie ermöglichen es, Versorgungsleitungen unsichtbar hinter Wänden zu verlegen und Sanitärobjekte an verschiedenen Positionen im Raum anzubringen.

Das führt zu einer besseren Raumnutzung, insbesondere in kleinen Badezimmern.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (480,57,'[subheading]Aufbau von Montagegerüsten[/subheading]

Montagegerüste bestehen aus Stahlrohren, die an Wand und Boden befestigt werden. 

Sie enthalten die Anschlüsse für Warm- und Kaltwasser sowie Abwasserleitungen. 

Zudem sind Halterungen für Sanitärobjekte vorinstalliert. 

Nach der Montage werden die Leitungen und Gerüste verdeckt, um den Raum für Fliesen oder andere Wandverkleidungen vorzubereiten.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (481,57,'[subheading]Installationsblöcke für Sanitärobjekte[/subheading]

Installationsblöcke bestehen aus Schaumstoffbeton oder Stahlblech und werden für die Montage von Sanitärobjekten wie WCs oder Waschbecken verwendet. 

Diese Blöcke enthalten bereits Anschlüsse für Warmwasser, Kaltwasser und Abwasser und sind bereit für die Verkleidung mit Putz oder Fliesen.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (482,57,'[subheading]Schallschutz durch Vorwand-Installationen[/subheading]

Durch den Einsatz schalldämmender Materialien in Vorwand-Installationen wird die Übertragung von Geräuschen auf benachbarte Räume reduziert. 

Befestigungsschellen und Anschlussleitungen werden häufig mit Dämpfungsmaterialien versehen, um die Geräuschentwicklung zu minimieren.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (483,58,'[heading]Flächen- und Fugendichtung in Sanitärräumen [/heading]


[LF_8_Dichtung_welcome]
In Sanitärräumen ist die Abdichtung von Flächen und Fugen entscheidend, um Feuchtigkeitsschäden zu vermeiden. 

In den kommenden Slides erfährst du, wie diese Abdichtungen durchgeführt werden und welche Bereiche besonders betroffen sind.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (484,58,'',2,'');
INSERT INTO "SubchapterContent" VALUES (485,58,'',3,NULL);
INSERT INTO "SubchapterContent" VALUES (486,58,'',4,NULL);
INSERT INTO "SubchapterContent" VALUES (487,4,'[subheading]Nichteisenmetalle[/subheading]

Nichteisenmetalle (NE-Metalle) enthalten kein Eisen und zeichnen sich häufig durch ihre leichte Bauweise und Korrosionsbeständigkeit aus. 

Dadurch eignen sie sich für Anwendungen in der Elektronik und im Fahrzeugbau. 

Wegen ihrer typischen Farben werden sie oft als Buntmetalle bezeichnet, wobei auch einige weiße Metalle dazugehören. 

Beispiele für Nichteisenmetalle sind Kupfer, Zink, Bronze und Messing.

[LF_1_NE_Metall]
',10,'');
INSERT INTO "SubchapterContent" VALUES (488,4,'[section]Dichte und Schmelzpunkt von Nichteisenmetallen[/section]

Nichteisenmetalle enthalten kein Eisen und sind oft leichter und korrosionsbeständiger als Eisenmetalle. 

Sie lassen sich weiter in Leichtmetalle und Schwermetalle unterteilen.

[bold]Leichtmetalle[/bold]
Metalle mit einer Dichte von weniger als 4,5 g/cm³, z. B. Aluminium und Magnesium. 
Sie sind leicht und stabil.

[bold]Schwermetalle[/bold]
Metalle mit einer höheren Dichte als 4,5 g/cm³, z. B. Kupfer und Zink. 
Diese Metalle sind robuster und schwerer.

',11,NULL);
INSERT INTO "SubchapterContent" VALUES (489,5,'[heading]Prüfen und Messen[/heading]

[LF_1_Prüfen_Messen_welcome]

Beim Messen und Prüfen werden Bauteile auf ihre Genauigkeit und Einhaltung von Anforderungen überprüft. 

Dabei kommen verschiedene Verfahren und Messinstrumente zum Einsatz, um präzise Ergebnisse zu erzielen.',1,'');
INSERT INTO "SubchapterContent" VALUES (490,4,'[heading]Werkstoffe[/heading]

Werkstoffe sind Materialien, die für die Herstellung und den Bau von Produkten eingesetzt werden. 

[LF_1_Werkstoffe_1]

Sie werden je nach ihren Eigenschaften, wie zum Beispiel Festigkeit, Korrosionsbeständigkeit oder Wärmeleitfähigkeit, ausgewählt.
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (491,4,'[section]Dichte und Schmelzpunkt von Metallen[/section]

Zwei wesentliche Eigenschaften von Metallen sind ihre Dichte und ihr Schmelzpunkt.

[bold]Dichte[/bold]
Gibt an, wie schwer ein Metall im Verhältnis zu seinem Volumen ist. 
Sie wird in Kilogramm pro Kubikmeter (kg/m³) gemessen.
[LF_1_Leichtmetalle]
[bold]Schmelzpunkt[/bold]
Beschreibt die Temperatur, bei der ein Metall flüssig wird. 
Diese Eigenschaften beeinflussen, wie Metalle verarbeitet und eingesetzt werden.
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (492,4,'[subheading]Metalle und ihre Eigenschaften[/subheading]

Metalle haben verschiedene physikalische und chemische Eigenschaften. 

Sie werden in vielen Bereichen aufgrund ihrer Festigkeit, Leitfähigkeit und Verarbeitungsfähigkeit verwendet. 

Eine grundlegende Unterscheidung wird zwischen Eisenmetallen und Nichteisenmetallen getroffen, da diese unterschiedliche Zusammensetzungen und Anwendungsgebiete haben.

Außerdem unterscheidet man Metalle nach ihrer Beständigkeit in edle und unedle Metalle:

[bold]Edle Metalle[/bold]
Edle Metalle, wie Gold und Silber, sind besonders korrosionsbeständig und reagieren kaum mit Sauerstoff. 
Sie finden oft in Schmuck und Elektronik Anwendung.
[LF_1_edle_Metalle]
[bold]Unedle Metalle[/bold]
Unedle Metalle, wie Eisen und Zink, sind weniger korrosionsbeständig, aber robust und wirtschaftlich. 
Sie werden oft in der Bau- und Installationstechnik eingesetzt.

',3,NULL);
INSERT INTO "SubchapterContent" VALUES (493,4,'[section]Kupfer[/section]

Kupfer ist ein Schwermetall, das für seine hervorragende elektrische Leitfähigkeit und Korrosionsbeständigkeit bekannt ist. 

Es wird häufig in Rohren und elektrischen Leitungen eingesetzt. 

Kupfer gilt als Funktionswerkstoff, der durch seine elektrischen, mechanischen und chemischen Eigenschaften in zahlreichen innovativen Technologien eine wichtige Rolle spielt. 

Wie Aluminium kann Kupfer unendlich oft recycelt werden, ohne Qualitätsverlust. 75 % des jemals produzierten Kupfers sind immer noch im Einsatz. 

[LF_1_Kupfer_zoom]

[bold]Verwendung[/bold]
Kupfer wird in der Sanitärinstallation für Rohre und Armaturen sowie in der Elektrotechnik verwendet.

[bold]Dichte[/bold]
8.960 kg/m³

[bold]Schmelzpunkt[/bold]
1.085 °C',13,NULL);
INSERT INTO "SubchapterContent" VALUES (494,4,'[section]Zink[/section]

Zink ist ein Schwermetall, das häufig zur Beschichtung anderer Metalle verwendet wird, um diese vor Rost zu schützen. 

Es ist korrosionsbeständig und wird oft bei der Verzinkung von Stahl durch Feuerverzinken oder thermisches Spritzverzinken eingesetzt. 

Darüber hinaus wird Zink in der Bauindustrie, Automobilproduktion und Elektrotechnik sowie als Blech, Gussteil und Legierungselement für Messing verwendet. 

[LF_1_Zink_zoom]

[bold]Verwendung[/bold]
Zink wird zur Korrosionsschutzbeschichtung von Stahlteilen und Rohren verwendet.

[bold]Dichte[/bold]
7.140 kg/m³

[bold]Schmelzpunkt[/bold]
419 °C',14,NULL);
INSERT INTO "SubchapterContent" VALUES (495,4,'[section]Aluminium[/section]

Aluminium ist eines der am häufigsten verwendeten Leichtmetalle der Welt. 

Es bietet je nach Legierung erhebliche Vorteile, darunter seine Korrosionsbeständigkeit durch die Bildung einer schützenden Oxidschicht. 

Reines Aluminium ist weich und verformbar, aber in Legierungen kann es fast an die Festigkeit von Stahl heranreichen. 

[frame]Aluminium ist unendlich recycelbar und benötigt nur 5 % der Energie der Erstproduktion. Rund 75 % des jemals produzierten Aluminiums sind immer noch im Umlauf.[/frame]
[bold]Verwendung[/bold]
Aluminium wird in der Heizungsinstallation, im Fahrzeugbau und in der Luftfahrt verwendet, wo geringes Gewicht eine Rolle spielt.

[bold]Dichte[/bold]
2.700 kg/m³

[bold]Schmelzpunkt[/bold]
660 °C',12,NULL);
INSERT INTO "SubchapterContent" VALUES (496,4,'[subheading]Kunststoffe[/subheading]

Kunststoffe sind vielseitige, synthetische Materialien, die hauptsächlich aus fossilen Rohstoffen wie Erdöl und Erdgas hergestellt werden. 

Durch chemische Prozesse entstehen lange Molekülketten, sogenannte Polymere, die Kunststoffen ihre besonderen Eigenschaften verleihen. 
[LF_1_Polymere]
Dank ihrer Formbarkeit und Vielseitigkeit sind Kunststoffe in vielen Bereichen unverzichtbar – von Bau und Technik bis hin zu Alltagsprodukten.
',15,NULL);
INSERT INTO "SubchapterContent" VALUES (497,4,'[heading]Baustoffe[/heading]

Baustoffe sind eine spezielle Unterkategorie der Werkstoffe und werden ausschließlich für den Bau von Gebäuden und Bauwerken verwendet. 

Typische Baustoffe sind Zement, Beton, Ziegel, Stahlträger, Glas und Dämmstoffe. 

[LF_1_Baustoffe]

Diese Materialien werden für den Bau von Wänden, Decken, Fundamenten, Dächern und anderen Teilen von Bauwerken eingesetzt.',21,NULL);
INSERT INTO "SubchapterContent" VALUES (498,4,'[subheading]Dichte und Wärmeleitfähigkeit von Baustoffen[/subheading]

Baustoffe unterscheiden sich in ihrer Dichte und Wärmeleitfähigkeit. 

Die [bold]Dichte[/bold] gibt an, wie schwer ein Material im Verhältnis zu seinem Volumen ist. 

Die [bold]Wärmeleitfähigkeit[/bold] zeigt, wie gut ein Material Wärme leitet. 

Zum Beispiel hat Stahl eine hohe Dichte und leitet Wärme gut, während Holz eine geringere Dichte und eine schlechtere Wärmeleitung hat.',22,'');
INSERT INTO "SubchapterContent" VALUES (499,4,'[subheading]Beton[/subheading]

Beton ist ein vielseitiger Baustoff, der aus Zement, Sand, Kies und Wasser besteht. 

Nach dem Aushärten wird er sehr fest und widerstandsfähig. 

Beton wird in vielen Bauprojekten verwendet, von einfachen Fundamenten bis hin zu komplexen Brücken und Gebäuden. 

Je nach Einsatzbereich kann er unbewehrt oder mit Stahl verstärkt sein, um den unterschiedlichen Anforderungen gerecht zu werden.
',23,'');
INSERT INTO "SubchapterContent" VALUES (500,4,'[section]Unbewehrter Beton[/section]

Unbewehrter Beton wird ohne Stahlbewehrung, also ohne eingebaute Stahlstäbe oder -matten, hergestellt. 

Dieser Beton ist besonders druckfest, kann jedoch kaum Zugkräfte aufnehmen, was ihn für spezielle Bauwerke weniger geeignet macht. 

Um die Stabilität zu gewährleisten, sollte Rissbildung vermieden werden, da Risse die Tragfähigkeit beeinträchtigen können. 

[LF_1_Beton]

Ein Beispiel für die Verwendung von unbewehrtem Beton ist bei einfachen Fundamenten oder Gehwegen, wo keine großen Zugkräfte auftreten.
',24,NULL);
INSERT INTO "SubchapterContent" VALUES (501,4,'[section]Bewehrter Beton[/section]

Bewehrter Beton wird mit Stahlstäben oder -matten verstärkt, um auch Zug- und Biegezugkräfte aufnehmen zu können. 

Diese Verstärkung, die sogenannte Bewehrung, verbessert die Tragfähigkeit des Betons erheblich. 
[LF_1_bewehrter_Beton]
Häufig werden vorgefertigte Bewehrungselemente wie Matten oder Körbe eingesetzt. 

Es gibt auch spezielle Varianten wie Spannbeton, bei dem die Bewehrung vorgespannt wird, oder Faserbeton, bei dem Glas- oder Kunststofffasern als Verstärkung dienen.
',25,NULL);
INSERT INTO "SubchapterContent" VALUES (502,4,'[subheading]Glas als Baustoff[/subheading]

Glas ist ein transparenter, spröder Werkstoff, der hauptsächlich aus Quarzsand besteht und bei hohen Temperaturen geschmolzen wird. 

Neben der Verwendung in Fenstern und Türen kommt es auch als Isoliermaterial zum Einsatz. 

Es gibt verschiedene Glasarten, wie z. B. Sicherheitsglas, das bei einem Bruch in kleine, unscharfe Stücke zerfällt. 

Glasfasern, eine spezielle Form von Glas, werden auch für die Verstärkung von Kunststoffen sowie in Glasfaserkabeln zur schnellen Datenübertragung genutzt und sind besonders widerstandsfähig gegen Alterung und Chemikalien.
[LF_1_Glas]',26,NULL);
INSERT INTO "SubchapterContent" VALUES (503,4,'[subheading]Holz als Baustoff[/subheading]

Holz ist ein natürlicher Baustoff, der in vielen Bereichen verwendet wird, z. B. für Dächer, Wände und Böden. 

Holz hat gute Wärmedämmeigenschaften und ist leicht zu bearbeiten. 

In modernen Häusern wird Holz oft als Dämmstoff eingesetzt, um die Energiekosten zu senken.

Darüber hinaus wirkt Holz feuchtigkeitsregulierend und schafft ein angenehmes Raumklima. 

Auch für tragende Konstruktionen und Verkleidungen wird Holz aufgrund seiner Stabilität und ästhetischen Eigenschaften häufig genutzt.

[frame]Holz wird seit über 10.000 Jahren als Baustoff verwendet und gehört damit zu den ältesten Baumaterialien der Menschheit.[/frame]',27,NULL);
INSERT INTO "SubchapterContent" VALUES (504,4,'[subheading]Ziegelsteine als Baustoff[/subheading]

Ziegelsteine werden aus Ton und Lehm bei hohen Temperaturen gebrannt. 

Sie sind stabil und haben eine gute Wärmedämmung. 

Je nach Herstellungsverfahren gibt es verschiedene Arten von Ziegeln:

[bold]Hochlochziegel[/bold]

[bullet]Leichter als Vollziegel, da sie hohle Kammern haben.[/bullet]
[bullet]Gute Wärmedämmung durch die Hohlräume.[/bullet]
[bullet]Eignen sich für nicht tragende Innenwände und wärmegedämmte Außenwände.[/bullet]
[LF_1_Hochlochziegel_zoom]

[bold]Vollziegel[/bold]

[bullet]Massiv und schwer, bieten hohe Tragfähigkeit.[/bullet]
[bullet]Gute Schallisolierung und hohe Festigkeit.[/bullet]
[bullet]Ideal für tragende Wände und Kellerwände.[/bullet]
[LF_1_Vollziegel_zoom]

[bold]Klinkerziegel[/bold]

[bullet]Sehr dicht und wasserabweisend, da bei hohen Temperaturen gebrannt.[/bullet]
[bullet]Widerstandsfähig gegen Frost und Verwitterung.[/bullet]
[bullet]Häufig für Fassaden und Außenverkleidungen verwendet.[/bullet]
[LF_1_Klinker_zoom]',28,NULL);
INSERT INTO "SubchapterContent" VALUES (505,5,'[subheading]Prüfen mit Lehren[/subheading]

Eine Lehre ist ein Werkzeug, mit dem man überprüfen kann, ob ein Werkstück die richtigen Maße oder Formen hat. 

Sie wird oft in der Fertigung oder bei der Montage benutzt. 

Zum Beispiel die [bold]Radienlehre[/bold], ein Werkzeug zur Messung von Radien an Werkstücken. 
Sie besteht aus mehreren Blättern mit verschiedenen Radien und wird in der Metallverarbeitung eingesetzt, um Radien präzise zu prüfen.
[LF_1_Radienlehre_zoom]
Mit einer Lehre misst man nicht, sondern man vergleicht, ob das Werkstück passt oder nicht.

Das Ergebnis ist entweder „in Ordnung“ oder „nicht in Ordnung“. 

Lehren bestehen meistens aus hartem Stahl und sind sehr genau. 

Auch Werkzeuge wie der [bold]Messschieber[/bold], den man fest einstellen kann, können als Lehre verwendet werden, um mehrere gleiche Teile zu überprüfen.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (506,52,'',NULL,NULL);
INSERT INTO "SubchapterContent" VALUES (507,65,'[heading]Reinigungsöffnungen und Schächte[/heading]

[LF_6_Reinigungsöffnung_welcome]

Reinigungsöffnungen und Schächte ermöglichen Inspektionen und Reinigungen der Abwasserleitungen. 
Es gibt genaue Vorgaben, wo und wie diese Einrichtungen eingebaut werden sollen, um die Funktionalität und den Zugang zu gewährleisten.',1,'');
INSERT INTO "SubchapterContent" VALUES (508,65,'[subheading]Bauarten von Reinigungsöffnungen[/subheading]

Es gibt verschiedene Bauarten von Reinigungsöffnungen, die je nach Einsatzstelle und Funktion ausgewählt werden:
[LF_6_Reinigungsöffnung_zoom]
[bold]Rohrendverschluss[/bold]
Wird an zugänglichen Stellen, z.B. am Übergang einer lotrechten Leitung in eine Sammelleitung, als Ersatz für Reinigungsrohre in Fallleitungen verwendet.

[bold]Reinigungsverschluss[/bold]
Verwendung in Sammel- und Grundleitungen, um die Reinigung ohne Schacht von der Fußbodenebene aus zu ermöglichen.

[bold]Reinigungsrohre (rund oder rechteckig)[/bold]
Zur Reinigung von Umlenkungen oder größeren Leitungen, geeignet für Fall- und Sammelleitungen.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (509,65,'[subheading]Abstände für Reinigungsöffnungen[/subheading]

Reinigungsöffnungen müssen in bestimmten Abständen eingebaut werden, um eine regelmäßige Wartung und Inspektion zu ermöglichen:

[bold]In Fallleitungen[/bold]
Direkt am Übergang in eine liegende Leitung.
[LF_6_Abstände_zoom]
[bold]In Sammelleitungen[/bold]
Alle 20 m oder bei Grenzbebauung im Gebäude vor der Mauerdurchführung.

[bold]In Grundleitungen[/bold]
[bullet]Reinigungsöffnungen alle 20 Meter einplanen.[/bullet]
[bullet]Bei Richtungsänderungen bis Nennweite DN 150 alle 40 Meter.[/bullet]
[bullet]Bei Richtungsänderungen ab Nennweite DN 200 alle 60 Meter.[/bullet]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (511,65,'[subheading]Einbauregeln für Schächte[/subheading]

Innerhalb von Gebäuden müssen Grundleitungen geschlossen zusammen mit Reinigungsrohren durch Schächte geführt werden. 

Schächte sind [bold]vertikale Zugangsöffnungen[/bold] im Entwässerungssystem, die Wartung und Reinigung der Abwasserleitungen ermöglichen, ohne dass diese ausgehoben werden müssen. 
Sie sind in Abständen und an wichtigen Punkten wie Richtungsänderungen angeordnet und mit einem Schachtdeckel verschlossen, um sie vor Verschmutzung und unbefugtem Zugriff zu schützen.

Außerhalb von Gebäuden können Abwasserleitungen offen verlegt werden, wenn die Schachtdeckel über der Rückstauebene liegen. 
In der Regel werden jedoch geschlossene Leitungen bevorzugt.

[frame]Bei Trennsystemen müssen separate Schächte für Schmutz- und Regenwasser verwendet werden.[/frame]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (512,59,'[heading]Leitungsverlegung Anschlussleitungen[/heading]

[LF_6_Leitungsverlegung_welcome]

Die Verlegung von Anschlussleitungen folgt bestimmten Vorgaben. 

Im Folgenden werden Regeln zu Neigung, Übergangsstücken und Höhenunterschieden erläutert.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (513,59,'[subheading]Mindesthöhen Unterschied zur Fallleitung[/subheading]

Der Höhenunterschied zwischen dem Wasserspiegel im tiefsten Siphon und dem Punkt, an dem die Fallleitung angeschlossen wird, muss mindestens dem Rohrdurchmesser entsprechen.
In diesem Zusammenhang spricht man auch vom [bold]Dimensionssprung[/bold].

Rechts auf dem Bild wird dargestellt, dass der Höhenunterschied zwischen dem Siphon und dem Fallleitungsanschluss mindestens dem Rohrdurchmesser von 100 mm entsprechen muss.
[LF_6_Dimensionssprung_zoom]
[frame]Die Sohle ist der tiefste Punkt im Inneren eines Rohrs oder einer Leitung, durch den das Abwasser fließt. Sie bezeichnet die Unterseite des Rohrs, auf der das Abwasser entlangläuft.[/frame]
',2,NULL);
INSERT INTO "SubchapterContent" VALUES (514,59,'[subheading]Verlegung von Abzweigen bei Einzel- und Sammelanschlussleitungen[/subheading]

Für Einzel- und Sammelanschlussleitungen sollten 45°-Abzweige genutzt werden, um Einspülungen zu vermeiden. 

[LF_6_Abzweige_1_zoom]

Werden sie seitlich angeschlossen, müssen sie mindestens 15° geneigt sein. 

[LF_6_Abzweige_2_zoom]

Das sorgt für einen guten Abfluss und verhindert Probleme im System.',3,NULL);
INSERT INTO "SubchapterContent" VALUES (515,59,'[subheading]Übergangsstücke[/subheading]

Übergangsstücke müssen scheitelgleich eingebaut werden, also so, dass der obere Rand der Rohre auf einer Höhe bleibt. 

[LF_6_Übergangsstücke_zoom]

Das verhindert Verengungen und sorgt für einen gleichmäßigen Abfluss ohne Rückstau.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (516,59,'[subheading]Doppelabzweige[/subheading]

Doppelabzweige dürfen in Einzel- und Sammelanschlussleitungen nicht verwendet werden, da sie den Wasserfluss stören und Rückstau verursachen können. 

[LF_6_Doppelabzweige_zoom]

Stattdessen braucht jeder Sanitärgegenstand einen eigenen Abzweig.',5,NULL);
INSERT INTO "SubchapterContent" VALUES (517,59,'[subheading]Sturzstrecken[/subheading]

Eine Sturzstrecke wird verwendet, um Höhenunterschiede zwischen einer Anschlussleitung und der Fallleitung auszugleichen. 
Sie muss senkrecht verlegt werden – eine diagonale Verlegung ist nicht zulässig. 
[LF_6_Sturzstrecke_zoom]
Eine unbelüftete Sturzstrecke darf maximal 1 Meter lang sein, während eine belüftete Sturzstrecke bis zu 3 Meter lang sein darf.',6,NULL);
INSERT INTO "SubchapterContent" VALUES (518,59,'[subheading]Maximale Länge und Richtungsänderungen[/subheading]

Unbelüftete Einzelanschlussleitungen dürfen maximal 4 m lang sein und benötigen ein Mindestgefälle von 1 %. 
[LF_6_Einzelanschlussleitung_unbelüftet_zoom]
Es können bis zu drei 90°-Bögen eingebaut werden, wobei der Anschlussbogen (in der Regel der Siphonbogen) nicht mitgezählt wird.
[LF_6_Anschlussbogen_zoom]

Belüftete Einzelanschlussleitungen dürfen bis zu 10 m lang sein, benötigen ein Mindestgefälle von 0,5 %, und die Anzahl der 90°-Bögen ist unbegrenzt.

Unbelüftete Sammelanschlussleitungen dürfen maximal 10 m lang sein, wobei die Länge der daran angeschlossenen Einzelanschlussleitungen auf 4 m begrenzt ist. 
Sie erfordern ein Mindestgefälle von 1 % und erlauben bis zu drei 90°-Umlenkungen.
[LF_6_Sammelanschlussleitung_unbelüftet_zoom]

[frame]Belüftet bedeutet, dass eine Lüftungsleitung oder ein Belüftungsventil angeschlossen ist, das für den  Druckausgleich beim Abfließen des Wassers sorgt.[/frame]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (519,60,'[heading]Leitungsverlegung Falleitungen [/heading]

[LF_6_Fallleitung_welcome]
Falleitungen leiten Abwasser von höheren Stockwerken nach unten. 

In Gebäuden mit bis zu drei Geschossen gelten bestimmte Verlegerichtlinien, die beachtet werden müssen, um eine reibungslose Entwässerung sicherzustellen.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (520,60,'[subheading]Schutz vor mechanischer Beschädigung[/subheading]

Falleitungen müssen vor mechanischen Beschädigungen geschützt werden, vor allem in Bereichen wie Garagen oder Lagerhallen. 

[LF_6_Rammschutz_zoom]

Ein Rammschutz verhindert, dass die Leitungen durch Fahrzeuge beschädigt werden. 

In Bereichen, in denen mit mechanischer Belastung gerechnet werden muss, sind standfeste Rohre aus einem geeigneten Material zu verwenden.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (521,60,'[subheading]Befestigung von Fallleitungen[/subheading]

Falleitungen müssen sicher mit Schellen befestigt werden, um seitliches Ausweichen und axiales Ausschieben zu verhindern. 
Der Abstand der Schellen richtet sich nach dem Rohrdurchmesser und dem Material. 
Zusätzlich zur Schellenbefestigung kann eine Fallrohrstütze erforderlich sein, um das hohe Gewicht der Leitung abzufangen:

[bullet]SML-Rohr: Fallrohrstütze alle 5 Geschosse oder bei mehr als 15 m Leitungslänge.[/bullet]
[bullet]PP-Rohr > DN 100: Fallrohrstütze ab 3 Geschossen.[/bullet]

[LF_6_Fallleitungsbefestigung_zoom]
Die Festschelle stützt den Rohrstrang unter der Muffe und verhindert das Abrutschen, während die Gleitschelle die Längenausdehnung des Rohrs bei Temperaturveränderungen ermöglicht.
Der Abstand der Schellen sollte 2 m nicht überschreiten.
Bei mehr als 15 m Länge ist zusätzlich eine Fallrohrstütze alle 15 m nötig um das hohe Gewicht der Leitung abzufangen.
[LF_6_Fallrohrstütze_zoom]

[]frameSteckmuffensysteme wie bei HT Rohr dürfen nicht ganz zusammengesteckt werden. Je nach hersteller müssen 10 mm Einsteckweg für die Längenausdehnung übrig bleiben. Bei verschweißtem oder mit Krallenverbindern verlegten Kunststoffrohr müssen Längenausdehnungselemente wie Langmuffen in jeder Etage eingebaut werden.[/frame]
[LF_6_Längenausgleich_zoom]',3,'');
INSERT INTO "SubchapterContent" VALUES (522,60,'[subheading]Verlegung der Fallleitung im gleichen Durchmesser[/subheading]

Fallleitungen müssen immer im gleichen Durchmesser verlegt werden, damit der Abfluss und die Luftzirkulation reibungslos funktionieren. 

Beim Betrieb strömt bis zu 35-mal mehr Luft als Wasser durch die Leitung. 
Wohnungen, die nebeneinander liegen, dürfen nur mit Berücksichtigung von Schall- und Brandschutzvorgaben an eine gemeinsame Leitung angeschlossen werden.',4,'');
INSERT INTO "SubchapterContent" VALUES (523,60,'[subheading]Umlenkung in liegende Leitungen[/subheading]

Die Umlenkung von einer senkrechten Fallleitung in eine waagerechte Leitung erfolgt idealerweise mit zwei 45°-Bögen und einem 250 mm langen Zwischenstück. 

Bei Gebäuden mit bis zu drei Stockwerken gibt es keine festen Regeln für die Umlenkung. 
Theoretisch ist hier eine Umlenkung mit einem 90°-Bogen möglich, jedoch nicht empfehlenswert. 

Eine flachere Umlenkung unterstützt einen gleichmäßigen Abfluss und verringert das Risiko von Rückstau und Lärmentwicklung.
[LF_6_Umlenkung_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (524,60,'[subheading]Abstände von Anschlüssen an Fallleitungen[/subheading]

Anschlüsse an Fallleitungen müssen bestimmte Abstände einhalten, um Fremdeinspülung zu verhindern. 
Der Höhenunterschied zwischen dem Siphon und der Fallleitung sollte mindestens so groß sein wie der Durchmesser des Rohrs.
[LF_6_Dimensionssprung_zoom]

Bei gegenüber- und übereinanderliegenden Anschlüssen mit einem Winkel zueinander über 90° muss der Höhenunterschied mindestens 20 cm betragen, gemessen von Unterkante zu Unterkante des Abgangs.

[LF_6_Mindestsohlenabstand_zoom]

Bei einem Winkel kleinergleich 90° entfällt der Mindesthöhenabstand.

[LF_6_Mindestsohlenabstand_2_zoom]',6,NULL);
INSERT INTO "SubchapterContent" VALUES (525,60,'[subheading]Anschlusswinkel an Fallleitungen[/subheading]

Anschlüsse an Fallleitungen sollten am besten in einem Winkel von 88,5° gemacht werden. 

Es gibt Abzweige mit und ohne Innenradius oder Einlaufwinkel. 

Der Innenradius oder Einlaufwinkel verbessert den Abfluss und die Luftzirkulation in der Leitung. 

45°-Abzweige sind nur bei den Größen [bold]DN 80x80x45°[/bold], [bold]DN 100x80x45°[/bold] und [bold]DN 100x100x45°[/bold] erlaubt.

[LF_6_Abzweige_zoom]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (526,60,'[subheading]Doppelabzweige[/subheading]

Doppelabzweige sollten vermieden werden. 

Doppelabzweige ohne Innenradius dürfen nur eingesetzt werden, wenn zwei gegenüberliegende WCs angeschlossen sind. 

Doppelabzweige mit einem 45°-Innenradius oder Kugelabzweige haben diese Einschränkung nicht.

[LF_6_Doppelabzweig_2_zoom]',8,NULL);
INSERT INTO "SubchapterContent" VALUES (527,60,'[subheading]Fallleitungen in Gebäuden mit 3-8 Geschossen[/subheading]

Bei Fallleitungen, die länger als 10 m sind, gibt es besondere Regeln. 

[LF_6_anschlussfreie_Zonen_zoom]

Vor einer waagerechten Umlenkung müssen 2 m und danach 1 m von Anschlüssen freigehalten werden, weil dort starker Überdruck entsteht. 

[LF_6_Umgehungsleitungen_zoom]

Wenn in diesem Bereich ein Sanitärgegenstand angeschlossen werden muss, kann eine Umgehungsleitung genutzt werden.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (528,60,'[subheading]Falleitungen in Gebäuden über 8 Geschossen[/subheading]

In Gebäuden mit mehr als 8 Geschossen oder bei einer Falleitungslänge von über 22 m muss immer eine Umgehungsleitung verlegt werden. 

Diese Umgehungsleitung sorgt dafür, dass der Druck im System ausgeglichen wird und Anschlüsse auch in diesen Bereichen vorgenommen werden können.

[LF_6_Umgehungsleitungen_zoom]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (529,60,'[subheading]Mehrfache Verziehungen bei Terrassenhäusern[/subheading]

Bei mehrfachen Verziehungen, wie sie in Terrassenhäusern vorkommen, muss eine direkte Nebenlüftung verlegt werden. 

Diese Nebenlüftung sorgt dafür, dass der Druck in den Leitungen ausgeglichen wird und keine Funktionsstörungen auftreten.
[LF_6_mehrfache_Verziehungen_zoom]',11,NULL);
INSERT INTO "SubchapterContent" VALUES (530,61,'[heading]Leitungsverlegung Grund- und Sammelleitungen[/heading]

Sammel- und Grundleitungen leiten Abwasser aus dem Gebäude in das Entwässerungssystem. 

Dabei müssen besondere Regeln zu Anschlüssen, Richtungsänderungen, Größen und Dichtheitsprüfungen beachtet werden, um einen sicheren Abfluss zu gewährleisten.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (531,61,'[subheading]Anschlüsse und Richtungsänderungen[/subheading]

Bei einer Richtungsänderung in Sammel- und Grundleitungen darf der Winkel der Bögen  maximal 45° betragen. 

Bei einer Richtungsänderung von 90° müssen mindestens zwei Bögen je 45° verwendet werden. 
[LF_6_Richtungsänderung_zoom]
Eine bessere Lösung wäre es jedoch, die Umlenkung statt mit 45°-Bögen auf mehrere Bögen mit kleineren Winkeln zu verteilen.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (532,61,'[subheading]Aufweitungen in Grundleitungen und Sammelleitungen[/subheading]

In Grundleitungen dürfen Aufweitungen sowohl sohle- als auch scheitelgleich erfolgen, ohne den Abfluss zu stören. 
[LF_6_sohlegleich_zoom]
In Sammelleitungen müssen die Aufweitungen scheitelgleich sein, um einen gleichmäßigen Wasserfluss zu gewährleisten und Druckprobleme zu verhindern.

[frame]Scheitelgleich bedeutet, dass die Erweiterung oben am Rohr erfolgt, während bei sohlegleich die Erweiterung unten stattfindet und die Rohrsohle unverändert bleibt.[/frame]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (533,61,'[subheading]Dichtheitsprüfung bei Grundleitungen[/subheading]

Die Dichtheitsprüfung von Grundleitungen sollte unmittelbar nach dem Verfüllen des Rohrgrabens erfolgen. 
Wird sie vor dem Verfüllen durchgeführt, müssen die Leitungsteile gegen Auseinanderrutschen gesichert werden.

[bold]Dichtheitsprüfung mit Wasser (Verfahren W)[/bold]
Zur Vorbereitung der Dichtheitsprüfung wird die Rohrleitung etwa eine Stunde lang vollständig mit Wasser gefüllt gehalten. 
Dafür müssen alle Öffnungen dicht verschlossen werden und die Leitung möglichst vom tiefsten Punkt der Grundleitung gefüllt werden.
Bei der Dichtheitsprüfung wird das Rohrsystem mit Wasser gefüllt und einem Druck von 100–500 mbar (entspricht 1–5 m Wassersäule) ausgesetzt. Anschließend  wird 30 Minuten beobachtet, ob Wasser verloren geht. 
Dabei wird der Anfangsdruck(Höhe der Wassersäule) durch Nachfüllen gehalten und die hinzugefügte Wassermenge notiert.
[LF_6_Dichtheitsprüfung_zoom ]

Die Grenzwerte für einen bestandenen Test sind bei:

[bold]Leitungen[/bold]
Wasserverlust unter 0,15 Litern pro Quadratmeter Rohrinnenfläche innerhalb von 30 Minuten.

[bold]Leitungen mit Schächten[/bold]
Wasserverlust unter 0,2 Litern pro Quadratmeter Rohrinnenfläche innerhalb von 30 Minuten.

[bold]Schächte[/bold]
Wasserverlust unter 0,4 Litern pro Quadratmeter Rohrinnenfläche innerhalb von 30 Minuten.

Für die Prüfung wird ein Prüfprotokoll ausgefüllt.
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (534,61,'[subheading]Prüfungsablauf - Prüfung mit Wasser[/subheading]

Bei der Dichtheitsprüfung mit Wasser wird die Leitung mit einem Mindestdruck von 100 mbar (1 Meter Wassersäule) und einem Höchstdruck von 500 mbar (5 Meter Wassersäule) geprüft. 

Die Leitung wird vollständig gefüllt und der Druck über einen bestimmten Zeitraum konstant gehalten. 

Nach 30 Minuten wird überprüft, ob der Druck gehalten wurde, und eine minimale Wasserzugabe wird berücksichtigt.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (535,61,'[subheading]Prüfungsablauf - Prüfung mit Luft[/subheading]

Bei der Dichtheitsprüfung mit Luft variiert der Prüfdruck je nach Kategorie zwischen 10 und 200 mbar. 

Zunächst wird ein Anfangsdruck von 10 % über dem Prüfdruck aufgebaut, der für 5 Minuten gehalten wird. Der tatsächliche Prüfdruck wird dann über eine bestimmte Zeit kontrolliert. 

Ein Druckabfall darf nur innerhalb eines festgelegten Wertes erfolgen.',8,NULL);
INSERT INTO "SubchapterContent" VALUES (536,61,'[subheading]Verbindung von Regen- und Schmutzwasserleitungen[/subheading]

Das Zusammenführen von Regen- und Schmutzwasserleitungen ist nur in Ausnahmen zulässig, beispielsweise bei Grenzbebauungen kurz vor dem Gebäudeausgang. 

Diese Verbindung sollte jedoch möglichst vermieden werden, da sie das Entwässerungssystem stark belasten und zu Problemen wie Rückstau führen kann.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (537,62,'[heading]Lüftungsleitungen und Belüftungsventile [/heading]


Lüftungsleitungen verhindern Über- und Unterdruck in Abwasserleitungen und schützen die Geruchsverschlüsse vor dem Leersaugen. 

Sie leiten außerdem Kanalgase ab.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (538,62,'[subheading]Einzelhauptlüftung (EHL)[/subheading]

Die Einzelhauptlüftung wird direkt an eine einzelne Falleitung angeschlossen. 

Sie gleicht den Luftdruck in der Abwasserleitung aus und unterstützt so den Abfluss. 

[LF_6_Einzelhauptlüftung_welcome]

Die Leitung hat den gleichen Durchmesser wie die Falleitung und wird hauptsächlich bei kleineren Installationen verwendet. 

Dadurch wird eine gleichmäßige Belüftung des Systems gewährleistet.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (539,62,'[subheading]Sammelhauptlüftung (SHL)[/subheading]

Die Sammelhauptlüftung verbindet mehrere Einzelhauptlüftungen zu einer zentralen Leitung. 

Diese Art der Lüftung ist vor allem bei größeren Installationen sinnvoll, um den Luftaustausch für mehrere Leitungen sicherzustellen. 

[LF_6_Sammelhauptleitung_welcome]

Der Durchmesser der Sammelhauptlüftung muss mindestens die Hälfte der Summe der Querschnitte aller angeschlossenen Einzelhauptlüftungen betragen. 

Ein weiterer Vorteil ist, dass weniger Dachdurchführungen notwendig sind.',3,'');
INSERT INTO "SubchapterContent" VALUES (540,62,'[subheading]Umlüftungsleitung (UL)[/subheading]

Die Umlüftungsleitung wird als Entlastung für lange oder stark belastete Abwasserleitungen eingesetzt, um Über- oder Unterdruck zu vermeiden. 

[LF_6_Umlüftungsleitung_welcome]

Sie wird in derselben Nennweite wie die Sammelanschlussleitung ausgeführt, maximal jedoch DN 70. 

Die Umlüftungsleitung sorgt dafür, dass der Luftdruck im System ausgeglichen bleibt und der Abfluss einwandfrei funktioniert.

[frame]Die Nennweite (DN) gibt den ungefähren Innendurchmesser eines Rohres an. Sie hilft, die passende Größe für Rohre und Anschlüsse festzulegen. Zum Beispiel bedeutet "DN 70", dass der Durchmesser etwa 70 mm beträgt.[/frame]',4,'');
INSERT INTO "SubchapterContent" VALUES (541,62,'[subheading]Umgehungsleitung (UGL)[/subheading]

Die Umgehungsleitung wird verwendet, um den Luftfluss bei Umlenkungen oder Verziehungen in den Fallleitungen zu gewährleisten. 

Sie führt die Luft um diese Umlenkungen herum, um Druckschwankungen im Abwassersystem zu verhindern. 

Besonders bei komplizierten Installationen, die mehrere Biegungen aufweisen, sorgt die Umgehungsleitung für einen stabilen Abfluss.

[LF_6_Umgehungsleitungen_welcome]',5,'');
INSERT INTO "SubchapterContent" VALUES (542,62,'[subheading]Verlegegrundsätze für Lüftungsleitungen[/subheading]

Lüftungsleitungen sollten möglichst senkrecht installiert werden, um den Luftstrom nicht zu behindern. 

Ein Mindestgefälle von 2 cm pro Meter verhindert, dass Abwasser in die Lüftungsleitung gelangt und der Luftstrom dauerhaft gut funktioniert.

[LF_6_Umlüftungsleitung_richtig_welcome]

[LF_6_Lüftungsleitung_falsch_welcome]
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (543,62,'[subheading]Verbindungen von Lüftungsleitungen[/subheading]

Verziehungen in Lüftungsleitungen sollten vermieden werden, da sie den Luftstrom behindern können. 

Wenn sie allerdings unvermeidbar sind, sollten 45°-Bögen benutzt werden, damit die Luft gut zirkulieren kann. 

[LF_6_Umlüftungsleitung_Verziehung_welcome]

Leitungen, die über die letzte Abwasserleitung hinausgehen, müssen schräg zusammengeführt werden.

[frame]Verziehungen sind Biegungen oder Umlenkungen in Lüftungsleitungen. Sie entstehen, wenn die Leitungen nicht gerade verlegt werden können und sollten möglichst vermieden werden, da sie den Luftstrom stören.[/frame]',7,NULL);
INSERT INTO "SubchapterContent" VALUES (544,62,'[subheading]Führung der Lüftungsleitung über Dach[/subheading]

Lüftungsleitungen müssen mindestens 150 mm über das Dach hinausragen, damit die Luft gut entweichen kann. 

Eine Abdeckung sollte nicht angebracht werden, da sie den Luftaustausch blockieren würde. 

Um zu verhindern, dass unangenehme Gerüche in das Haus gelangen, muss die Lüftungsleitung außerdem ausreichend Abstand zu Fenstern halten: 
mindestens 1 Meter nach oben und 2 Meter zur Seite.
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (545,62,'[subheading]Verwendung von flexiblen Lüftungsrohren[/subheading]

Flexible Lüftungsrohre dürfen nur am Ende der Leitung bis maximal 1 Meter Länge verwendet werden. 

Damit die Luft weiterhin problemlos strömen kann, sollten keine Geruchsverschlüsse eingebaut werden. 
[LF_6_Lüftungsziegel_zoom]',9,NULL);
INSERT INTO "SubchapterContent" VALUES (546,62,'[subheading]Belüftungsventile[/subheading]

Belüftungsventile dürfen nur in Ein- und Zweifamilienhäusern eingesetzt werden, wenn mindestens eine Falleitung über das Dach entlüftet wird. 

Sie müssen oberhalb des höchsten Wasserstands der Abwasserleitung montiert werden, um richtig zu funktionieren. 

[LF_6_Anschluss_Rohrbelüfter_welcome]

Diese Ventile sorgen dafür, dass die Luft in den Leitungen zirkulieren kann und verhindern, dass unangenehme Gerüche aus der Leitung austreten.

[LF_6_Rohrbelüfter_welcome]

[LF_6_Rohrbelüfter_innen_welcome]

',10,NULL);
INSERT INTO "SubchapterContent" VALUES (547,63,'[heading]Schutz gegen Rückstau[/heading]

Um Schäden in Gebäuden zu vermeiden, stehen verschiedene Schutzsysteme zur Verfügung, wie Hebeanlagen (Aktivsysteme) und Rückstauverschlüsse (Passivsysteme). 

Im Folgenden werden diese Systeme genauer betrachtet, um zu verstehen, wie sie das Zurückfließen von Abwasser verhindern.',1,'');
INSERT INTO "SubchapterContent" VALUES (548,63,'[subheading]Rückstauebene[/subheading]

Die Rückstauebene wird von der örtlichen Behörde festgelegt, meist in Höhe der Straßenoberkante an der Anschlussstelle.

Abwassersysteme müssen gesichert werden, wenn:

[bullet]Der Geruchsverschluss bei Abwasser unterhalb der Rückstauebene liegt.[/bullet]
[bullet]Der Einlaufrost bei Regenwasser unterhalb der Rückstauebene liegt.[/bullet]

[LF_6_Rückstauebene_welcome]

Entwässerungsgegenstände oberhalb der Rückstauebene dürfen durch Schwerkraft entwässert werden und dürfen nicht über Rückstauverschlüsse geführt werden. 

Bei Sanierungen kann eine Hebeanlage eingesetzt werden.',2,NULL);
INSERT INTO "SubchapterContent" VALUES (549,63,'[subheading]Rückstausysteme[/subheading]

Es gibt zwei Arten von Rückstausystemen: 

[bold]Hebeanlagen[/bold] (Aktivsysteme) und [bold]Rückstauverschlüsse[/bold] (Passivsysteme).

[bullet]Hebeanlagen heben das Abwasser aktiv über die Rückstauebene und eignen sich für fäkalienfreies oder fäkalienhaltiges Abwasser. Sie pumpen das Abwasser zuverlässig ab, insbesondere bei Toiletten, wo eine Fäkalienhebeanlage benötigt wird.[/bullet]

[bullet]Rückstauverschlüsse verhindern passiv das Eindringen von Abwasser durch selbstschließende Verschlüsse und werden hauptsächlich für fäkalienfreies Abwasser eingesetzt. Für fäkalienhaltiges Abwasser sind sie nur in Ausnahmefällen geeignet.[/bullet]

[LF_6_Rückstauverschluss]

[LF_6_Rückstauverschluss_Schnitt]',3,NULL);
INSERT INTO "SubchapterContent" VALUES (550,63,'[subheading]Typen von Rückstauverschlüssen[/subheading]

Es gibt verschiedene Rückstauverschlüsse für unterschiedliche Abwassermengen:

[section]Typ 0[/section]
Für Regenwassernutzungsanlagen, zugelassen nur für Regenwasserüberläufe. 
Sie besitzen einen selbsttätigen Verschluss und einen Notverschluss.

[section]Typ 1[/section]
Für fäkalienfreies Abwasser in horizontalen Leitungen, mit zwei selbsttätigen Verschlüssen und einem Notverschluss.

[section]Typ 2[/section]
Für fäkalienfreies Schmutzwasser, mit einem selbsttätigen Verschluss und einem handbetätigten Notverschluss.

[section]Typ 3[/section]
Für fäkalienhaltiges Schmutzwasser, mit einem motorbetriebenen Verschluss, geeignet für kleinere Benutzerkreise wie WC-Anlagen.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (551,63,'[subheading]Inspektion und Wartung von Rückstauverschlüssen[/subheading]

Rückstauverschlüsse müssen regelmäßig inspiziert und gewartet werden:

[section]Inspektion[/section]
Monatlich durch den Betreiber, der den Notverschluss manuell betätigt.

[section]Wartung[/section]
Zweimal im Jahr durch einen Fachbetrieb. 
Dabei wird die Funktionsfähigkeit geprüft, Ablagerungen entfernt und Dichtungen überprüft. 
Bei motorbetriebenen Verschlüssen sind bewegliche Teile besonders zu kontrollieren.',5,'');
INSERT INTO "SubchapterContent" VALUES (552,63,'[subheading]Fäkalienhebeanlage mit geruchsdichtem Sammelbehälter[/subheading]

Fäkalienhebeanlagen mit geruchsdichtem Sammelbehälter werden für WC-Anlagen verwendet, die unterhalb der Rückstauebene liegen. 

[LF_6_Hebeanlage_welcome]

Sie bestehen aus einem Sammelbehälter und einer Pumpe, die das Abwasser über die Rückstauebene hebt und Rückstau verhindert.

[LF_6_Hebeanlage_welcome_2]

Merkmale dieser Anlagen:

[bullet]Geruchsdichter Sammelbehälter[/bullet]

[bullet]Leistungsstarke Pumpen für den sicheren Betrieb bei Rückstau[/bullet]

[bullet]Rückstauverschlüsse und eine Belüftungsleitung[/bullet]
',6,'');
INSERT INTO "SubchapterContent" VALUES (553,63,'[subheading]Inspektion und Wartung von Rückstauverschlüssen[/subheading]

Rückstauverschlüsse müssen regelmäßig inspiziert und gewartet werden:

[section]Inspektion[/section]
Monatlich durch den Betreiber, der den Notverschluss manuell betätigt.

[section]Wartung[/section]
Zweimal im Jahr durch einen Fachbetrieb. 
Dabei wird die Funktionsfähigkeit geprüft, Ablagerungen entfernt und Dichtungen überprüft. 
Bei motorbetriebenen Verschlüssen sind bewegliche Teile besonders zu kontrollieren.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (554,63,'[subheading]Fäkalienhebeanlage mit geruchsdichtem Sammelbehälter[/subheading]

Fäkalienhebeanlagen mit geruchsdichtem Sammelbehälter werden für WC-Anlagen verwendet, die unterhalb der Rückstauebene liegen. 

Sie bestehen aus einem Sammelbehälter und einer Pumpe, die das Abwasser über die Rückstauebene hebt und Rückstau verhindert.

Merkmale dieser Anlagen:

[bullet]Geruchsdichter Sammelbehälter[/bullet]

[bullet]Leistungsstarke Pumpen für den sicheren Betrieb bei Rückstau[/bullet]

[bullet]Rückstauverschlüsse und eine Belüftungsleitung[/bullet]
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (555,63,'[subheading]Fäkalienhebeanlage zur begrenzten Verwendung[/subheading]

Diese Anlagen werden in Haushalten mit geringem Abwasseranfall verwendet, wenn oberhalb der Rückstauebene eine weitere Toilette vorhanden ist. 

Sie eignen sich nicht für gewerbliche Anwendungen.

[LF_6_Hebanlage_begrenzt_welcome]

[LF_6_Hebeanlage_begrenzt_2]

Merkmale:

[bullet]Es können maximal 1 WC, 1 Handwaschbecken, 1 Duschwanne und 1 Sitzwaschbecken angeschlossen werden.[/bullet]

[bullet]Die Druckleitung muss über die Rückstauebene geführt werden. Bei Anlagen ohne Fäkalienzerkleinerung beträgt die Mindestnennweite DN 25, mit Zerkleinerung DN 20.[/bullet]',9,NULL);
INSERT INTO "SubchapterContent" VALUES (556,63,'[subheading]Abwasserhebeanlage für fäkalienfreies Abwasser[/subheading]

Diese Anlagen werden für fäkalienfreies Abwasser wie von Waschbecken, Duschen oder Regenwasserleitungen eingesetzt.

[LF_6_Hebeanlage_fäkalfrei_welcome_2]

[LF_6_Hebanlage_fäkalfrei_welcome]

Merkmale:

[bullet]Die Druckleitung muss über die Rückstauebene geführt werden, mit einer Mindestnennweite von DN 32.[/bullet]

[bullet]Das erforderliche Nutzvolumen variiert je nach Leitung. Für DN 50 sind mindestens 10 Liter erforderlich, für größere Leitungen über DN 50 mindestens 20 Liter.[/bullet]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (557,63,'',11,NULL);
INSERT INTO "SubchapterContent" VALUES (558,63,'',12,NULL);
INSERT INTO "SubchapterContent" VALUES (559,18,'[subheading]Stromstärke[/subheading]

Die Stromstärke, gemessen in [bold]Ampere (A)[/bold], beschreibt, wie viel elektrische Ladung pro Sekunde durch einen Leiter fließt. Einfach gesagt, zeigt sie, wie viele Elektronen durch das Material fließen. 

Je höher die Stromstärke, desto mehr Elektronen bewegen sich durch den Leiter.

Wenn die Stromstärke zu hoch ist, können Kabel und Geräte überhitzen oder beschädigt werden. 

Deshalb muss man bei der Installation von elektrischen Anlagen darauf achten, dass die Kabel und Geräte für die Menge an Strom geeignet sind, die fließen wird. 

[bold]Strommessung[/bold]
Um Strom zu messen, wird ein Amperemeter in Reihe mit dem Stromkreis geschaltet, da nur so derselbe Strom durch das Messgerät und das Bauteil fließt. Ein Multimeter kann ebenfalls zur Strommessung verwendet werden, da es verschiedene elektrische Größen wie Strom, Spannung und Widerstand misst.
[LF_4_Amperemeter_zoom]
Indirekte Messungen sind ebenfalls möglich, z.B. mit einer Stromzange, die das Magnetfeld um den Leiter misst und daraus den Strom berechnet – ideal, wenn man den Stromkreis nicht auftrennen möchte.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (561,21,'[section]Bereich 3[/section]

Bereich 3 beginnt außerhalb von Bereich 2 und erstreckt sich bis zu einem Abstand von 2,4 Metern. 

Sie umfasst den Bereich oberhalb von 2,25 Metern über dem Boden sowie den Raum unter der Badewanne oder Dusche, der nur mit Werkzeug zugänglich ist.

In diesem Bereich dürfen elektrische Geräte installiert werden, solange sie den entsprechenden Schutz aufweisen. 

Wenn zur Reinigung Strahlwasser verwendet wird, müssen die Geräte mindestens die Schutzart IPX5 haben. 

Elektrische Leitungen sind auf die Versorgung von Geräten in den Bereichen 0 und 1 beschränkt.

[LF_4_Zone_3_welcome]',10,NULL);
INSERT INTO "SubchapterContent" VALUES (562,27,'[subheading]Enthärtungsanlage[/subheading]

Eine Enthärtungsanlage nutzt das Ionenaustauschverfahren, um den Kalkgehalt im Wasser zu verringern.

[LF_5_Enthärtung_zoom]',9,NULL);
INSERT INTO "SubchapterContent" VALUES (563,27,'[section]Funktionsweise der Enthärtungsanlage[/section]

Im Inneren der Anlage befinden sich Harzpatronen, die mit Natriumionen beladen sind. 

Wenn hartes Wasser durch die Anlage fließt, tauschen die Harzpatronen die Kalzium- und Magnesiumionen gegen Natriumionen aus. 

Dadurch wird das Wasser weicher und enthält keine kalkbildenden Stoffe mehr.

[LF_5_Enthärtung_innen_zoom]',10,'');
INSERT INTO "SubchapterContent" VALUES (564,27,'[section]Regenerationsprozess[/section]

Damit die Harzpatronen weiterhin effektiv arbeiten, ist eine regelmäßige Regeneration notwendig. 

Hierfür werden Salztabletten in einem Salztank aufgelöst, wodurch eine Sole entsteht. 

Diese Sole wird während des Regenerationsprozesses durch die Harzpatronen geleitet, um die abgelagerten Kalzium- und Magnesiumionen auszuspülen und die Harzpatronen erneut mit Natriumionen aufzuladen.

[LF_5_Salztabletten_zoom]

[frame]Sole ist eine Mischung aus Wasser und Salz, bei der das Salz im Wasser gelöst ist. Sie kommt in der Natur als Meerwasser oder in Salzseen vor und wird auch künstlich hergestellt, zum Beispiel für die Lebensmittelherstellung.[/frame]
',11,'');
INSERT INTO "SubchapterContent" VALUES (565,27,'[section]Verschnittarmatur[/section]

Die Verschnittarmatur ermöglicht es, dem enthärteten Wasser über ein Bypass-Ventil eine kontrollierte Menge hartes Wasser beizumischen. 

[LF_5_Verschnittarmatur_zoom]
Dies ist notwendig, um den Härtegrad des Wassers so einzustellen, dass es für den täglichen Gebrauch geeignet ist. 

Vollständig enthärtetes Wasser kann in manchen Fällen zu aggressiv für Rohre oder Haushaltsgeräte sein. 

Durch die Verschnittarmatur lässt sich der Wasserhärtegrad genau an die individuellen Bedürfnisse anpassen.
',12,NULL);
INSERT INTO "SubchapterContent" VALUES (566,27,'[section]Aufbau Verschneidearmatur[/section]

[LF_5_Verschneidearmatur_Schnitt_zoom]

[bold]1 Absperrventil Zulauf Enthärtungsanlage[/bold]
Dieses Ventil steuert den Wasserfluss zur Enthärtungsanlage. 
Wenn es geöffnet ist, kann das Wasser zur Enthärtung in die Anlage fließen.

[bold]2 Absperrventil Bypass[/bold]
Dieses Ventil ermöglicht es, den Bypass zu aktivieren, wodurch das Wasser die Enthärtungsanlage umgeht und ungefiltert oder unbehandelt direkt weitergeleitet wird.

[bold]3 Absperrventil Rücklauf Enthärtungsanlage[/bold]
Dieses Ventil regelt den Wasserfluss aus der Enthärtungsanlage zurück in die Hauptleitung oder den Wasserverteilungsweg.

[bold]4 Wassereingang[/bold]
Der Eingang, durch den das Wasser in die Armatur strömt, bevor es durch die verschiedenen Ventile geleitet wird.

[bold]5 Zulauf Enthärtungsanlage[/bold]
Hier fließt das Wasser zur Enthärtungsanlage, wenn das Absperrventil des Zulaufs geöffnet ist.

[bold]6 Rücklauf Enthärtungsanlage[/bold]
Hier tritt das enthärtete Wasser aus der Anlage aus und fließt zurück in die Armatur, bevor es durch das Rücklaufventil in die Hauptleitung gelangt.

[bold]7 Abgang[/bold]
Der Ausgang, durch den das Wasser die Armatur verlässt und zu den Verbrauchern oder in das Rohrsystem weitergeleitet wird.',13,NULL);
INSERT INTO "SubchapterContent" VALUES (567,7,'[section]Feilen von Metall[/section]

Feilen ist ein spanabhebendes Verfahren, bei dem das Metall durch viele kleine Zähne abgetragen wird. 

Feilen werden verwendet, um scharfe Kanten zu entfernen, Oberflächen zu glätten oder präzise Formen herzustellen.

Es gibt verschiedene Feilenarten, die je nach Form und Anzahl der Zähne für unterschiedliche Anwendungen geeignet sind:

[bullet]Flachfeilen - Für gerade Oberflächen.[/bullet]
[bullet]Rundfeilen - Für runde Öffnungen.[/bullet]
[bullet]Dreikantfeilen - Für Winkel und Ecken.[/bullet]
[LF_1_Metallfeile_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (569,11,'[subheading]Dübel[/subheading]

Dübel werden verwendet, um stabile Befestigungen oder Verbindungen in Materialien wie Stein, Gipskartonplatten oder Beton herzustellen. 
Ein Unterscheidungsmerkmal bei Dübeln ist die Art der Kraftaufnahme:

[bullet]Reibschlüssige Kraftaufnahme - Der Dübel wird durch Verklemmen und die Reibung zwischen dem Material und dem Dübel in der Wand gehalten.[/bullet]

[bullet]Formschlüssige Kraftaufnahme - Der Dübel verändert beim Befestigen seine Form, sodass er sich so verankert, dass er nicht mehr durch das ursprüngliche Bohrloch passt.[/bullet]

Sie sind auf unterschiedliche Materialien und Zwecke ausgelegt:

[bold]Allzweckdübel[/bold]
Ein Kunststoff-Spreizdübel, der sich beim Einschrauben spreizt und sich so im Material verankert. 
Die Tragfähigkeit variiert je nach Größe. 
Je nach eingesetztem Material wirken sie kraftschlüssig oder reibschlüssig.
[LF_2_Dübel_1_zoom]
[bold]Dämmstoffdübel[/bold]
Diese Dübel dienen zur Befestigung von Dämmplatten aus Materialien wie Polystyrol oder PUR.

[bold]Gipskartondübel[/bold]
Ideal für Decken und Wände aus Gipskartonplatten oder anderen Plattenbaustoffen, sowie für Hohldecken geeignet. 
Sie sind formschlüssig, da das Material oft zu dünn ist, um genügend Reibung zu erzeugen.

[bold]Injektionsdübel und Verbundanker[/bold]
Diese Dübel eignen sich für hochbelastete Verbindungen. 
Sie bestehen oft aus einem siebartigen Dübel, der mit chemischem Kleber oder Mörtel gefüllt wird, um anschließend eine Gewindestange mit Regelgewinde zu verankern.
[LF_2_Injektionsdübel_zoom]
[bold]Verbundanker[/bold]
Verbundanker bestehen aus mit Klebstoff gefüllten Glaszylindern, die in das Bohrloch eingesetzt werden. 
[LF_2_Klebeanker_zoom]
Beim Eindrehen oder Einschlagen der Gewindestange wird der Glaszylinder zerbrochen, wodurch der Klebstoff austritt und die Stange fest verankert wird.

[bold]Einschlagdübel[/bold]
Einschlagdübel dienen der Befestigung in Beton, Naturstein und anderen festen Materialien. 
Sie bestehen aus einem Kunststoff- oder Metallstift und einem passenden Dübel, der beim Einschlagen verformt wird und so eine stabile Verankerung ermöglicht. 
[LF_2_Einschlagdübel_zoom]
Diese Dübel finden Anwendung in Bereichen wie Bau, Möbelmontage und Handwerk und sorgen für zuverlässigen Halt.
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (570,66,'[heading]Übersicht Leitungsanlage[/heading]


[LF_5_Leitungsanlage_zoom]

Eine Leitungsanlage für Trinkwasser umfasst alle Komponenten, die für den Transport und die Verteilung von sauberem Wasser in einem Gebäude notwendig sind. ',1,NULL);
INSERT INTO "SubchapterContent" VALUES (571,66,'[subheading]Anschlussleitung[/subheading]

Die Anschlussleitung verbindet das öffentliche Wassernetz mit dem Hausanschluss (Wasserzählanlage).

[LF_5_Anschlussleitung_zoom]',2,NULL);
INSERT INTO "SubchapterContent" VALUES (572,66,'[subheading]Wasserzählanlage[/subheading]

Wasserzählanlage besteht aus HAE (Hauptabsperrarmatur),Wasserzähler, Absperrarmatur mit Entleerung,Prüfbarer Rückflussverhinderer. 

[LF_5_Wasserzählanlage_zoom]
',3,'');
INSERT INTO "SubchapterContent" VALUES (573,66,'[subheading]Verbrauchsleitungen[/subheading]

Alle Leitungen, die nach der Wasserzähleranlage folgen, werden als Verbrauchsleitungen bezeichnet. 

Sie transportieren das Trinkwasser innerhalb des Gebäudes von der Hauptleitung zu den einzelnen Entnahmestellen, wie beispielsweise Wasserhähnen, Duschen oder Toiletten. 

[LF_5_Verbrauchsleitungen_zoom]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (574,66,'[section]Steigleitungen[/section]

Die Steigleitungen sorgen für die Verteilung des Trinkwassers in die verschiedenen Stockwerke eines Gebäudes. 

Sie verlaufen meist senkrecht und verbinden die Hauptleitung mit den Stockwerksleitungen.

[LF_5_Steigleitung_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (575,66,'[section]Stockwerksleitungen[/section]

Die Stockwerksleitung verteilen das Trinkwasser in einem einzelnen Stockwerk.

[LF_5_Stockwerksleitungen_zoom]

[section]Einzelzuleitung[/section]

Eine Einzelzuleitung führt direkt zu einer einzelnen Entnahmestelle, zum Beispiel von der Stockwerksleitung zu einem Wasserhahn. 

[LF_5_Einzelzuleitung_zoom]',6,NULL);
INSERT INTO "SubchapterContent" VALUES (576,4,'[section]Edelstahl[/section]

Edelstahl ist ein legierter Stahl, der mindestens 10,5 % Chrom enthält.

Das Chrom bildet eine Schutzschicht auf der Oberfläche, die den Stahl vor Rost schützt. 

Außerdem werden oft Nickel und andere Elemente hinzugefügt, um die Korrosionsbeständigkeit und Festigkeit weiter zu erhöhen. 

Dadurch ist Edelstahl besonders langlebig und rostfrei.
[LF_1_Edelstahl]
[bold]Verwendung[/bold]
Edelstahl wird oft für Rohre, Geländer, Küchenutensilien und in der Architektur verwendet, da er langlebig, leicht zu reinigen und korrosionsbeständig ist.

[bold]Dichte[/bold]
7.750–8.000 kg/m³

[bold]Schmelzpunkt[/bold]
1.400–1.530 °C',8,NULL);
INSERT INTO "SubchapterContent" VALUES (577,12,'[subheading]Arten von Gewindebohrern[/subheading]

Es gibt verschiedene Arten von Gewindebohrern, die je nach Anwendungsfall und Material ausgewählt werden:

[bold]Handgewindebohrer[/bold]
Handgewindebohrer werden zum Schneiden von Gewinden von Hand verwendet. 
Sie werden dabei mit einem Windeisen gedreht. 
Meistens kommen sie im Set mit drei verschiedenen Bohrern zum Einsatz: 
Vorschneider, Mittelschneider und Fertigschneider. 
Diese drei Schritte sind notwendig, um das Gewinde Stück für Stück einzuschneiden und ein präzises Ergebnis zu erzielen. 
Handgewindebohrer eignen sich ideal für kleinere Arbeiten oder wenn keine Maschine zur Verfügung steht. 

[bold]Maschinengewindebohrer[/bold]
Maschinengewindebohrer werden bei Maschinen wie der Standbohrmaschine eingesetzt. 
Sie schneiden das Gewinde in einem einzigen Arbeitsgang und werden deshalb auch Einschnittgewindebohrer genannt.
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (578,12,'[subheading]Schritte beim Gewindeschneiden[/subheading]

Beim Außengewindeschneiden wird ein Gewinde an der Außenseite eines runden Werkstücks geschnitten. 
Dafür benötigt man ein Schneideisen, einen Schneideisenhalter und Schneidöl.
[LF_2_Gewindeschneider_zoom]

[bullet]Bolzen im Schraubstock einspannen und das Ende anfasen.[/bullet]
[bullet]Schneideisen im Halter befestigen und Schneidöl auftragen.[/bullet]
[bullet]Schneideisen aufsetzen und im Uhrzeigersinn drehen, dabei regelmäßig zurückdrehen, um Späne zu brechen.[/bullet]
[bullet]Gewinde testen und ggf. nachschneiden.[/bullet]
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (579,67,'[heading]Schallschutz[/heading]

[LF_2_Schallschutz_welcome]

Schallschutz ist in der Planung und Installation von Sanitäranlagen notwendig, um den Komfort in Gebäuden zu erhöhen und störende Geräusche zu reduzieren.',1,NULL);
INSERT INTO "SubchapterContent" VALUES (580,67,'[subheading]Was ist Schallschutz?[/subheading]

Schallschutz befasst sich mit der Reduzierung und Kontrolle von Geräuschen in Gebäuden. 

Ziel ist es, die Ausbreitung von Lärm zu mindern, um Wohn- und Arbeitsbereiche ruhiger und angenehmer zu gestalten. 

Sowohl die Raumaufteilung als auch die Wahl geräuscharmer Materialien und Bauteile tragen dazu bei.',2,'');
INSERT INTO "SubchapterContent" VALUES (581,67,'[subheading]Messung von Schall[/subheading]

Schall wird in Dezibel (dB) gemessen, was die Lautstärke angibt. 

Die Schalldruckpegel werden dabei in Bezug auf die Hörschwelle angegeben, wobei bereits 20 dB als hörbar gelten. 
[LF_2_DB_Skala_zoom]
Die Einhaltung bestimmter Grenzwerte in Gebäuden wird durch DIN-Normen geregelt, die je nach Raumart verschiedene Maximalpegel festlegen.
',3,NULL);
INSERT INTO "SubchapterContent" VALUES (582,67,'[subheading]Luftschall und Körperschall[/subheading]

Luftschall breitet sich durch die Luft aus, etwa bei Geräuschen von Lüftungsanlagen oder Ventilatoren. 

Körperschall entsteht, wenn Schallwellen durch feste Materialien wie Wände oder Rohre übertragen werden. 

Beide Schallarten können durch Dämpfung und Isolierung gemindert werden.
',4,NULL);
INSERT INTO "SubchapterContent" VALUES (583,67,'[subheading]Maßnahmen zur Schalldämpfung[/subheading]

Schalldämpfung erfolgt durch das Absorbieren von Schallwellen oder deren Umwandlung in Wärme. 

Offenzellige Materialien wie Mineralwolle oder Schaumstoffe bieten gute Dämmeigenschaften. 

Auch spezielle Dämpfungselemente können Schallübertragung zwischen Räumen reduzieren.
',6,NULL);
INSERT INTO "SubchapterContent" VALUES (584,67,'[subheading]Schalldruckpegel in haustechnischen Anlagen[/subheading]

Der Schalldruckpegel in Sanitäranlagen sollte bestimmte Grenzwerte nicht überschreiten, um die Lärmbelastung gering zu halten. 

DIN-Vorschriften legen fest, wie laut Geräusche in verschiedenen Bereichen sein dürfen. 

Um den Schalldruckpegel in haustechnischen Anlagen zu kontrollieren, kommen verschiedene Bauweisen und Materialien zum Einsatz:

[bold]Schalldämmende Rohrsysteme[/bold]
Rohre aus Materialien wie Kunststoff oder speziellen Verbundwerkstoffen reduzieren Schallübertragungen.

[bold]Entkopplungsmanschetten[/bold]
Diese Bauteile verhindern, dass Vibrationen von den Rohren auf die Gebäudestruktur übertragen werden.

[bold]Schalldämmmatten und -platten[/bold]
Diese werden an Wänden oder Decken angebracht, um Schall zu absorbieren.

[bold]Schallentkoppelte Halterungen[/bold]
Diese verhindern, dass Schwingungen von der Anlage auf die Wan
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (585,67,'[subheading]Schutz vor Luft- und Körperschall[/subheading]

Rohre und Leitungen können Geräusche über weite Strecken übertragen. 

Gummi- oder Metallelemente helfen, Körperschall zu mindern, indem sie die Vibrationen der Rohre abfangen. 

Dadurch wird verhindert, dass sich der Schall über die Gebäudestruktur ausbreitet.
',5,NULL);
INSERT INTO "SubchapterContent" VALUES (586,67,'[subheading]Trittschalldämmung und Schallschutzmaßnahmen[/subheading]

Trittschalldämmung verringert den Lärm, der durch Schritte auf Böden entsteht. 

Spezielle Polstermatten oder elastische Bodenbeläge können die Schallübertragung verringern. 

Auch Entkopplungen von Wänden tragen zur Lärmreduktion bei.
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (587,11,'[subheading]Schraubverbindungen[/subheading]

Beim Herstellen von Schraubverbindungen ist das passende Anziehdrehmoment entscheidend, damit die Verbindung sicher hält. Spezielle Schraubentypen sind:

[bold]Holzschrauben[/bold]
Holzschrauben werden direkt ins Holz geschraubt und sorgen für stabile Verbindungen ohne den Einsatz von Dübeln. 
Ihre besondere Spitzenform verhindert das Spalten des Holzes beim Eindrehen.

[bold]Grobgewindeschrauben[/bold]
Grobgewindeschrauben für Dübel werden in Dübel eingedreht und eignen sich ideal für Verbindungen in Mauerwerk oder anderen Materialien, die zusätzliche Verankerung benötigen. 
Sie sind in verschiedenen Kopfformen erhältlich, wie zum Beispiel Sechskant, Zylinderkopf mit Innensechskant oder Linsenkopf. 
Zudem gibt es Varianten mit Regelgewinde am Ende, wie etwa Stockschrauben, die häufig zur Befestigung von Rohrschellen verwendet werden.
Die folgende Tabelle zeigt, welche Schrauben für welche Dübel geeignet sind, damit die Verbindung sicher hält.

[bold]Blechschrauben[/bold]
Blechschrauben sind für das Verschrauben in Blech und anderen dünnen Materialien wie Hartkunststoff konzipiert. 
Sie sind sowohl mit als auch ohne Schneidspitze erhältlich. 
Die Schneidspitze bohrt beim Eindrehen ein passgenaues Loch für das nachfolgende Gewinde, sodass ein Vorbohren in der Regel nicht erforderlich ist.

[LF_2_Dübelgröße_zoom]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (588,15,'[section]Autogenschweißen[/section]

[bold]Verfahren[/bold]
Beim Autogenschweißen wird eine Flamme aus Acetylen und Sauerstoff verwendet, um die Werkstücke zu erhitzen und zu verbinden. 
Die Flamme erzeugt die nötige Hitze, ohne eine externe Stromquelle zu benötigen, und der Zusatzwerkstoff kann unabhängig zugeführt werden

[bold]Anwendung[/bold]
Autogenschweißen ist ideal für das Schweißen von dünnen Blechen, da die Flamme eine geringere und kontrollierbare Hitze liefert, die das Risiko von Verzug verringert. 
Es eignet sich gut für Reparaturen und schwer zugängliche Stellen im Handwerk und auf Baustellen. ',15,NULL);
INSERT INTO "SubchapterContent" VALUES (589,15,'[subheading]Gewinde[/subheading]

Wie bereits erwähnt, gehören auch Gewinde zu den unlösbaren Rohrverbindungen. Einmal fest verschraubt, lassen sie sich nur schwer wieder lösen, ohne das Rohr oder die Verbindung zu beschädigen. Für die Abdichtung werden häufig Materialien wie Hanf oder spezielle Dichtmittel verwendet, um eine dauerhafte und dichte Verbindung zu gewährleisten.

[section]Verfahren[/section]
Das Whitworth-Gewinde ist eine verbreitete Gewindeart, die einen 55°-Winkel und abgerundete Spitzen hat. 
Diese Form hilft dabei, den Druck gleichmäßig zu verteilen und verhindert, dass das Material zu stark belastet wird. 
Die abgerundeten Gewindegänge bieten zudem Platz für Dichtmaterialien, was die Verbindung zuverlässig abdichtet und Leckagen vorbeugt.

[section]Anwendung[/section]
Whitworth-Gewinde werden häufig in Wasser- und Gasleitungen sowie in Druckluftsystemen eingesetzt, da sie zuverlässig hohe Belastungen aushalten und gut gegen Vibrationen geschützt sind. 
Aufgrund ihrer standardisierten Form sind sie zudem einfach herzustellen und ermöglichen einen unkomplizierten Austausch bei Bedarf.',16,NULL);
INSERT INTO "SubchapterContent" VALUES (590,21,'[subheading]IP-Schutzarten[/subheading]

Die IP-Schutzarten definieren, wie gut elektrische Geräte gegen das Eindringen von Fremdkörpern und Wasser geschützt sind. Die erste Ziffer beschreibt den Schutz gegen Berührung und Fremdkörper, während die zweite den Schutz gegen Feuchtigkeit angibt.

[bold]Beispiele[/bold]

[bullet]IP44: Schutz vor Fremdkörpern ab 1 mm und Spritzwasser aus allen Richtungen (z.B. Badleuchten).[/bullet]
[bullet]IP65: Staubdicht und Schutz gegen Strahlwasser (z.B. Außenbeleuchtung).[/bullet]
[bullet]IP67: Staubdicht und Schutz bei zeitweiligem Untertauchen (z.B. Steckdosen im Außenbereich).[/bullet]

Die detaillierte Übersicht über die verschiedenen Schutzarten findest du hier: 
[LF_4_IP_Schutzarten_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (591,18,'[subheading]Ohmsches Gesetz[/subheading]

Das Ohmsche Gesetz erklärt, wie Spannung (U), Stromstärke (I) und Widerstand (R) zusammenhängen:

[bold]Formel[/bold]
[LF_4_Widerstand_small ]

[frame]Die Formel lässt sich wie alle physikalischen Formeln beliebig umstellen, je nachdem, welche Größe man berechnen möchte. Zum Beispiel kann man sie umformen zu U = R * I (Spannung) oder I = U / R (Stromstärke). Dies ermöglicht, je nach vorhandenen Werten, die fehlende Größe einfach zu berechnen.[/frame]

[bold]Erklärung[/bold]

[bold]U[/bold] = steht für "Urgere" (lateinisch), was auf den Druck oder Antrieb verweist, der den Strom in Bewegung setzt, also die Spannung in Volt.
[bold]I[/bold] = steht für "Intensitas" (lateinisch), was die Stärke des Stroms beschreibt, also die Stromstärke in Ampere.
[bold]R[/bold] = leitet sich vom lateinischen Wort "resistere" ab, was "widerstehen" bedeutet, und beschreibt den Widerstand in Ohm.

[bold]Beispiel[/bold]
Ein Kupferdraht mit einem Widerstand von 1,8 Ω und einer Spannung von 230 V. Wie groß ist die Stromstärke?
I = U/R = 230V/ 1,8 Ohm = 127,78 A
Das bedeutet, durch den Draht fließen 127,78 Ampere.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (592,18,'[subheading]Elektrische Leistung[/subheading]

Die elektrische Leistung beschreibt die Menge an Energie, die ein elektrisches Gerät in einer bestimmten Zeit verbraucht oder erzeugt. 
Sie wird in Watt (W) gemessen und berechnet sich durch das Produkt von Spannung (U) und Stromstärke (I). 

[bold]Formel[/bold]
[LF_4_PUI_small]

[bold]Erklärung[/bold]

[bold]P[/bold]: Leistung (englisch "Power"), gemessen in Watt (W), beschreibt die in einer bestimmten Zeitspanne umgesetzte Energie.
[bold]U[/bold]: Spannung (lateinisch "Urgere"), gemessen in Volt (V), gibt den elektrischen Druck oder Antrieb an, der den Strom fließen lässt.
[bold]I[/bold]: Stromstärke (lateinisch "Intensitas"), gemessen in Ampere (A), beschreibt die Menge an elektrischer Ladung, die pro Sekunde durch einen Leiter fließt.

Mit dieser Formel lässt sich ermitteln, wie viel Energie ein elektrisches Gerät benötigt, um zu arbeiten. 
Außerdem zeigt sie, wie viel Strom durch die Leitung fließt, die das Gerät versorgt.

[frame]Wattstunden (Wh) geben an, wie viel Energie ein Gerät in einer bestimmten Zeit verbraucht oder erzeugt. Eine Wattstunde entspricht der Menge an Energie, die ein Gerät mit einer Leistung von 1 Watt in 1 Stunde verbraucht. Wenn ein Gerät also 100 Watt Leistung hat und 1 Stunde lang läuft, verbraucht es 100 Wattstunden (Wh).[/frame]',8,NULL);
INSERT INTO "SubchapterContent" VALUES (593,23,'[subheading]Sicherer Umgang mit elektrischem Strom[/subheading]

Um sich vor den Gefahren des Stroms zu schützen, müssen einige Sicherheitsmaßnahmen beachtet werden:

[section]Isolierte Werkzeuge[/section] 
Arbeiten an elektrischen Anlagen sollten nur mit isolierten Werkzeugen durchgeführt werden. 
Diese Werkzeuge verhindern den direkten Kontakt mit spannungsführenden Teilen und verringern das Risiko eines Stromschlags.
[LF_4_Werkzeug_isoliert_zoom]
[frame]Isolierte Werkzeuge müssen eine VDE-Zulassung haben. Das bedeutet, sie wurden vom Verband der Elektrotechnik, Elektronik und Informationstechnik (VDE) geprüft und erfüllen die Sicherheitsstandards für Arbeiten an elektrischen Anlagen.[/frame]
[section]Schutzkleidung[/section] 
Das Tragen von Gummihandschuhen und isolierten Schuhen schützt den Körper vor Stromschlägen. 
Die Handschuhe isolieren die Hände, während Schuhe dafür sorgen, dass kein Strom durch den Körper zur Erde fließen kann.
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (594,19,'[subheading]Fehlerstrom-Schutzeinrichtungen (RCD)[/subheading]

Ein Fehlerstromschutzschalter (RCD) schützt Personen vor gefährlichen Stromunfällen, indem er den Stromkreis unterbricht, wenn ein Fehlerstrom gegen Erde fließt. 

Er erkennt, wenn ein Differenzstrom, wie etwa durch den menschlichen Körper, fließt und trennt den Stromkreis sofort. 
Das verhindert Stromschläge und reduziert das Risiko von Bränden.
[LF_4_Fehlerstromschutz_zoom]
Ein RCD misst kontinuierlich den Strom, der in den Stromkreis fließt, und vergleicht ihn mit dem Strom, der zurückfließt. 
Wenn ein Unterschied (Fehlerstrom) festgestellt wird, schaltet der RCD den Strom ab.

[frame]In Deutschland ist der Einsatz von RCDs mit einem Nennfehlerstrom von maximal 30 mA für Steckdosenstromkreise vorgeschrieben. Die regelmäßige Prüfung des RCDs wird empfohlen, etwa halbjährlich über die Testtaste, um die Funktion zu überprüfen.[/frame]
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (595,20,'[subheading]Der Stromlaufplan[/subheading]

Ein Stromlaufplan stellt den genauen Stromweg durch eine Schaltung dar. 
Er zeigt, wie die Bauteile elektrisch miteinander verbunden sind.

Stromlaufpläne sind hilfreich bei komplexen Schaltungen, da sie die elektrischen Verbindungen zwischen den Bauteilen übersichtlich darstellen.

Hier siehst du den [bold]Stromlaufplan[/bold] für die Schaltung:
[LF_4_Stromlaufplan_zoom]
Und hier ist der [bold]Stromlaufplan in einer räumlichen Darstellung[/bold] zu sehen, der die Kabelverlegung und die Anordnung der Bauteile im Raum zeigt:
[LF_4_Stromlaufplan_2_zoom]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (597,24,'[subheading]Mehrschichtverbundrohre[/subheading]

Mehrschichtverbundrohre bestehen aus mehreren Schichten, die Kunststoff und Aluminium kombinieren. 
Diese Bauweise macht sie besonders flexibel und leicht zu verarbeiten, was sie ideal für enge Installationsbereiche macht. 

Durch die Aluminium-Schicht behalten sie ihre Form auch nach dem Biegen und sind widerstandsfähig gegen hohe Temperaturen und Drücke. 
Sie sind korrosionsbeständig, unempfindlich gegenüber aggressiven Wasserarten, wie beispielsweise in Regionen mit saurem Wasser, und bieten zudem eine hohe Diffusionsdichtigkeit, wodurch Sauerstoff nicht in das System eindringen kann. 
[LF_5_Mehrschichtverbundrohr_zoom]
[bold]Vorteile:[/bold]

[bullet]Flexibel und leicht zu verarbeiten[/bullet]
[bullet]Korrosionsbeständig[/bullet]
[bullet]Hohe Temperatur- und Druckbeständigkeit[/bullet]

[bold]Nachteile:[/bold]

[bullet]Weniger widerstandsfähig gegenüber mechanischen Belastungen[/bullet]

',7,NULL);
INSERT INTO "SubchapterContent" VALUES (598,17,'[subheading]Wartung von Trinkwasseranlagen[/subheading]

Trinkwasseranlagen müssen regelmäßig gewartet werden, um ihre sichere Funktion zu gewährleisten und Mängel zu vermeiden.
[LF_4_Trinkwasser]
Zu den Wartungsaufgaben gehören die Kontrolle von Absperrventilen, Rückflussverhinderern, Filtern und Druckmindern. 
Diese Bauteile sollten in festgelegten Abständen überprüft und bei Bedarf gereinigt oder ausgetauscht werden. 
So wird ein störungsfreier Betrieb und eine gute Wasserqualität sichergestellt. 

',5,NULL);
INSERT INTO "SubchapterContent" VALUES (599,23,'[subheading]Speisepunkte[/subheading]

Auf Baustellen oder in Werkstätten werden Speisepunkte für den Anschluss von elektrischen Geräten benötigt. 
Diese müssen mit einem Fehlerstromschutzschalter (RCD) ausgestattet sein.
Ist kein RCD vorhanden, muss er als Personenschutzschalter (Steckerform) zwischengeschaltet werden.

[bold]Anforderungen:[/bold]

[bullet]Fehlerstromschutzschalter (RCD) mit einer Auslöseschwelle von 30 mA[/bullet]
[bullet]Schutzisolierung (Schutzklasse II)[/bullet]

[frame]RCD steht für Residual Current Device (Fehlerstromschutzschalter). Er überwacht den Stromkreis und schaltet ihn ab, wenn ein Fehlerstrom erkannt wird, um Unfälle zu verhindern.[/frame]
',9,NULL);
INSERT INTO "SubchapterContent" VALUES (600,29,'[section]Der Freie Auslauf[/section]

Der freie Auslauf ist eine einfache und zuverlässige Methode, um Rückfluss von verunreinigtem Wasser zu verhindern. 
Dabei wird ein offener Abstand zwischen der Trinkwasserleitung und der nachgeschalteten Anlage geschaffen, sodass kein direkter Kontakt zwischen Trinkwasser und potenziell verschmutztem Wasser besteht. 
Der abstand zum höchstmöglichen Wasserspiegel muss größer des Doppelten Auslaufdurchmessers, mindestens jedoch 20 mm sein. 
[LF_5_freier_Auslauf_zoom]
Diese Methode findet häufig Anwendung bei Wasserentnahmestellen wie Waschbecken, Badewannen oder offenen Behältern.',4,NULL);
INSERT INTO "SubchapterContent" VALUES (601,27,'[section]Anwendungsbeispiele zur Entsalzung[/section]

Man kann Umkehrosmose nutzen, um Trinkwasser aus salzhaltigem Wasser zu gewinnen.
In der Industrie wird Entsalzung eingesetzt, um Wasser für sensible Produktionsprozesse vorzubereiten.
In der Schifffahrt oder in Wüstenregionen wird Meerwasser durch Entsalzung trinkbar gemacht.

[frame]Besonders in Heizungsanlagen ist die Entsalzung wichtig, um Korrosion und Ablagerungen zu vermeiden. Die Patronen müssen je nach Nutzung regelmäßig ausgetauscht werden, um eine gleichbleibende Wasserqualität zu gewährleisten.[/frame]
',8,NULL);
INSERT INTO "SubchapterContent" VALUES (602,29,'[section]Rohrtrenner[/section]

Rohrtrenner verhindern das Rücksaugen von Wasser in die Trinkwasserleitung. 

Sie bestehen aus zwei Rückflussverhinderern und einer Mitteldruckzone. 

Wenn der Druck in der Mitteldruckzone sinkt, wird der Wasserdurchfluss unterbrochen, um das Rücksaugen von verunreinigtem Wasser zu verhindern.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (603,29,'[section]Rohrbelüfter[/section]

Ein Rohrbelüfter ist eine Armatur, die dafür sorgt, dass Luft in das Rohrleitungssystem einströmen kann, um ein Rücksaugen von verunreinigtem Wasser zu verhindern. 

Er wird vor allem in Situationen eingesetzt, in denen es bei einem Druckabfall in der Leitung zu einem Unterdruck kommen könnte, wodurch Wasser aus nachgeschalteten Anlagen ins Trinkwassersystem zurückgesogen werden könnte. 
[LF_5_Rohrbelüfter_zoom]
Der Rohrbelüfter öffnet sich bei Druckabfall und lässt Luft einströmen, was den Rücksaugeffekt verhindert und so das Trinkwasser vor Verunreinigungen schützt.
[LF_5_Rohrbelüfter_2_zoom]',8,NULL);
INSERT INTO "SubchapterContent" VALUES (604,29,'[section]Sicherungskombination[/section]

Sicherungskombinationen sind Armaturen, die mehrere Schutzmechanismen in einem Bauteil vereinen, um das Trinkwassersystem zuverlässig vor Rückfluss und Rücksaugen zu schützen. 
Typische Kombinationen bestehen aus einem [bold]Rückflussverhinderer[/bold] und einem [bold]Rohrbelüfter[/bold], die gemeinsam verhindern, dass verunreinigtes Wasser ins Trinkwassersystem gelangt. 

Diese Kombinationen werden häufig an sensiblen Stellen, wie Entnahmestellen oder Geräten, verwendet, um mehrere Sicherheitsfunktionen in einer Einheit zu bieten und so den Schutz des Trinkwassers zu maximieren.',9,NULL);
INSERT INTO "SubchapterContent" VALUES (605,29,'[section]Schrittweises Spülen von Trinkwasserleitungen[/section]

Das Spülen von Trinkwasserleitungen erfolgt in mehreren Schritten und sollte nach einer festen Reihenfolge durchgeführt werden, um eine gründliche Reinigung zu gewährleisten:

[bold]Vorbereitung[/bold]
Alle Entnahmestellen und Armaturen müssen geöffnet und der Wasserdruck überprüft werden. 
Gegebenenfalls sind Rückspülfilter zu reinigen oder zu ersetzen.

[bold]Druckspülen mit Wasser[/bold]
Die Leitungen werden zunächst mit Leitungswasser unter normalem Systemdruck gespült. 
Dabei wird das Wasser mit hoher Fließgeschwindigkeit durch die Leitungen geleitet, um Schmutz, Ablagerungen und Fremdstoffe auszuspülen.

[bold]Reihenfolge[/bold]
Spülen beginnt bei den nächstgelegenen Entnahmestellen zum Hausanschluss und endet bei den entferntesten Stellen, um sicherzustellen, dass alle Leitungen durchgespült werden.
[LF_5_Reihenfolge_small]
[bold]Luft- und Wasserspülen (optional)[/bold]
Bei hartnäckigen Ablagerungen kann eine kombinierte Luft-Wasser-Spülung zum Einsatz kommen. 
Hier wird Druckluft eingesetzt, um die Reinigungseffizienz zu erhöhen.

[bold]Spüldauer[/bold]
Das Spülen dauert in der Regel einige Minuten bis zu einer Stunde, abhängig von der Länge und dem Zustand der Leitungen. 
Das Wasser sollte so lange laufen, bis es klar und ohne Verfärbungen austritt.

[bold]Nachspülen[/bold]
Nach dem Hauptspülen wird oft noch ein Nachspülen bei geringem Druck durchgeführt, um sicherzustellen, dass keine Reststoffe zurückbleiben.',13,NULL);
INSERT INTO "SubchapterContent" VALUES (606,29,'[section]Schließreihenfolge beim Spülen von Trinkwasserleitungen[/section]

Die Schließreihenfolge beim Spülen von Trinkwasserleitungen ist ebenfalls wichtig, um eine vollständige und effektive Reinigung zu gewährleisten:

[bold]Entfernteste Entnahmestelle zuerst schließen:[/bold] 
Beginne mit dem Schließen der Entnahmestellen, die am weitesten vom Hausanschluss entfernt sind. 
Dies sorgt dafür, dass alle Leitungen bis zum Ende gründlich durchgespült werden, bevor der Fluss an den entfernteren Stellen unterbrochen wird.

[bold]Schrittweises Schließen nach vorne:[/bold]
Danach schließt du nach und nach die Entnahmestellen, die näher am Hausanschluss liegen, bis schließlich die letzte, also die am nächsten gelegene Entnahmestelle, geschlossen wird.

Durch diese Schließreihenfolge wird sichergestellt, dass kein Schmutz oder Ablagerungen in den weiter entfernten Leitungen verbleiben und das gesamte Leitungssystem gleichmäßig gespült wird.
',14,NULL);
INSERT INTO "SubchapterContent" VALUES (607,33,'[subheading]Anforderungen[/subheading]

Die folgenden Punkte sind die wesentlichen Anforderungen an Abwasserleitungen, die in den nächsten Slides behandelt werden:

[bold]DIN-Normen[/bold] legen fest, wie Entwässerungsanlagen geplant, gebaut und gewartet werden müssen, um einen sicheren und zuverlässigen Betrieb zu gewährleisten.
[LF_6_DIN_Check_small]
[bold]Dichtheitsprüfungen[/bold] sind erforderlich, um sicherzustellen, dass die Rohrleitungen dicht sind und kein Wasser austritt, um Umweltschäden zu vermeiden. 
Diese Prüfung wird hier nur kurz erwähnt, da sie in einem späteren Abschnitt nochmals genauer betrachtet wird.

[bold]Prüfzeichen[/bold] gewährleisten die Qualität und Sicherheit der verwendeten Rohre und bestätigen ihre Eignung für den Einsatz in Entwässerungssystemen.
[LF_6_Genehmigt_small]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (608,35,'[section]Neigungsverhältnis[/section]

Diese Methode gibt das Verhältnis von Länge zu Höhe als Verhältnis an, in der Form [bold]1 : x[/bold]. 
Das Ergebnis ist wie beim Relativgefälle dimensionslos und zeigt, wie viele horizontale Längeneinheiten auf eine vertikale Höheneinheit kommen.

[bold]Formel[/bold]
[LF_6_Neigungsverhältnis_small]

[bold]Erklärung[/bold]

[bold]Iₙ[/bold] Neigungsverhältnis (dimensionslos)
[bold]Δh [/bold] Delta, Höhe (Höhenunterschied in Metern)
[bold]l[/bold] Horizontale Länge (in Metern)

[bold]Berechnung[/bold]
[LF_6_Neigungsverhältnis_Berechnung_small]

Das Neigungsverhältnis für unser Beispielrohr beträgt 1 : 25.',7,NULL);
INSERT INTO "SubchapterContent" VALUES (609,13,'[subheading]Normgrößen für Rohre[/subheading]

Der "Diameter Nominal" (DN) bezeichnet eine standardisierte Größe, die den ungefähren Innendurchmesser eines Rohrs angibt. 
Anstatt den exakten Durchmesser zu verwenden, wird ein gerundeter Wert herangezogen, um die Rohrgrößen zu vereinfachen. 
Durch diese Normung ist es möglich, Rohre aus verschiedenen Materialien, wie Metall oder Kunststoff, zu vergleichen und für ähnliche Anwendungen zu verwenden, selbst wenn ihre tatsächlichen Innendurchmesser geringfügig abweichen. 

[frame]Der DN-Wert sorgt für eine einheitliche und internationale Vergleichbarkeit von Rohrdimensionen.[/frame]',11,NULL);
INSERT INTO "SubchapterContent" VALUES (610,34,'[subheading]Übersicht Leitungsteile[/subheading]


[LF_6_Leitungen_Übersicht_zoom]',2,NULL);
INSERT INTO "SubchapterContent" VALUES (611,43,'[subheading]Flachheizkörper[/subheading]

Flachheizkörper kombinieren die direkte Wärmeabgabe über Heizplatten mit der konvektiven Wärme, die durch Konvektoren erzeugt wird. 
Heizplatten strahlen Wärme direkt ab, während Konvektoren die Luftzirkulation verstärken und so ebenfalls zur Wärmeabgabe beitragen. 
Je mehr Platten und Konvektoren ein Heizkörper hat, desto höher ist seine Gesamtwärmeleistung.

[bold]Typen und Wärmeabgabe[/bold]
[bullet]Typ 10: Eine Heizplatte, kein Konvektor[/bullet]
[bullet]Typ 11: Eine Heizplatte, ein Konvektor[/bullet]
[bullet]Typ 21: Zwei Heizplatten, ein Konvektor[/bullet]
[bullet]Typ 22: Zwei Heizplatten, zwei Konvektoren[/bullet]
[bullet]Typ 33: Drei Heizplatten, drei Konvektoren[/bullet]

[bold]Vorteile[/bold]
kompakte Bauweise und einfache Pflege
niedrigere Vorlauftemperatur möglich

[bold]Nachteile[/bold]
?
[LF_7_Flachheizkörper_zoom]
[LF_7_Flachheizkörper_Innenansicht_zoom]',5,NULL);
INSERT INTO "SubchapterContent" VALUES (612,61,'[subheading]Grundleitungsdurchführung[/subheading]

Beim Durchführen einer Grundleitung durch Mauerwerk oder Fundamente ist es wichtig, die Abdichtung korrekt auszuführen. 

An der Außenseite des Gebäudes sollte ein Gelenk aus zwei Muffen eingebaut werden. 
Dieses Gelenk erlaubt der Leitung, sich zu bewegen, falls sich das Gebäude oder die Leitung setzt. 
So wird verhindert, dass die Leitung durch Zugkräfte beschädigt wird oder abreißt.
[LF_6_Durchführung_Gelenk_zoom]',4,NULL);
INSERT INTO "SubchapterContent" VALUES (613,64,'[heading]Berechnung von Entwässerungsanlagen[/heading]

[LF_5_Berechnung_Bewässerung_welcome]

In den nächsten Slides wird die Berechnung der richtigen Rohrdimensionen für Entwässerungsanlagen behandelt.',1,'');
INSERT INTO "SubchapterContent" VALUES (614,64,'[subheading]Einzelanschlussleitungen[/subheading]

In der Abwasserplanung werden zuerst die [bold]Anschlussleitungen[/bold]  einzeln in einer Tabelle ermittelt. 
Dabei geht es darum, dass jede Entnahmestelle (z. B. WC, Waschbecken, Dusche) eine eigene Leitung bekommt, die dimensioniert werden muss, bevor diese in die Sammelanschlussleitung mündet. 

Die Ermittlung des [bold]DN[/bold] jeder Anschlussleitung erfolgt auf Basis des spezifischen [bold]Anschlusswerts (DU Wert)[/bold] der einzelnen Entnahmestelle, der von der Norm DIN 1986-100 vorgegeben wird.
[LF_5_Berechnung_Einzelanschlussanlagen_zoom]
[LF_5_Einzelanschlussleitungen_Tabelle_zoom]
',2,'');
INSERT INTO "SubchapterContent" VALUES (615,64,'[subheading]Sammelanschlussleitungen[/subheading]

Sobald die DN- und DU-Werte der Einzelanschlussleitungen festgelegt sind, wird die Sammelanschlussleitung berechnet. 
Jede Teilstrecke der Sammelanschlussleitung erhält eine eigene Dimension (DN), die ermittelt werden muss, bevor die Sammelanschlussleitung in die Falleitung übergeht. 
Dazu werden die DU-Werte der Einzelanschlussleitungen jeder Teilstrecke zu einem Summenwert (Summe DU) addiert, der dann unter Berücksichtigung der Gebäudeart (Abflusskennzahl) aus der entsprechenden Tabelle ausgewählt wird.

Ist nur ein einzelner Sanitärgegenstand angeschlossen (z. B. Küchenspüle oder Dusche), bleibt die zuvor bei den Einzelanschlussleitungen ermittelte DN unverändert.
[LF_5_Sammelanschlussleitungen_zoom]
[LF_5_Sammelanschlussleitungen_Tabelle_zoom]

[frame]Die Abflusskenzahl K berücksichtigt die Gleichzeitigkeit bei der Nutzung. D.h. Es wird beispielsweise berücksichtigt das in einer Wohnung selten gleichzeitig Geduscht und die Toilette genutzt wird.[/frame]
[LF_5_Abflusskennzahl_Tabelle_zoom]',3,'');
INSERT INTO "SubchapterContent" VALUES (616,64,'[subheading]Fallleitungsberechnung[/subheading]
Sobald die DN- und DU-Werte der Sammelanschlussleitungen festgelegt sind, wird die Fallleitung berechnet. 
Hierzu werden die [bold]DU-Werte[/bold] aller an die Fallleitung angeschlossenen Sammel- und Einzelanschlussleitungen addiert. 
Im Anschluss wird der Schmutzwasserabfluss in Liter je Sekunde (l/s) bestimmt, wobei erneut die Abflusskennzahl verwendet wird.
[LF_5_Fallleitungsberechnung_zoom]
[bold]Formel[/bold]
[LF_5_Fallleitungen_Formel_small]

[bold]Erklärung[/bold]
[bold]V̇ [/bold] - V steht für Volumen, der Punkt zeigt einen Volumenstrom (Durchfluss pro Sekunde) an.
[bold]ww[/bold] - Steht für „häusliches Schmutzwasser“ (Waste Water) aus Wohngebäuden.
[bold]K[/bold] - Abflusskennzahl, abhängig von der Gebäudeart; berücksichtigt unterschiedliche Abflussverhältnisse.
[bold]√Summe DU[/bold] - Wurzel der Summen-DU-Werte aller angeschlossenen Leitungen, als Basis für die Dimensionierung.

',4,'');
INSERT INTO "SubchapterContent" VALUES (617,64,'[subheading]Berechnungsbeispiel für eine Fallleitungen[/subheading]

In diesem Beispiel wird gezeigt, wie die Dimension [bold]DN[/bold] einer Fallleitung auf Basis der [bold]Summen-DU-Werte[/bold] und der Abflusskennzahl [bold]K[/bold] berechnet wird. 
Die Abflusskennzahl K berücksichtigt dabei die Gleichzeitigkeit bei der Nutzung, also die Wahrscheinlichkeit, dass mehrere Entnahmestellen zur selben Zeit genutzt werden (z. B. Dusche und Toilette in einer Wohnung).

Schritte zur Berechnung der Fallleitung:

[section]1. Ermittlung der Summe der DU-Werte:[/section]

[bullet]Anschlussleitung 1: 0,5 DU[/bullet]
[bullet]Sammelanschlussleitung 2: 2,6 DU[/bullet]
[bullet]Gesamtsumme DU: 0,5 + 2,6 = 3,1 DU[/bullet]

[section]2. Festlegung der Abflusskennzahl K:[/section]

Für ein Wohngebäude beträgt die Abflusskennzahl K = 0,5. 
Diese Kennzahl berücksichtigt die Wahrscheinlichkeit der gleichzeitigen Nutzung mehrerer Abwasserstellen.

[section]3. Berechnung des Schmutzwasserabflusses[/section]

Mit der Abflusskennzahl K = 0,5 und der Summe DU von 3,1 ergibt sich:
[LF_5_Berechnung_Fallleitung_small]
Der berechnete Schmutzwasserabfluss beträgt also [bold]1,76 l/s[/bold].

[section]4. Auswahl der Rohrdimension (DN):[/section]

Laut Regel wird der höchste Einzelwert der DU-Werte verwendet, wenn dieser höher ist als der berechnete Schmutzwasserabfluss.
In diesem Fall ist der höchste DU-Wert 2 DU, was den berechneten Abfluss von 1,76 l/s übersteigt.
Daher wird der Wert von 2 l/s als maßgeblicher Abfluss herangezogen.

[section]5. Ergebnis:[/section]

Gemäß der Tabellenangaben entspricht ein Abfluss von 2 l/s einer Rohrdimension von [bold]DN 80[/bold].',5,'');
INSERT INTO "SubchapterContent" VALUES (618,64,'[subheading]Grund und Sammelleitungen[/subheading]

Sobald die DN- und DU-Werte der Fallleitungen festgelegt sind, erfolgt die Berechnung der Grund- oder Sammelleitung. 
[LF_5_Berechnung_Grund_Sammelleitung_zoom]
Der Rechenweg ähnelt dabei der Berechnung der Fallleitungen. 
Hierbei werden die DU-Werte aller an die zu berechnende Teilstrecke angeschlossenen Fallleitungen summiert. 
Anschließend wird der Schmutzwasserabfluss in l/s ermittelt, wobei erneut die Abflusskennzahl K verwendet wird.

Auch hier ist die [bold]Formel[/bold]
[LF_5_Fallleitungen_Formel_small]
',6,'');
INSERT INTO "SubchapterContent" VALUES (619,64,'[subheading]Berechnungsbeispiel für Teilstrecken[/subheading]

[section]1. Berechnung der Summe DU für jede Teilstrecke:[/section]

[bold]Teilstrecke 1:[/bold]
[bullet]Fallleitung 1 hat einen DU-Wert von 13 DU[/bullet]
[bullet]Gesamtsumme DU für Teilstrecke 1: 13 DU[/bullet]
Gesamtsumme DU für Teilstrecke 1: 13 DU

[bold]Teilstrecke 2:[/bold]
[bullet]Fallleitung 1: 13 DU[/bullet]
[bullet]Fallleitung 2: 11 DU[/bullet]
Gesamtsumme DU für Teilstrecke 2: 13 + 11 = 24 DU

[section]2. Berechnung des Schmutzwasserabflusses für jede Teilstrecke:[/section]

[bold]Teilstrecke 1:[/bold]
[LF_5_Berechnung_Teilstrecke_1_small]
[bold]Teilstrecke 2:[/bold]
[LF_5_Berechnung_Teilstrecke_2_small]

[section]3. Auswahl der Rohrdimension (DN):[/section]

Laut Regel wird der höchste Einzelwert der DU-Werte verwendet, wenn dieser höher ist als der berechnete Schmutzwasserabfluss.
In Teilstrecke 1 ist der berechnete Abfluss 1,8 l/s. 
Da der höchste DU-Wert jedoch 2 DU beträgt, wird dieser höhere Wert verwendet.

[section]4.1. Ergebnis für Teilstrecke 1:[/section]

Da der höchste DU-Wert 2 DU beträgt, wird ein Abfluss von 2 l/s herangezogen.
Aus der Tabelle ergibt sich dafür bei einem Gefälle von 1% eine Rohrdimension  von [bold]DN 100[/bold].

[section]4.2. Ergebnis für Teilstrecke 2:[/section]
Bei einem Schmutzwasserabfluss von 2,45 l/s ergibt sich auch für die Teilstrecke 2 eine Rohrdimension von [bold]DN 100[/bold] bei einem Gefälle von 1%.
',7,NULL);
INSERT INTO "SubchapterContent" VALUES (620,61,'[section]Beispiel zur Dichtheitsprüfung[/section]

Ein Rohr mit Schacht und einem Innendurchmesser von [bold]80 mm[/bold] und einer Länge von [bold]50 m[/bold] wird einer Dichtheitsprüfung unterzogen. 
Dabei wird es mit Wasser gefüllt und 30 Minuten lang beobachtet. 
Die Berechnung zeigt, wie viel Wasser maximal austreten darf, um die Dichtheit des Rohrs zu bestätigen:

[bold]Berechnung der benetzten Innenfläche[/bold]
[LF_6_Formel_dichtheit_small]

[bold]A[/bold] ist die Fläche (engl. Area)
[bold]π[/bold] steht für Pi, ca. 3,14
[bold]d[/bold] ist der Rohrdurchmesser
[bold]l[/bold] steht für die Rohrlänge

A = 3,14 * 0,08 m * 50 m
A = 12,56 m²

[bold]Maximal zulässiger Wasserverlust[/bold]
Volumen (V) = 0,2 l/m² * 12,56 m²
V = 2,51 l

Das bedeutet, dass innerhalb von 30 Minuten maximal [bold]2,51 Liter[/bold] Wasser austreten dürfen. 
Wenn der Verlust diesen Wert übersteigt, gilt das Rohr als undicht.

[frame]Alternativ zur Dichtheitsprüfung mit Wasser ist auch eine Prüfung mit Luft möglich. Dabei müssen je nach Rohrdimension unterschiedliche Prüfdauern und Prüfdrucke aus dem Tabellenbuch entnommen und entsprechend angewendet werden. Die Vorgaben hierfür sind in der DIN EN 1610 festgelegt.[/frame]',6,NULL);
INSERT INTO "Subchapters" VALUES (1,1,'Technische Zeichungen',1,'LF_1_techn_Zeichnung_welcome');
INSERT INTO "Subchapters" VALUES (2,1,'Bauzeichnungen lesen',2,'LF_1_Bauzeichnung_welcome');
INSERT INTO "Subchapters" VALUES (3,1,'Symbole und Sinnbilder',3,'LF_1_Symbole_welcome');
INSERT INTO "Subchapters" VALUES (4,1,'Werkstoffe und Baustoffe in unserem Beruf',4,'LF_1_Werkstoffe_welcome');
INSERT INTO "Subchapters" VALUES (5,1,'Prüfen und Messen',5,'LF_1_Prüfen_Messen_welcome');
INSERT INTO "Subchapters" VALUES (6,1,'Kundenauftrag ',6,'LF_1_Kundenauftrag_welcome');
INSERT INTO "Subchapters" VALUES (7,1,'Bearbeiten von Metallen mit Handwerkzeugen',7,'LF_1_Metalle_welcome');
INSERT INTO "Subchapters" VALUES (8,2,'Arbeitssicherheit',1,'LF_1_Arbeitsschutz_welcome');
INSERT INTO "Subchapters" VALUES (9,2,'Bohren
',2,'LF_2_Bohrer_welcome');
INSERT INTO "Subchapters" VALUES (10,2,'Trennen und Schleifen',3,'LF_2_Trennschleifen_welcome');
INSERT INTO "Subchapters" VALUES (11,2,'Befestigungstechniken',4,'LF_2_Befestigung_welcome');
INSERT INTO "Subchapters" VALUES (12,2,'Gewinde',5,'LF_2_Gewinde_welcome');
INSERT INTO "Subchapters" VALUES (13,3,'Werkstoffkunde Rohrmaterial',1,'LF_3_Rohre_welcome');
INSERT INTO "Subchapters" VALUES (14,3,'Lösbare Rohrverbindungen',2,'LF_3_Lösbare_Verbindungen_welcome');
INSERT INTO "Subchapters" VALUES (15,3,'Unlösbare Rohrverbindungen',3,'LF_3_Unlösbar_welcome');
INSERT INTO "Subchapters" VALUES (16,3,'Bauteile mit Plänen und Skizzen erstellen',4,'LF_4_Baugruppen_welcome');
INSERT INTO "Subchapters" VALUES (17,4,'Einführung Instandhaltung',1,'LF_4_Instandhalten_welcome');
INSERT INTO "Subchapters" VALUES (18,4,'Einführung in die Elektrotechnik',2,'LF_4_Elektrotechnik_welcome');
INSERT INTO "Subchapters" VALUES (19,4,'Schutzeinrichtungen in der Elektrotechnik',3,'LF_4_Schutzeinrichtungen_welcome');
INSERT INTO "Subchapters" VALUES (20,4,'Elektrische Schaltpläne',4,'LF_4_Pläne_welcome');
INSERT INTO "Subchapters" VALUES (21,4,'Elektrische Installation',5,'LF_4_Elektrische_Installation_welcome');
INSERT INTO "Subchapters" VALUES (22,4,'Mess- und Prüftechnik',6,'LF_4_Mess_Prüftechnik_welcome');
INSERT INTO "Subchapters" VALUES (23,4,'Arbeitsschutz in der Elektrotechnik',7,'LF_4_Arbeitsschutz_welcome');
INSERT INTO "Subchapters" VALUES (24,5,'Trinwasserohre: Materialien im Überblick',1,'LF_5_Trinkwasserrohre_welcome');
INSERT INTO "Subchapters" VALUES (25,5,'Unser Trinkwasser',2,'LF_5_Trinkwasser_welcome');
INSERT INTO "Subchapters" VALUES (26,5,'Korrosion in Trinkwasseranlagen',3,'LF_5_Korrosion_welcome');
INSERT INTO "Subchapters" VALUES (27,5,'Aufbereitung von Trinkwasser',4,'LF_5_Aufbereitung_welcome');
INSERT INTO "Subchapters" VALUES (28,5,'Druckminderer und Wasserzähler',6,'LF_5_Druckminderer_welcome');
INSERT INTO "Subchapters" VALUES (29,5,'Schutz des Trinkwassers',7,'LF_5_Schutz_welcome');
INSERT INTO "Subchapters" VALUES (30,5,'Prüfen und Inbetriebnahme',8,'LF_5_Prüfen_welcome');
INSERT INTO "Subchapters" VALUES (31,5,'Druck und Strömung in Trinkwasseranlagen',9,NULL);
INSERT INTO "Subchapters" VALUES (32,6,'Abwasserarten',1,'LF_6_welcome');
INSERT INTO "Subchapters" VALUES (33,6,'Abwasserleitungen und deren Anforderungen',2,'LF_6_Abwasserleitungen_welcome');
INSERT INTO "Subchapters" VALUES (34,6,'Leitungsteile der Entwässerungsanlage',6,'LF_6_Leitungsteile_welcome');
INSERT INTO "Subchapters" VALUES (35,6,'Gefälle',3,'LF_6_Gefälle_2');
INSERT INTO "Subchapters" VALUES (36,6,'Füllungsgrad',4,'LF_6_Füllgrad_welcome');
INSERT INTO "Subchapters" VALUES (37,6,'Rohrwerkstoffe Abwasserleitungen',5,'LF_6_Rohrwerkstoffe_welcome');
INSERT INTO "Subchapters" VALUES (38,6,'Regenwasser',13,'LF_6_Regenwasser_welcome');
INSERT INTO "Subchapters" VALUES (39,7,'Temperatureinheiten',NULL,NULL);
INSERT INTO "Subchapters" VALUES (40,7,'Wärmetransfer',NULL,NULL);
INSERT INTO "Subchapters" VALUES (41,7,'Gebäudeenergiegesetz',NULL,NULL);
INSERT INTO "Subchapters" VALUES (43,7,'Systeme zur Raumbeheizung',NULL,NULL);
INSERT INTO "Subchapters" VALUES (44,7,'Berechnung zur Raumbeheizung',NULL,NULL);
INSERT INTO "Subchapters" VALUES (45,7,'Zweirohr- und Einrohrheizungen',NULL,NULL);
INSERT INTO "Subchapters" VALUES (46,7,'Heizungspumpe',NULL,NULL);
INSERT INTO "Subchapters" VALUES (47,7,'Hydraulicher Abgleich',NULL,NULL);
INSERT INTO "Subchapters" VALUES (48,7,'Heizkörperanschlüsse',NULL,NULL);
INSERT INTO "Subchapters" VALUES (49,7,'Rohrleitungsberechnung',NULL,NULL);
INSERT INTO "Subchapters" VALUES (50,7,'Prüfen und Inbetriebnahme',NULL,NULL);
INSERT INTO "Subchapters" VALUES (51,7,'Berechnung von Wärmeenergie',NULL,NULL);
INSERT INTO "Subchapters" VALUES (52,8,'Werkstoffkunde Sanitärausstattung',NULL,NULL);
INSERT INTO "Subchapters" VALUES (53,8,'Sanitärarmaturen',NULL,NULL);
INSERT INTO "Subchapters" VALUES (54,8,'Fliesenangepasste Installation',NULL,NULL);
INSERT INTO "Subchapters" VALUES (55,8,'Sanitär-Gegenstände',NULL,NULL);
INSERT INTO "Subchapters" VALUES (56,8,'Planung von Sanitärräumen',NULL,NULL);
INSERT INTO "Subchapters" VALUES (57,8,'Vorwandinstallationen',NULL,NULL);
INSERT INTO "Subchapters" VALUES (58,8,'Flächen- und Fugendichtung in Sanitärräumen',NULL,NULL);
INSERT INTO "Subchapters" VALUES (59,6,'Leitungsverlegung Anschlussleitungen ',8,NULL);
INSERT INTO "Subchapters" VALUES (60,6,'Leitungsverlegung Falleitungen ',9,NULL);
INSERT INTO "Subchapters" VALUES (61,6,'Leitungsverlegung Grund und Sammelleitungen',10,NULL);
INSERT INTO "Subchapters" VALUES (62,6,'Verlegung Lüftungsleitungen und Belüftungsventile ',11,NULL);
INSERT INTO "Subchapters" VALUES (63,6,'Schutz gegen Rückstau ',12,NULL);
INSERT INTO "Subchapters" VALUES (64,6,'Berechnung von Entwässerungsanlagen',14,'LF_5_Berechnung_Bewässerung_welcome');
INSERT INTO "Subchapters" VALUES (65,6,'Reinigungsöffnungen und Schächte ',7,NULL);
INSERT INTO "Subchapters" VALUES (66,5,'Übersicht Leitungsanlage',5,NULL);
INSERT INTO "Subchapters" VALUES (67,2,'Schallschutz',6,'LF_2_Schallschutz_welcome');
COMMIT;
