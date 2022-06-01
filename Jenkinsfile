node{
    // Neccesary steps to execute API test
    // curl -s https://deb.nodesource.com/setup_16.x | sudo bash
    // sudo apt install nodejs -y

    stage('Get the changes from github'){
        git url:'https://github.com/jsapuyesp/workshop-api-testing-js', branch:'master'
    }
    
    stage('Install eslint and run fix'){
        sh 'npm install eslint --save-dev'
        sh 'npm run lint -- --fix'
    }

    stage('API Test'){
        catchError {
            echo 'into cathError'
            sh 'npm test'
        }
        echo 'sign out cathError'
    }
}