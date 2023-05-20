import { GitHubOAuthClientProvider } from '../implementations/github-oauth-client-provider'

export function makeGitHubOAuthClientProvider() {
  return new GitHubOAuthClientProvider()
}
