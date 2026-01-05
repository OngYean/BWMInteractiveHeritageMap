# PDF Viewer for Plants Information - BWM Interactive Heritage Map

A simple React web app that limits the source PDF file to only show the relevant pages from Vercel Blob storage using `react-pdf` and Vite.

## Plants Information

All the plants are mapped into `src/plants.json` file following the **exact** order of the original PDF document.
A table representation of it is as follows:

| ID | Malay Name | English Name | Scientific Name | Category | Pages |
|---|---|---|---|---|---|
| 0 | Bayam Brazil | Brazilian Spinach | Alternanthera sissoo | PRODUCTION | 6-7 |
| 1 | Bunga Kantan | Torch Ginger | Etlingera elatior | PRODUCTION | 9-10 |
| 2 | Cekur | Sand Ginger | Kaempferia galanga | PRODUCTION | 12-13 |
| 3 | Kunyit | Turmeric | Curcuma longa | PRODUCTION | 15-16 |
| 4 | Magnolia coco | Champaka Telur | Magnoliaceae | PRODUCTION | 18-19 |
| 5 | Misai Kucing | Cat's Whiskers | Orthosiphon aristatus | PRODUCTION | 21-22 |
| 6 | Pisang | Banana | Musa acuminata | PRODUCTION | 24-25 |
| 7 | Pokok Gincu | Red Button Ginger | Costus woodsonii | PRODUCTION | 27-28 |
| 8 | Serai | Lemongrass | Cymbopogon citratus | PRODUCTION | 30-31 |
| 9 | Pokok Manila | Manila palm | Adonidia merrillii | PRODUCTION | 33-34 |
| 10 | Daun Kari | Curry Leaf | Murraya koenigii | AROMATIC | 38-39 |
| 11 | Daun Kaduk | Wild Betel Leaf | Piper sarmentosum | AROMATIC | 41-42 |
| 12 | Gelam | - | Melaleuca cajuputi | AROMATIC | 44-45 |
| 13 | Halia Bara | Red Ginger | Alpinia purpurata | AROMATIC | 47-48 |
| 14 | Halia Cengkerang | Shell Ginger | Alpinia zerumbet | AROMATIC | 50-51 |
| 15 | Inai | Henna Tree | Lawsonia inermis | AROMATIC | 53-54 |
| 16 | Limau Kasturi | Calamansi | Citrus × microcarpa | AROMATIC | 56-57 |
| 17 | Limau Nipis | Key Lime | Citrus aurantifolia | AROMATIC | 59-60 |
| 18 | Limau Purut | Kaffir Lime | Citrus hystrix | AROMATIC | 62-63 |
| 19 | - | Oregano | Origanum vulgare | AROMATIC | 65-66 |
| 20 | Paka Merak | Peacock Clubmoss | Selaginella moellendorffii | AROMATIC | 68-69 |
| 21 | Pandan | Screwpine | Pandanus amaryllifolius | AROMATIC | 71-72 |
| 22 | Pudina | Mint | Mentha spicata | AROMATIC | 74-75 |
| 23 | Ulam Raja | Wild Cosmos | Cosmos caudatus | AROMATIC | 77-78 |
| 24 | Broadleaf Lady Palm | Broadleaf Lady Palm | Rhapis excelsa | ORNAMENTAL | 82-83 |
| 25 | Bunga Canna / Pokok Shot India | Canna Lily / Indian Shot | Canna indica | ORNAMENTAL | 85-86 |
| 26 | Pokok Pita | Ribbon Plant | Dracaena reflexa | ORNAMENTAL | 88-88 |
| 27 | Pokok Kaca Mata | Shellplant | Kalanchoe laciniata | ORNAMENTAL | 90-90 |
| 28 | Taro Hias | Ornamental Taro | Agave angustifolia | ORNAMENTAL | 92-92 |
| 29 | Pokok Kertas | Paper Plant | Alpinia zerumbet | ORNAMENTAL | 93-93 |
| 30 | Pokok Lidah Jin | Snake Plant | Sansevieria trifasciata | ORNAMENTAL | 95-95 |
| 31 | Pokok Berokok Kreta | Cretan Brake | Pteris cretica | ORNAMENTAL | 97-97 |
| 32 | Bunga Kincir Angin | Pinwheelflower | Tabernaemontana divaricata | ORNAMENTAL | 99-99 |
| 33 | Acheyaria Azurea | Acheyaria Azurea | Aechmea azurea | ORNAMENTAL | 101-102 |
| 34 | Scarlet Jungleflame | Scarlet Jungleflame | Ixora coccinea | ORNAMENTAL | 104-105 |
| 35 | Artemisia Scoparia | Artemisia Scoparia | Artemisia scoparia | ORNAMENTAL | 107-108 |
| 36 | Singkong | Cassava | Manihot esculenta | ORNAMENTAL | 110-111 |
| 37 | Bunga Ungu Cina | Chinese Violet | Asystasia gangetica | ORNAMENTAL | 113-114 |
| 38 | Pokok Tapak Dara | Madagascar Periwinkle | Catharanthus roseus | ORNAMENTAL | 116-117 |
| 39 | Pokok Rumbia | New Zealand Flax | Phormium tenax | ORNAMENTAL | 119-120 |
| 40 | Bunga Kertas | Paper Flower | Bougainvillea glabra | ORNAMENTAL | 122-123 |
| 41 | Graptophyllum pictum | Graptophyllum pictum | Graptophyllum pictum | ORNAMENTAL | 125-126 |
| 42 | Bunga Pagoda | Growing Pagoda Flower | Clerodendrum paniculatum | ORNAMENTAL | 128-129 |
| 43 | Trimezia steyermarkii | Trimezia steyermarkii | Trimezia steyermarkii | ORNAMENTAL | 131-132 |
| 44 | Pokok Ti | Ti Plant | Cordyline fruticosa | ORNAMENTAL | 134-135 |
| 45 | Paku Sarang Burung | Bird's Nest Fern | Asplenium nidus | ORNAMENTAL | 137-138 |
| 46 | Haba Neraka | Yellow Walking Iris | Trimezia steyermarkii | ORNAMENTAL | 140-141 |
| 47 | Nenas Kerang | Oyster Plant | Tradecantia spathacea | ORNAMENTAL | 143-144 |
| 48 | Palas | Mangrove Fan Palm | Licuala spinosa | ORNAMENTAL | 146-147 |
| 49 | Pokok Jenjuang | Ti Plant | Cordyline fruticosa | ORNAMENTAL | 149-150 |
| 50 | Pokok Paku Pakis | Boston Fern | Nephrolepis exaltata | ORNAMENTAL | 152-153 |
| 51 | Pokok Wuruk | Lady Palm | Rhapis excelsa | ORNAMENTAL | 155-156 |
| 52 | Bunga Telang | Butterfly Pea | Clitoria ternatea | ORNAMENTAL | 158-158 |
| 53 | Pokok Ketapang | Garden Croton | Codiaeum variegatum | ORNAMENTAL | 160-161 |
| 54 | Pokok Iris Kuning | Yellow Flag Iris | Iris pseudacorus | ORNAMENTAL | 163-163 |
| 55 | Tah | Tah | Tectona grandis (Teak) | ORNAMENTAL | 165-166 |

If there's any misinformation, please submit a pull request that corrects **BOTH** `src/plants.json` and this table in `README.md`.

You may download the QR codes for the links in the [Releases](../../releases) section.
