tagPath = "medtronic-wide"

def tagRoot = getResource("/etc/tags/${tagPath}")

iterateAndPrint(tagRoot)

def iterateAndPrint(tag) {
    println tag.path
    
    def children = tag.children.sort { a, b ->
        a.name <=> b.name
    }
    
    if (children) {
        children.each { child ->
            iterateAndPrint(child)
        }
    }
}

return