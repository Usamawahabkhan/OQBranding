## oq-main

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO



# Connect to SharePoint
$siteUrl = "http://your-sharepoint-site-url"
$username = "your-username"
$password = "your-password"
$securePassword = ConvertTo-SecureString -String $password -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($username, $securePassword)

# Function to create a list
function Create-List {
    param (
        [string]$listName,
        [int]$templateType
    )
    Add-SPList -Name $listName -TemplateType $templateType
    Write-Host "List '$listName' created successfully."
}

# Function to add a field to a list
function Add-Field {
    param (
        [string]$listName,
        [string]$fieldName,
        [string]$fieldType
    )
    Add-SPField -ListName $listName -Name $fieldName -Type $fieldType
    Write-Host "Field '$fieldName' added to list '$listName'."
}

# Create lists and add fields
Create-List -listName "Slideshow" -templateType 100
Add-Field -listName "Slideshow" -fieldName "ImageURL" -fieldType "URL"
Add-Field -listName "Slideshow" -fieldName "Caption" -fieldType "Text"
Add-Field -listName "Slideshow" -fieldName "LinkURLText" -fieldType "Text"

Create-List -listName "News" -templateType 100
Add-Field -listName "News" -fieldName "ImageURL" -fieldType "URL"
Add-Field -listName "News" -fieldName "Caption" -fieldType "Note"
Add-Field -listName "News" -fieldName "Category" -fieldType "Text"
Add-Field -listName "News" -fieldName "Details" -fieldType "Note"
Add-Field -listName "News" -fieldName "NewsURL" -fieldType "URL"

Create-List -listName "Events" -templateType 100
Add-Field -listName "Events" -fieldName "EventDate" -fieldType "DateTime"
Add-Field -listName "Events" -fieldName "EventLink" -fieldType "URL"

Create-List -listName "Mozya" -templateType 100
Add-Field -listName "Mozya" -fieldName "ExpireDate" -fieldType "DateTime"
Add-Field -listName "Mozya" -fieldName "ImageURL" -fieldType "URL"
Add-Field -listName "Mozya" -fieldName "EventLink" -fieldType "URL"
Add-Field -listName "Mozya" -fieldName "Details" -fieldType "Note"
Add-Field -listName "Mozya" -fieldName "Category" -fieldType "Text"
