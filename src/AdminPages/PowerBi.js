import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
embedConfig = {
    type: 'report',  // Supported types: report, dashboard, tile, visual, and qna.
    id: '<Report Id>',
    embedUrl: '<Embed Url>',
    accessToken: '<Access Token>',
    tokenType: models.TokenType.Embed,  // Use models.TokenType.Aad if you're embedding for your organization.
    settings: {
        panes: {
            filters: {
                expanded: false,
                visible: false
            }
        }
    }
}

eventHandlers = new Map([
    ['loaded', function () { console.log('Report loaded'); }],
    ['rendered', function () { console.log('Report rendered'); }],
    ['error', function (event) { console.log(event.detail); }]
])

cssClassName = "report-style-class"

getEmbeddedComponent = (embeddedReport) => {
    window.report = embeddedReport;
}
