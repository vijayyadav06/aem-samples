searchRoot = "/content/medtronic-com/"

println "Identifier\tTitle\tCurrent AEM Path\tFinal Resting Place"

def printPageAndChildren(page, identifier) {
    println "${identifier}\t${page.title}\t${page.path}.html"
    
    page.listChildren().eachWithIndex { child, index ->
        printPageAndChildren(child, "${identifier}.${index + 1}")
    }
}

printPageAndChildren(pageManager.getPage(searchRoot), "1")

null