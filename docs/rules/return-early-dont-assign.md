# Return when you know the value of the return statement, instead of assigning it. (return-early-dont-assign)

Writing code that ensures a single point of return in function can increase cognitive load for anyone reading that function. The reader is forced to always read the full function to ensure the return value doesn't change before it leaves the function. Returning early lets the user ignore the rest of the function as soon as they know it's irrelevant to their "early return" case.


## Rule Details

This rule aims to encourage returning early.

Examples of **incorrect** code for this rule:

```js

function extractFromResponse(response) {
    let data = [];
    if (response.success) { 
        data = response.data;
    }
    return data; 
}

function extractFromResponseV2(response) {
    let data = response.data;
    if (response.error) { 
        data = null;
    }
    return data; 
}

```

Examples of **correct** code for this rule:

```js

function extractFromResponse(response) {
    if (response.success) { 
        return response.data;
    }
    return [];
}

function extractFromResponseV2(response) {
    if (response.error) { 
        return null;
    }
    return response.data; 
}

```
