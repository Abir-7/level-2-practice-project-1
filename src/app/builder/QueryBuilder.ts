import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  searchMethod(searchField: string[]) {
    const searchTerm = this.query.searchTerm;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filterMethod() {
    const queryobject = { ...this.query };
    const excludeFiled = ['searchTerm', 'sort', 'limit', 'page', 'field'];
    excludeFiled.forEach((el) => delete queryobject[el]);

    this.modelQuery = this.modelQuery.find(queryobject as FilterQuery<T>);

    return this;
  }

  sortMethod() {
    // let sort = this.query?.sort || '-createdAt'; for single sort value
    let sort =
      (this.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.modelQuery = this.modelQuery?.sort(sort as string);

    return this;
  }

  paginateMethod() {
    let page = Number(this.query?.page) || 1;
    let limit = Number(this.query?.limit) || 10;
    let skip = (page - 1) * limit;
    this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fieldLimitMethod() {
    let field = (this.query?.field as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery.select(field);

    return this;
  }
}

export default QueryBuilder;
