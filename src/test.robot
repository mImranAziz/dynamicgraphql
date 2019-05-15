*** Settings ***
Library  Collections
Library  requests
Library  RequestsLibrary
Variables  config.yaml

*** Test Cases ***
Should be able to get my task results
  # Arrange
  Create Session  sess   http://localhost:4000
  ${headers}=  Create Dictionary  Content-Type=Application/JSON
  
  # Act 
  ${resp}=  Post Request   sess    uri=/     data=${MYTASK.QUERY}   headers=${headers}
  
  # Assert 
  Should Be Equal As Strings  ${resp.status_code}  200
  Should Be Equal As Strings  ${resp.content}  ${MYTASK.OUTPUT}
