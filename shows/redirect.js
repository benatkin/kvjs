function(doc, req) {
  return {
    code : 301,
    headers : {
      "Location" : "_design/kvjs"
    }
  }
}
