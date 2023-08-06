const highlightHTMLContent = require('./highlightHTMLContent');

describe('highlightHTMLContent', () => {
  const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
  const plainText = "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------";
  const plainTextPositions = [
    {
      start: 241,
      end: 247,
    },
    {
      start: 518,
      end: 525,
    },
  ];

  it('should highlight the correct text in the HTML content', () => {
    const expectedResult = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
    
    const resultHTML = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
    expect(resultHTML).toEqual(expectedResult);
  });

  it('should not modify the HTML content if plainTextPositions is empty', () => {
    const emptyPlainTextPositions = [];
    const resultHTML = highlightHTMLContent(htmlContent, plainText, emptyPlainTextPositions);
    expect(resultHTML).toEqual(htmlContent);
  });

  it('should not modify the HTML content if plainText is empty', () => {
    const emptyPlainText = '';
    const resultHTML = highlightHTMLContent(htmlContent, emptyPlainText, plainTextPositions);
    expect(resultHTML).toEqual(htmlContent);
  });

  it('should not modify the HTML content if plainTextPositions are outside the range of plainText', () => {
    const invalidPlainTextPositions = [
      {
        start: 1000,
        end: 1010,
      },
    ];
    const resultHTML = highlightHTMLContent(htmlContent, plainText, invalidPlainTextPositions);
    expect(resultHTML).toEqual(htmlContent);
  });

  it('should handle multiple occurrences of the same text in plainText', () => {
    const plainTextPositionsWithMultipleOccurrences = [
      {
        start: 241,
        end: 247,
      },
      {
        start: 256,
        end: 262,
      },
    ];
    const expectedResultWithMultipleOccurrences = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax <mark>Equity</mark> Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
    const resultHTMLWithMultipleOccurrences = highlightHTMLContent(htmlContent, plainText, plainTextPositionsWithMultipleOccurrences);
    expect(resultHTMLWithMultipleOccurrences).toEqual(expectedResultWithMultipleOccurrences);
  });
});
