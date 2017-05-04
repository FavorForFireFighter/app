new File('data/fire.json').withPrintWriter {p->
    p.println('[');
    def firstLine = true;
    new File('MODIS_C6_Global_24h.csv').eachLine {
        if (firstLine) {
            firstLine = false;
        } else {
            p.println(it.replaceFirst(/^([^,]+),([^,]+),([^,]+),.*$/, '{"lat": $1, "lng": $2, "value": $3},'))
        }
    }
    p.println(']');
}
