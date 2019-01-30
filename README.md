# app

https://github.com/cambecc/earth#getting-weather-data にある

http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.${YYYYMMDD}00

は古い。

http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_1p00.pl?file=gfs.t00z.pgrb2.1p00.f000&lev_10_m_above_ground=on&var_UGRD=on&var_VGRD=on&dir=%2Fgfs.&{YYYYMMDD}00

が正しい。

grib2形式については気象庁が公開している[国際気象通報式・別冊](https://www.jma.go.jp/jma/kishou/books/tsuhoshiki/kokusaibet/kokusaibet_28.pdf) に説明がある
