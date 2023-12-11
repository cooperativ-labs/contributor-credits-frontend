# Contributor Credits - Ethereum Smart Contract

A Contributor Credit (C²) is way to pay your collaborators before you have money or even a business.

Each Contributor Credit, written "C²", is a promise to pay $1 the future, when the project or business reaches a "trigger," such as a round of investment or a revenue target, that you set in advance. If an entrepreneur pays 300 C² with a trigger of $1,000,000 in investment, then she must pay the holder of those C² $300 when her project raises $1,000,000 or more. If the business never reaches the trigger, then it doesn't have to pay.

To learn more, [see our post on Medium](https://cooperativ.medium.com/a-new-way-to-compensate-contributors-to-early-stage-projects-fa7d83985fde).
### Associated smart contracts
* [Original Contributor Credits(C2)](https://github.com/cooperativ-labs/original-contributor-credits)
* [Continuous Contributor Credits(C3)](https://github.com/cooperativ-labs/continuous-contributor-credits)

# Information

Frontend application for Cooperativ written with NextJS and Typescript. Includes Tailwind CSS, FontAwesome, Enzyme/Jest testing, and is deployable via serverless.
Backend is managed via a Dgraph schema

## Deployment Procedure
1. Create a branch
When you make a new feature feature/<your-branch-name>
When you fix a bug fix/<your-branch-name>
When you refactor refactor/<your-branch-name>

## Getting Started

Install packages

`yarn`

Spin up fresh dev environment

`yarn fresh`

Spin up dev environment, but preserve database

`yarn new`

Update schema file

`yarn schema`

Update types

`yarn generate`

Running tests

`yarn test:unit`
