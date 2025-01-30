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




Setting Up a Developer Environment for SharePoint 2019 with SPFx (SharePoint Framework)
To create a developer environment for SharePoint 2019 and start building SPFx solutions, follow these steps:

1. Install Prerequisites
a. Install Node.js LTS v8
SharePoint Framework for SharePoint 2019 supports Node.js v8.17.0 specifically.
Download Node.js v8.17.0:
Visit the Node.js archive.
Download the appropriate installer for your OS.
Install Node.js:
Run the installer and follow the instructions.
Ensure the option to add Node.js to your system PATH is selected.
Verify the installation:
Open a command prompt or terminal.
Run the following commands: 
node -v
npm -v
Ensure the Node.js version is v8.17.0 and npm version is compatible (e.g., 6.x).
b. Install Git
Git is required to manage source code and version control.
Download Git:
Visit the Git website.
Download the appropriate version for your OS.
Install Git:
Follow the installer steps.
During installation, select "Use Git from the command prompt".
Verify Git installation:
git --version
c. Install Visual Studio Code
Visual Studio Code (VS Code) is the recommended IDE for SPFx development.
Download and install VS Code:
Visit the VS Code website.
Install the appropriate version for your OS.
Add Extensions:
Open VS Code and install the following extensions: 
ESLint (for JavaScript linting).
Prettier (for code formatting).
SharePoint Framework (for SPFx integration).

2. Install SPFx Development Tools
Run the following command to install SPFx tools globally:
npm install gulp-cli@2.3.0 yo@3.1.1 @microsoft/generator-sharepoint@1.10.0 --global
gulp-cli: Task runner for SPFx projects.
yo (Yeoman): Scaffolding tool for creating SPFx projects.
@microsoft/generator-sharepoint: SPFx project generator compatible with SharePoint 2019.
Verify the installations:
gulp -v
yo --version
npm list -g @microsoft/generator-sharepoint

3. Set Up the SPFx Project
a. Create a Working Directory
Open a terminal or command prompt.
Navigate to the folder where you want to store your SPFx projects: 
mkdir spfx-dev
cd spfx-dev
b. Scaffold a New SPFx Project
Run the Yeoman generator:
yo @microsoft/sharepoint
Follow the prompts:
Solution name: Enter the project name.
Target SharePoint environment: Select "SharePoint 2019 onwards."
Deployment option: Choose "No" for tenant-wide deployment.
Component type: Choose "WebPart" (or other desired components).
WebPart name: Provide a name for the WebPart.
Framework: Choose "No JavaScript framework" for vanilla JS or select React.
Yeoman will scaffold the project, creating necessary files and folders.

4. Start Development
a. Install Project Dependencies
Run the following command in the project folder to install required dependencies:
npm install
b. Serve the Project Locally
Start the development server: 
gulp serve
Open the provided URL in a browser to test your WebPart in the SharePoint Workbench.

5. Test in SharePoint 2019
a. Deploy the Solution
Build the project for deployment:
gulp bundle --ship
gulp package-solution --ship
Upload the .sppkg file (from the sharepoint/solution folder) to your SharePoint App Catalog.
Add the WebPart to a page in SharePoint 2019.

6. Best Practices
Use Node.js v8.17.0 exclusively to avoid compatibility issues.
Keep your SPFx generator version aligned with SharePoint 2019.
Always test your solution in a SharePoint 2019 development/test environment before deploying to production.
This setup will prepare your environment for developing SPFx solutions for SharePoint 2019. Let me know if you encounter any specific issues!
