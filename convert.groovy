def dataDir = new File('data/fire/')
dataDir.mkdirs()

def printers = [:]

def firstLine = true;
new File('VNP14IMGTDL_NRT_Global_7d-2.csv').eachLine {
    if (firstLine) {
        firstLine = false;
    } else {
        String[] line = it.split(',')
        def date = line[5]
        if (! printers.containsKey(date)) {
            printers[date] = new File(dataDir, "${date}.json").newPrintWriter()
            printers[date].println('[');
        } else {
            printers[date].println(',');
        }
        printers[date].print("""  {"lat": ${line[0]}, "lng": ${line[1]}, "value": ${line[2]}}""")
    }
}
printers.each{d,p->
    p.println();
    p.println(']');
    p.close();
}
